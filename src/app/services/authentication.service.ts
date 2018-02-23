import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';


export interface User {
  uid: string;
  realname: string;
  nickname: string;
  email: string;
  phone: string;
  imagen: string;
  // Notificaciones?

}

@Injectable()
export class AuthenticationService {
  user: Observable<User> | null;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private notify: NotifyService) {
         this.user = this.afAuth.authState
                .switchMap((user) => {
                  if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                  } else {
                    return Observable.of(null);
                  }
                });
            }
            ////// OAuth Methods /////
            googleLogin() {
              const provider = new firebase.auth.GoogleAuthProvider();
              return this.oAuthLogin(provider);
            }
            /*
            githubLogin() {
              const provider = new firebase.auth.GithubAuthProvider();
              return this.oAuthLogin(provider);
            }
            facebookLogin() {
              const provider = new firebase.auth.FacebookAuthProvider();
              return this.oAuthLogin(provider);
            }
            twitterLogin() {
              const provider = new firebase.auth.TwitterAuthProvider();
              return this.oAuthLogin(provider);
            }
            */
            private oAuthLogin(provider: firebase.auth.AuthProvider) {
              return this.afAuth.auth.signInWithPopup(provider)
                .then((credential) => {
                  this.notify.update('ESTO RULA!!!', 'success');
                  return this.updateUserData(credential.user);
                })
                .catch((error) => this.handleError(error) );
            }
            //// Email/Password Auth ////
            emailSignUp(email: string, password: string) {
              return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                  this.notify.update('Registrado!!!', 'success');
                  return this.updateUserData(user); // if using firestore
                })
                .catch((error) => this.handleError(error) );
            }

            emailLogin(email: string, password: string) {
              return this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then((user) => {
                  this.loggedIn.next(true);
                  this.notify.update('Logeado!!!', 'success');
                  return this.updateUserData(user); // if using firestore
                })
                .catch((error) => this.handleError(error) );
            }

            // Sends email allowing user to reset password
            resetPassword(email: string) {
              const fbAuth = firebase.auth();

              return fbAuth.sendPasswordResetEmail(email)
                .then(() => this.notify.update('Password update email sent', 'info'))
                .catch((error) => this.handleError(error));
            }

            signOut() {
              this.loggedIn.next(false);
              this.afAuth.auth.signOut().then(() => {
                  this.router.navigate(['/']);
              });
            }

            private handleError(error) {
              // Añadimos analisis de casos para manejar los errores y ofrecer+
              // una notificacion
              console.log(error.code);
              switch (error.code) {
                case 'auth/invalid-email':
                    this.notify.update('Email invalido', 'error');
                  break;
                case 'auth/wrong-password':
                  this.notify.update('La contraseña no es correcta', 'error');
                break;
                case 'auth/user-not-found':
                this.notify.update('Ese usuario no existe.', 'error');
                break;
                default:
                  this.notify.update(error.message, 'error');
                break;
              }
            }


            private updateUserData(user: User) {
              const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
              const data: User = {
                uid: user.uid,
                email: user.email ,
                realname: user.realname || 'Defecto' ,
                nickname: user.nickname || 'Defecto',
                phone: user.phone || '609512002',
                imagen: user.imagen || 'https://goo.gl/Fz9nrQ'
              };
              return userRef.set(data);
          }

}
