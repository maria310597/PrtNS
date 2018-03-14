import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { NotifyService } from '../../core/notify.service';

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
   
    <label for="iguala"> Iguala </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.igualada" name="ig" id="igSi"  [value]="true" checked>
      <label class="form-check-label" for="grati"> Si </label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.igualada" name="ig" id="igNo"  [value]="false">
      <label class="form-check-label" for="grati"> No </label>
    </div>
    <br>

    <label for="iguala"> Suspendida </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.suspendida" name="sus" id="susSi"  [value]="true" >
      <label class="form-check-label" for="sus"> Si </label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.suspendida" name="sus" id="susNo"  [value]="false" checked>
      <label class="form-check-label" for="sus"> No </label>
    </div>
    <br>
    

    <button
      type="submit" (click)="check()" > Guardar
    </button>

    <div  *ngIf="campos[0]==2" class="alert alert-primary" role="alert">
    Te ha faltado rellenar el campo nombre
  </div>
  <div  *ngIf="campos[1]==2" class="alert alert-primary" role="alert">
    Te ha faltado rellenar el campo email
  </div>
  <div  *ngIf="campos[2]==2" class="alert alert-primary" role="alert">
    Te ha faltado rellenar el campo email de facturación
  </div>
  <div  *ngIf="campos[3]==2" class="alert alert-primary" role="alert">
    Te ha faltado rellenar el campo fax
  </div>
  <div  *ngIf="campos[4]==2" class="alert alert-primary" role="alert">
    Te ha faltado rellenar el campo teléfono
  </div>
  <div  *ngIf="campos[5]== 1" class="alert alert-primary" role="alert">
  Empresa Registrado Correctamente
 </div>
    </form>



    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class CompanyForm implements OnInit {
  @Input() company;

  model;
  modify:boolean;
  submitted = false;
  companies$: Observable<Company[]>;
  mycompany: Company[];
  igualas: any;
  selectedsi:boolean = false;
  selectedno:boolean = false;
  dtTrigger: Subject<any> = new Subject();

  constructor(public activeModal: NgbActiveModal, private ref: ChangeDetectorRef,
     private companyService: CompanyService, private notifyService:NotifyService) {
    
  }

  onSubmit(){ this.submitted = true;}
  newCompany(){
    this.model =new Company("","",null,false, "","","",false);
  }
 
   campos: number[]=[0,0,0,0,0,0]; //0 nocheck, 1 checkok, 2checkbad
    check(){
      if ( this.model.name ==''){
          this.campos[0] = 2;
      }else this.campos[0] = 1;

      if ( this.model.email ==''){
        this.campos[1] = 2;
      }else this.campos[1] = 1;

     if ( this.model.billMail ==''){
      this.campos[2] = 2;
    }else this.campos[2] = 1;

    if (  this.model.faxNumber == ''){
      this.campos[3] = 2;
    }else {
      this.campos[3] = 1;
      
    }
    if ( this.model.tlf ==''){
     this.campos[4] = 2;
    }else this.campos[4] = 1;

    var empty:boolean =true;
    for(let i=0;i<this.campos.length-1;i++){
      
      if(this.campos[i]==1) {
        empty=false;
      }
      else {
        empty = true;
        break;
      }
    }
    if(!empty) {
      this.campos[5] = 1;
      if ( this.modify == true){
        this.companyService.updateTodo(this.model);
      this.activeModal.close('Close click')
      this.notifyService.update('Empresa modificada correctamente', 'success');
      }else{
        this.companyService.add(this.model);
      this.activeModal.close('Close click')
      this.notifyService.update('Empresa registrada correctamente', 'success');
      }
      
    }
    }
    

  ngOnInit() {

    this.companyService.getCollection$().subscribe((mycompany: Company[]) => {
      this.mycompany = mycompany;
      this.dtTrigger.next();
    });
    
    if (this.company == undefined){
    this.model = new Company("","",null,false, "","","",false,"");
    this.modify = false;
   }
   else {
   
      this.model = new Company(this.company.name,this.company.email,this.company.lastmovement,this.company.igualada,
       this.company.billMail,this.company.faxNumber,this.company.tlf,this.company.suspendida,this.company.uid);
      // this.companyService.deleteTodo(this.company);
       this.modify = true;
   }
  }

}
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {

    constructor(private modalService: NgbModal) {}
    @Input() company: Company;
    open() {
      const modalRef = this.modalService.open(CompanyForm, { size : 'lg' });
    
      modalRef.componentInstance.company = this.company ;
    }
  }
  @Component({
    selector: 'app-modify-company',
    templateUrl: './modify-company.component.html',
    styleUrls: ['./modify-company.component.css']
  })
  export class ModifyCompanyComponent {
  
      constructor(private modalService: NgbModal) {}
      @Input() company: Company;
      open2() {
        const modalRef = this.modalService.open(CompanyForm, { size : 'lg' });
        modalRef.componentInstance.company = this.company;
        
      }
    }
  