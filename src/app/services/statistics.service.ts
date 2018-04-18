import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {  Report  } from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';
import { NgbTimepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PartesService } from './partes.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { Company } from '../models/company';
import { User } from '../models/user';
import { Filter } from '../models/filters';
import { Estadistica } from '../models/estadistica';




@Injectable()
export class StatisticsService {

  constructor(private afs: AngularFirestore,
              private notify: NotifyService,
              private userService: UserService,
              private partesService: PartesService,
              private companyService: CompanyService
            ) { }


          

  public filterPartes(p: Report[] , filter: Filter): Report[] {
    let filtered: Report[] = [];
    let fecha  = new Date();
    let firstday = new Date(fecha.setDate(fecha.getDate() - fecha.getDay()));
    let lastday = new Date(fecha.setDate(fecha.getDate() - fecha.getDay()+6));
    let mes = fecha.getMonth()+1 ;
    let año = fecha.getFullYear();
    switch(filter){
      case Filter.Month:
        for(let par of p){
          if(par.date.month === mes){
            filtered.push(par);
          }
        };
      break;
      case Filter.Year:
        for(let par of p){
          if(par.date.year === año){
            filtered.push(par);
          }
        };
      break;
      case Filter.Week:
        for(let par of p){
          if((par.date.day >= firstday.getDay()) && (par.date.day <= lastday.getDay())){
            filtered.push(par);
          }
        };
      break;
      case Filter.NoFilter:
        filtered = p;
         break;
      default:
      break;
    }
    return filtered;
  }



  // ***** FUNCIONES ESTADISTICAS PARA ADMIN
  // ***** -> Horas por empresa de TODOS los usuarios
  // ***** -> Usuarios que tienen algo pendiente
  // ***** -> Horas x Empresa


  getHorasEmpresaTodos(filtro:Filter): Observable<Estadistica[]> {
    let users: User[];
    let stadist : Map<string, number>;
    const resultado: Estadistica[] = [];
    return Observable.create(result => {
      this.userService.getAllUsers$().subscribe((myusers: User[]) => {
        users = myusers;
        let observables = [];
        for(let u of users){
          observables.push(this.getHorasEmpresa(u.uid,filtro));
        }
        Observable.combineLatest(observables).subscribe( data => {
          let i = 0;
          for(let s of data){
            resultado.push(new Estadistica(users[i],s));
            i++;
          }
          result.next(resultado);
          result.complete();
        })
      });
    });
  }


  // ***** FUNCIONES ESTADISTICAS PARA UN USUARIO NORMAL
  // ***** -> KM realizados con coche propio
  // ***** -> Dinero en parkings con parkings
  // ***** -> Horas x Empresa
  // ***** -> Horas en empresas SIN iguala


   getHorasEmpresa(uid: string,filtro:Filter): Observable<Map<string, number>> {
    let partes: Report[];
    const map = new Map<string, number>();
    return Observable.create(result => {
      this.partesService.getPartesFrom$(uid).subscribe((mypartes: Report[]) => {
           partes = mypartes;
           let partesFiltrados = this.filterPartes(partes,filtro);
           for (let pa of partesFiltrados) {
            const hTotales =  pa.duracion;
            if (!map.has(pa.company)) {
            map.set(pa.company, hTotales);
          } else {
            const hActuales = map.get(pa.company);
            map.set(pa.company, (hTotales + hActuales));
          }
        }
        result.next(map);
        result.complete();
      });
    });
  }



  getEstadisticasWidgets(uid:string,isAdmin: boolean,filter: Filter) : Observable<number[]> {
    return Observable.create(result =>{
      let final:number[] = [0,0,0,0,0];
      let company: Company[] = [];
      this.companyService.getCollection$().subscribe((company:Company[])=>{
        company = company;
        this.partesService.getCollection$().subscribe((pa: Report[])=>{
          const partes = pa;
          let partesFiltrados = this.filterPartes(partes,filter);
          if(isAdmin){
            console.log("Soy admin");
            for(let p of partesFiltrados){
              var date = new Date(p.date.year,p.date.month-1,p.date.day);
              if(p.displacements) final[0]++;
              final[1] = 0;  // Falta implementar
              final[2] += p.parking;
              final[3]++;
              if( date.toString().includes('Sat') || date.toString().includes('Sun') && !p.servAditional){
                var hFinSemana =  p.duracion;
                final[4]+= hFinSemana;
              }
         
            }
         }else {
           console.log("No soy admin");
          for(let p of partesFiltrados){
          if(p.createdby == uid){
            if(p.cocheParticular) final[0] += p.km;
            const horas = (  p.duracion);
            final[1] += horas
            final[2] += p.parking;
            final[3]++;
            let obj = company.find(o => o.name === p.company);
            if(obj && !obj.igualada) final[4] += horas;
          };
        }
         }
         result.next(final);
         result.complete();
        });
      });
    });
  }



  getHorasFindeSemana(uid:string,company: string): Observable<number> {
    return Observable.create(result => {
      
    })
  }

  getHorasIguala(uid:string,filter: Filter): Observable<number> {
    return Observable.create(result => {

    })
  }
}
