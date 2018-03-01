import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Company } from '../models/company';




@Injectable()
export class CompanyService {

  readonly path = '/company';
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
    if (Company ) {
      this.companyCollectionRef.add({ name: Company.name, email:Company.email, 
                                      billMail:Company.billMail,
                                      faxNumber:Company.faxNumber,
                                      igualada: Company.igualada,
                                      lastmovement:Company.lastmovement,tlf:Company.tlf});
    }
  }
  updateTodo(Company: Company) {
    this.companyCollectionRef.doc(Company.name).update({ name: !Company.name,
                                                          email: !Company.email, 
                                                          billMail: !Company.billMail,
                                                          faxNumber: !Company.faxNumber,
                                                          igualada: !Company.igualada,
                                                          lastmovement: !Company.lastmovement,
                                                          tlf: !Company.tlf });
  }
  
  deleteTodo(Company: Company) {
    this.companyCollectionRef.doc(Company.name).delete();
  }
}
