import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { and } from '@angular/router/src/utils/collection';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from '../models/filters';




@Injectable()
export class PartesService {

  readonly path = '/reports';
  partes$: Observable<Report[]>;
  partesCollectionRef: AngularFirestoreCollection<Report>;

  constructor(private afs: AngularFirestore) {
    this.partesCollectionRef = this.afs.collection<Report>(this.path);
    this.partes$ = this.partesCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Report;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
   }
   getParte$(uid: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('uid', '==', uid)).valueChanges();
  }

  getServAditionalCompany$(empresa: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('company', '==', empresa).where('servAditional', '==', true)).valueChanges();
  }
  getCollection$(): Observable<Report[]> {
    return this.afs.collection<Report>(this.path).valueChanges();
  }
  
  add(Report: Report) {
    
    if (Report /*&& !this.companyCollectionRef.doc(Company.name*/) {
    
      this.partesCollectionRef.add({ 
                                      uid: Report.uid, operator:Report.operator, 
                                      date:Report.date,
                                      company:Report.company,
                                      dBegining: Report.dBegining,
                                      dEnd:Report.dEnd,notes:Report.notes,
                                      km:Report.km,
                                      displacements:Report.displacements,
                                      parking:Report.parking,
                                      free: Report.free, interno:Report.interno,
                                      telemantenimiento:Report.telemantenimiento,
                                      cocheParticular:Report.cocheParticular,
                                      hiddenIP:Report.hiddenIP,createdby:Report.createdby,
                                      servAditional: Report.servAditional,type:Report.type
                              })

      .then(ref => {
          Report.uid = ref.id;
          this.updateTodo(Report);
          })
    }
}
  // tslint:disable-next-line:no-shadowed-variable
  updateTodo(Report: Report) {
    this.partesCollectionRef.doc(Report.uid).update({ 
                                                        uid: Report.uid, operator: Report.operator, 
                                                        date: Report.date,
                                                        company: Report.company,
                                                        dBegining: Report.dBegining,
                                                        dEnd: Report.dEnd,notes: Report.notes,
                                                        km: Report.km,
                                                        displacements: Report.displacements,
                                                        parking: Report.parking,
                                                        free: Report.free, interno: Report.interno,
                                                        telemantenimiento: Report.telemantenimiento,
                                                        cocheParticular: Report.cocheParticular,
                                                        hiddenIP: Report.hiddenIP,createdby: Report.createdby
                                                      , servAditional: Report.servAditional });
  }

  getPartesFromIn$(uid: string, company:  string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('createdby', '==', uid).where('company', '==', company)).valueChanges();
  }

  getPartesFrom$(usuario: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('createdby', '==', usuario)).valueChanges();
  }

  getPartesFromOperator$(usuario: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('operator', '==', usuario)).valueChanges();
  }
  getPartesCompany$(empresa: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('company', '==', empresa)).valueChanges();
  }
  getPartesFromInCU$(empresa: string, usuario: string): Observable<Report[]> {
   return this.afs.collection<Report>(this.path, ref => ref.where('company', '==', empresa).where('operator', '==', usuario)).valueChanges();
  }


  deleteTodo(Report: Report) {
    this.partesCollectionRef.doc(Report.uid).delete();
  }
}

