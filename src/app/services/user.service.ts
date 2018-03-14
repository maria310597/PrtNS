import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';

import { User } from '../models/user';

@Injectable()
export class UserService {

  readonly path = 'users';
  constructor(private afs: AngularFirestore, private notify: NotifyService) { }

  getAllUsers(): Observable<User[]> {
    return this.afs.collection<User>(this.path).valueChanges();
  }

  getUser$(uid: string): Observable<User[]> {
    return this.afs.collection<User>(this.path, ref => ref.where('uid', '==', uid)).valueChanges();
  }

  deleteUser(uid: string) {
    this.notify.update('Usuario: ' + uid + ' eliminado con éxito.', 'success');
    return this.afs.doc(this.path + '/' + uid).delete();
    // Añadir comprobacion de que el usuario no es admin....
  }

}
