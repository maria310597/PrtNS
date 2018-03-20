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


          

  filterPartes(p: Report[] , filter: Filter): Report[] {
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
            const hTotales = ((pa.dEnd.hour * 60) + (pa.dEnd.minute)) - (pa.dBegining.hour * 60 + pa.dBegining.minute);
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



  getKilometrosDeParticular(uid:string,filter: Filter): Observable<number>{
    return Observable.create(result =>{
      let km = 0;
      this.partesService.getPartesFrom$(uid).subscribe((p: Report[])=>{
        const partes = p;
        let partesFiltrados = this.filterPartes(partes,filter);
          for(let i of partesFiltrados){
            if(i.cocheParticular) km +=i.km;
          }
        result.next(km);
        result.complete();   
      });
    });
  }

  getMoneyParking(uid:string,filter: Filter): Observable<number>{
    return Observable.create(result =>{
      let money = 0;
      this.partesService.getPartesFrom$(uid).subscribe((p: Report[])=>{
        const partes = p;
        let partesFiltrados = this.filterPartes(partes,filter);
          for(let i of partesFiltrados){
            if(!i.free) money +=i.parking;
          }
        result.next(money);
        result.complete();   
      });
    });
  }
}
