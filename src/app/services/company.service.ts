import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Company } from '../models/company';
import { DocumentReference } from '@firebase/firestore-types';




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
<<<<<<< HEAD
    if (Company /*&& !this.companyCollectionRef.doc(Company.name)*/) {
      this.companyCollectionRef.add({ name: Company.name, email:Company.email, 
=======
    
    if (Company/* && !this.companyCollectionRef.doc(Company.name)*/) {
    this.companyCollectionRef.add({uid: "",name: Company.name, email:Company.email, 
>>>>>>> c5c00a668accbe09bcdd5409e6960c141716b26a
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
    console.log(Company.uid)
    this.afs.doc(this.path + '/' + Company.uid).set({ uid: Company.uid, name: Company.name,
                                                          email: Company.email, 
                                                          billMail: Company.billMail,
                                                          faxNumber: Company.faxNumber,
                                                          igualada: Company.igualada,
                                                          lastmovement: Company.lastmovement,
                                                          tlf: Company.tlf,
                                                        suspendida: Company.suspendida });
  }

  deleteTodo(Company: Company) {
   
    this.afs.doc(this.path + '/' + Company.uid).delete();
   

  }

  getCompany$(name: string): Observable<Company[]> {
    return this.afs.collection<Company>(this.path, ref => ref.where('name', '==', name)).valueChanges();
  }

}
