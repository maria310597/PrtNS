import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';

import { Task } from '../models/task';

@Injectable()
export class TaskService {

  readonly path = 'tasks';
  constructor(private afs: AngularFirestore, private notify: NotifyService) { }



  getAllPendiente$():Observable<Task[]> {
    return this.afs.collection<Task>(this.path).valueChanges();
  }

  getPendientesFrom$(uid: string):Observable<Task[]>  {
    return this.afs.collection<Task>(this.path, ref => ref.where('createdby', '==', uid)).valueChanges();
  }



  addPendiente(t: Task) {
    if (t) {
    let data: Task = {uid : '', createdby: t.createdby, date: t.date,time: t.time,description: t.description,status: t.status}; 
    this.afs.collection(this.path).add(data).then(ref => {
        t.uid = ref.id;
        this.updatePendiente(t);
    });
    }
  }

  updatePendiente(t: Task) {
    let data: Task = {uid : t.uid, createdby: t.createdby, date: t.date,time: t.time,description: t.description,status: t.status}; 
    this.afs.doc(this.path+"/"+t.uid).set(data);
  }



  deletePendiente(uid: string) {
    return this.afs.doc(this.path + '/' + uid).delete();
  }

}
