import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth, _getAngularFireAuth } from 'angularfire2/auth';
import { _firebaseAppFactory } from 'angularfire2/firebase.app.module';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthenticationService {

  user: Observable<User> | null;
  user2: Observable<User> | null;

  public admin = false;
  private loggedIn = false;
  app2: any;

  get isLoggedIn() {
    return this.loggedIn;
  }

  get isAdmin(): any {
    return this.admin;
  }


  // tslint:disable-next-line:max-line-length
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private notify: NotifyService) {
        this.user = this.afAuth.authState
                .switchMap((user) => {
                  if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                  } else {
                    return Observable.of(null);
                  }
                });
             this.app2 = firebase.initializeApp(environment.firebase, 'app2');
           }


            private oAuthLogin(provider: firebase.auth.AuthProvider) {
              return this.afAuth.auth.signInWithPopup(provider)
                .then((credential) => {
                  this.notify.update('ESTO RULA!!!', 'success');
                  return this.updateUserData(credential.user);
                })
                .catch((error) => this.handleError(error) );
            }
            //// Email/Password Auth ////
            emailSignUp(email: string, password: string, newDate: User) {
              return this.app2.auth().createUserWithEmailAndPassword(email, password)
                .then((newuser) => {
                  this.notify.update('Registrado!!!', 'success');
                  this.updateUserData(newuser, newDate);
                  return this.app2.auth().signOut();
                })
                .catch((error) => { 
                  console.log(error)
                  return error} );
            }

            emailLogin(email: string, password: string) {
              return this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then((user) => {
                  this.loggedIn = true;
                  this.notify.update('Bienvenido '+ user.realname, 'success');
                  return user; 
                })
                .catch((error) => this.handleError(error) );
            }

            resetPassword(email: string) {
              const fbAuth = firebase.auth();
              return fbAuth.sendPasswordResetEmail(email)
                .then(() => this.notify.update('Password update email sent', 'info'))
                .catch((error) => this.handleError(error));
            }

            signOut() {
              this.loggedIn = false;
              this.afAuth.auth.signOut().then(() => {
                  this.router.navigate(['/login']);
              });
            }

            public handleError(error) {
              // Añadimos analisis de casos para manejar los errores y ofrecer+
              // una notificacion
              console.log(error.code)
              var msg: string;
              switch (error.code) {
                case 'auth/invalid-email':
                    msg = 'Email invalido';
                  break;
                case 'auth/wrong-password':
                    msg = 'La contraseña no es correcta';
                  
                break;
                case 'auth/user-not-found':
                    msg= 'Ese usuario no existe.';
                break;
                case 'auth/network-request-failed':
                   msg =   'Hay algun tipo de error con la conexión.';
               
                break;
                default:
                 msg = error.message;
                  
                break;
              }
              this.notify.update(msg, 'error');
              return error;
            }


            private updateUserData(newuser: User, newData?: User) {
              const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${newuser.uid}`);
              const data: User = {
                uid: newuser.uid,
                email: newuser.email ,
                realname: newData.realname || newuser.realname || 'Defecto' ,
                nickname: newData.nickname || newuser.nickname || 'Defecto',
                phone: newData.phone || newuser.phone || '609512002',
                imagen: newData.imagen || newuser.imagen || 'https://goo.gl/Fz9nrQ',
                admin: newData.admin || newuser.admin || false
              };
              return userRef.set(data, {merge: true});
          }

}
