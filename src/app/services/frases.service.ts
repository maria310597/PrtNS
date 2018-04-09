import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Frase } from '../models/frase';
@Injectable()
export class FrasesService {
  readonly path = "/frases";
  constructor(private afs: AngularFirestore ) { }


  getFrases(): Observable<Frase>{
      return Observable.create(result =>{
        this.afs.collection<Frase>(this.path).valueChanges().subscribe((data: Frase[]) => {
          let frases = data;
          let ganadora = frases[Math.floor(Math.random() * frases.length) + 0]; // Random
          result.next(ganadora);
          result.complete();
        });
      })
  }

  addFrase(frase: Frase){
    if (frase) {
      let data: Frase = {uid : '', frase: frase.frase, autor: frase.autor}; 
      this.afs.collection(this.path).add(data).then(ref => {
          frase.uid = ref.id;
          this.updateFrase(frase);
      });
      }
  }


  updateFrase(frase: Frase) {
    let data: Frase = {uid : frase.uid, frase: frase.frase, autor: frase.autor}; 
    this.afs.doc(this.path+"/"+frase.uid).set(data);
  }



  deleteFrase(uid: string) {
    return this.afs.doc(this.path + '/' + uid).delete();
  }
}
