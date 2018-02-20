import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FirebaseDatabase } from '@firebase/database-types';
import { User } from '../models/User';

@Injectable()
export class AuthenticationService {

  public path = '/user';
  items: Observable<any>;
  constructor(private db: AngularFireDatabase) { }

  getUserByUserId(nickname: string) {
    this.items = this.db.object('user/0/' + nickname)
        .snapshotChanges().map(res => {
            console.log('Value: ' + res.payload.val());
            return res.payload.val();
        });
    // this.items = this.db.list('items').valueChanges()
    // return this.db.list<User>(this.path, ref => ref.orderByChild('nickname').equalTo(nickname));
    // return this.db.object(this.path + nickname);
  }
  login(user: User) {
    console.log(this.getUserByUserId(user.nickname));
 }

  logout() {
    localStorage.removeItem('currentUser');
}

}
