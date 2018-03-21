import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';

import { User } from '../models/user';

@Injectable()
export class UserService {

  readonly path = 'users';
  users$: Observable<User[]>;
  usersCollectionRef: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore, private notify: NotifyService) {
    this.usersCollectionRef = this.afs.collection<User>(this.path);
    this.users$ = this.usersCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as User;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
   }

  getAllUsers$(): Observable<User[]> {
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
  updateTodo(User: User) {
    this.usersCollectionRef.doc(User.uid).update({ realname: User.realname, nickname: User.nickname, phone: User.phone, imagen: User.imagen });
  }

}
