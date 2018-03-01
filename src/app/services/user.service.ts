import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../models/user';

@Injectable()
export class UserService {

  readonly path = 'users';
  constructor(private afs: AngularFirestore) { }

  getUser$(uid: string): Observable<User[]> {
    return this.afs.collection<User>(this.path, ref => ref.where('uid', '==', uid)).valueChanges();
  }

}
