import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-info-content',
  styles: [],
  template: `
  <div class="modal-header">
      <h4 class="modal-title">Registrar Empresa</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
    <label for="name"> Nombre </label>
    <input type="text" class="form-control" id="name" required [(ngModel)]="model.name" name="name">
    <br>
    <label for="email"> Email </label>
    <input type="text" class="form-control" id="Email" required [(ngModel)]="model.email"  name="email">
    <br>
    <label for="billMail"> Email de facturación </label>
    <input type="text" class="form-control"  required [(ngModel)]="model.billMail"  name="bill">

    <br>
    <label for="faxNumber"> Fax </label>
    <input type="text" class="form-control"  required [(ngModel)]="model.faxNumber"  name="fax">
    <br>
    <label for="tlf"> Teléfono </label>
    <input type="text" class="form-control"  required [(ngModel)]="model.tlf"  name="tlf">

    <br>
    <label for="tlf"> Iguala </label>
    <ul>

      {{"Si"}}
      <input type="checkbox" [disabled]="getSelectedNo()" [(ngModel)]="value"[ngModelOptions]="{standalone: true}" (click)="!getSelectedNo();"(change)="change(value, 'Si');"  >
      {{"No"}}
      <input type="checkbox" [disabled]="getSelectedSi()" [(ngModel)]="value" [ngModelOptions]="{standalone: true}"(click)="!getSelectedSi();"(change)="change(value,'No');"  >
    </ul>

    <button
      type="submit"

      (click)="guardarMovimiento()" > Guardar
    </button>


    </form>



    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class CompanyInfoContent implements OnInit {
  @Input() uid;

  model = new Company("","",null,false, "","","");
  submitted = false;
  companies$: Observable<Company[]>;
  mycompany: Company[];
  igualas: any;
  selectedsi:boolean = false;
  selectedno:boolean = false;
  dtTrigger: Subject<any> = new Subject();

  constructor(public activeModal: NgbActiveModal, private ref: ChangeDetectorRef, private companyService: CompanyService) {
    this.igualas = [
      { name: 'Si', selected: false },
      { name: 'No', selected: false },

    ]
  }

  onSubmit(){ this.submitted = true;}
  newCompany(){
    this.model =new Company("","",null,false, "","","");
  }
  guardarMovimiento() {
    this.companyService.add(this.model);
   console.log(this.model.email);
   }

   getSelectedSi(){
     return this.selectedsi;
   }
   getSelectedNo(){
    return this.selectedno;
  }
   change(value:boolean,item:string){
    console.log(item);
    if(item == "Si"){
      this.igualas[0].selected = value;
      this.selectedsi = value;
    }
    else {
      this.igualas[1].selected = value;
      this.selectedno = value;
    }


   }
  /*checkIfSelected() {
    this.selectedany = this.igualas.(function(item:any) {
        return item.selected == true;
      })
  }*/
  ngOnInit() {

    this.companyService.getCollection$().subscribe((mycompany: Company[]) => {
      this.mycompany = mycompany;
      this.dtTrigger.next();
    });
  }

}
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {

    constructor(private modalService: NgbModal) {}
    @Input() uid: string;
    open() {
      const modalRef = this.modalService.open(CompanyInfoContent, { size : 'lg' });
      modalRef.componentInstance.uid = this.uid ;
    }
  }
