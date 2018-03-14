import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  Report  } from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';
import { NgbTimepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { PartesService } from './partes.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { Company } from '../models/company';
import { User } from '../models/user';
import { Estadistica } from '../models/estadistica';

@Injectable()
export class StatisticsService {

  constructor(private afs: AngularFirestore,
              private notify: NotifyService,
              private userService: UserService,
              private partesService: PartesService,
              private companyService: CompanyService
            ) { }


            getHorasEmpresaTodos(): Observable<Estadistica[]> {
              let companys: Company[];
              let partes: Report[];
              let users: User[];
              let stadist : Map<string, number>;
              let resultado: Estadistica[] = [];
              return Observable.create(result => {
                this.companyService.getCollection$().subscribe((mycompanys: Company[]) => {
                  companys = mycompanys;
                });
                this.userService.getAllUsers$().subscribe((myusers: User[]) => {
                  users = myusers;
                  for(let u of users){
                    this.getHorasEmpresa(u.uid).subscribe((mysta: Map<string, number>) => {
                      stadist = mysta;
                      resultado.push(new Estadistica(u,stadist));
                    });
                  }
                  result.next(resultado);
                  result.complete();
                })
              });
            }







   getHorasEmpresa(uid: string): Observable<Map<string, number>> {
    let companys: Company[];
    let partes: Report[];
    const map = new Map<string, number>();
    return Observable.create(result => {
      this.companyService.getCollection$().subscribe((mycompanys: Company[]) => {
        companys = mycompanys;
      });
      this.partesService.getPartesFrom$(uid).subscribe((mypartes: Report[]) => {
           partes = mypartes;
           for (let pa of partes) {
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
}
