import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Company } from '../models/company';




@Injectable()
export class CompanyService {

  readonly path = '/company';
  constructor(private afs: AngularFirestore) { }

  getCollection$(): Observable<Company[]> {
    return this.afs.collection<Company>(this.path).valueChanges();
  }

}
