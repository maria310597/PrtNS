import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';




@Injectable()
export class PartesService {

  readonly path = '/reports';
  constructor(private afs: AngularFirestore) { }

  getCollection$(): Observable<Report[]> {
    return this.afs.collection<Report>(this.path).valueChanges();
  }

  getParte$(uid: string): Observable<Report[]> {
    return this.afs.collection<Report>(this.path, ref => ref.where('uid', '==', uid)).valueChanges();
  }

}
