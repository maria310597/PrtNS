import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';




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

  getCollection$(): Observable<Report[]> {
    return this.afs.collection<Report>(this.path).valueChanges();
  }

  getParte$(uid: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('uid', '==', uid)).valueChanges();
  }

  getPartesFrom$(uid: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('createdby', '==', uid)).valueChanges();
  }

  getPartesFromIn$(uid: string, empresa: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('createdby', '==', uid).where('company', '==', empresa)).valueChanges();
  }

}
