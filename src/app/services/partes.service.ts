import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';




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
  getCollection$(): Observable<Report[]> {
    return this.afs.collection<Report>(this.path).valueChanges();
  }
  
  add(Report: Report) {
    
    if (Report /*&& !this.companyCollectionRef.doc(Company.name*/) {
    
      this.partesCollectionRef.add({ uid: Report.uid, operator:Report.operator, 
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
                                      hiddenIP:Report.hiddenIP,createdby:Report.createdby
                              });
    }
}
  // tslint:disable-next-line:no-shadowed-variable
  updateTodo(Report: Report) {
    this.partesCollectionRef.doc(Report.uid).update({ uid: !Report.uid, operator: !Report.operator, 
                                                        date: !Report.date,
                                                        company: !Report.company,
                                                        dBegining: !Report.dBegining,
                                                        dEnd: !Report.dEnd,notes: !Report.notes,
                                                        km: !Report.km,
                                                        displacements: !Report.displacements,
                                                        parking: !Report.parking,
                                                        free: !Report.free, interno: !Report.interno,
                                                        telemantenimiento: !Report.telemantenimiento,
                                                        cocheParticular: !Report.cocheParticular,
                                                        hiddenIP: !Report.hiddenIP,createdby: !Report.createdby });
  }

  getPartesFrom$(uid: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('createdby', '==', uid)).valueChanges();
  }

  getPartesFromIn$(uid: string, empresa: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('createdby', '==', uid).where('company', '==', empresa)).valueChanges();
  }

  deleteTodo(Report: Report) {
    this.partesCollectionRef.doc(Report.uid).delete();
  }
}

