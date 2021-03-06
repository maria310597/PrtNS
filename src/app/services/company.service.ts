import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Company } from '../models/company';
import { DocumentReference } from '@firebase/firestore-types';
import { NgbTimepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';




@Injectable()
export class CompanyService {

  readonly path = 'company';
  companies$: Observable<Company[]>;
  companyCollectionRef: AngularFirestoreCollection<Company>;
  

  constructor(private afs: AngularFirestore) {
    this.companyCollectionRef = this.afs.collection<Company>(this.path);
    this.companies$ = this.companyCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Company;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }
  getCollection$(): Observable<Company[]> {
    return this.afs.collection<Company>(this.path).valueChanges();
  }

  add(Company: Company) {
    
    if (Company/* && !this.companyCollectionRef.doc(Company.name)*/) {
    this.companyCollectionRef.add({nif: Company.nif,
                                      address: Company.address,
                                      igualahours: Company.igualahours,uid: "",name: Company.name, email:Company.email, 
                                      billMail:Company.billMail,
                                      faxNumber:Company.faxNumber,
                                      igualada: Company.igualada,
                                      lastmovement:Company.lastmovement,tlf:Company.tlf,
                                      suspendida: Company.suspendida})
    .then(ref => {
      Company.uid = ref.id;
     this.updateTodo(Company);
    })
    }
   
  }
  // tslint:disable-next-line:no-shadowed-variable
  updateTodo(Company: Company) {
  
    this.afs.doc(this.path + '/' + Company.uid).set({ nif:Company.nif,
      address:Company.address,igualahours: Company.igualahours, uid: Company.uid, name: Company.name,
                                                          email: Company.email, 
                                                          billMail: Company.billMail,
                                                          faxNumber: Company.faxNumber,
                                                          igualada: Company.igualada,
                                                          
                                                          lastmovement: Company.lastmovement,
                                                          tlf: Company.tlf,
                                                        suspendida: Company.suspendida });
  }
  updateLastMovement(name: string, date :NgbDateStruct){
 


  this.getCompany$(name).take(1).subscribe(c => {
    
    c[0].lastmovement = date;
    this.updateTodo(c[0]);
 
  });
       
      
   

     
   

  }

  deleteTodo(Company: Company) {
   
    this.afs.doc(this.path + '/' + Company.uid).delete();
   

  }

  getCompany$(name: string): Observable<Company[]> {
    return this.afs.collection<Company>(this.path, ref => ref.where('name', '==', name)).valueChanges();
  }

}
