import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';




@Injectable()
export class PartesService {

  readonly path = '/partes';
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

}
