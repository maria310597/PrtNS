import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal, NgbTimepicker, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PartesService } from '../../services/partes.service';
import {CompanyService} from '../../services/company.service';
import {UserService} from '../../services/user.service';
import { Report } from '../../models/report';
import { Company } from '../../models/company';
import { User } from '../../models/user';
import { NotifyService } from '../../core/notify.service';
import { empty } from 'rxjs/Observer';
import {AuthenticationService} from '../../services/authentication.service';

//import { NotifyService } from '../../core/notify.service';

@Component({
  selector: 'app-create-parte-form',
  styles: ["js/bootstrap.min.js", 
  "js/bootstrap.js"
],
  template: `
  
  <div class="modal-header">
      <h4 class="modal-title">Nuevo Parte</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
    
  
    <div class="row">
    <div class="col">
    <div ngbDropdown class="d-inline-block">
    <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>{{selectedUser}}</button>
   <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
     <button class="dropdown-item" *ngFor="let u of myusers" (click)="ChangeUser(u.realname)" >{{u.realname}} </button>
   </div>
   </div>
   </div>
   </div>
      
    <br />
    <label for="name"> Fecha </label>

    <div class="form-group">
      <div class="input-group">
        <input class="form-control" placeholder="yyyy-mm-dd"
              name="date" [(ngModel)]="model.date" ngbDatepicker #d="ngbDatepicker">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
          <i class="fa fa-calendar"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
       <div class="col">
       <div ngbDropdown class="d-inline-block">
       <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>{{selectedSortOrder}}</button>
      <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
        <button class="dropdown-item" *ngFor="let sortOrder of mycompanies" (click)="ChangeSortOrder(sortOrder.name)" >{{sortOrder.name}}</button>
      </div>
      </div>
      </div>
      </div>

    <br />

   
    <div class="form-inline">
      <a> Hora de Inicio  &nbsp;</a>
      <ngb-timepicker size="small" name="dBegining" [(ngModel)]="time" [(ngModel)]="model.dBegining" [ngModelOptions]="{standalone: true}" ></ngb-timepicker>
    
      <a>&nbsp; Hora de Fin &nbsp;</a>
      <ngb-timepicker  size="small" name="dEnd" [(ngModel)]="time2" [(ngModel)]="model.dEnd"[ngModelOptions]="{standalone: true}"></ngb-timepicker>
    </div>

    <div class="form-inline">
      <label for="km"class="form-inline"> Km recorridos &nbsp;</label>
      <input type="number" size=10 class="form-control-inline"  required [(ngModel)]="model.km"  name="km">

    </div>
<br> 

<div class="form-inline">
<label for="Park"class="form-inline"> Parking &nbsp;</label>
<input type="number" size=10 class="form-control-inline"  required [(ngModel)]="model.parking"  name="park">

</div>
<br> 
<label for="displacements"> Desplazamiento </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.displacements" name="dis" id="disSi"  [value]="true" checked>
      <label class="form-check-label" for="dis"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.displacements" name="dis" id="disNo"  [value]="false">
      <label class="form-check-label" for="dis"> No </label>
    </div>
    
    <br>

    <label for="gratuito"> Gratuito </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.free" name="grati" id="gratiSi"  [value]="true" checked>
      <label class="form-check-label" for="grati"> Si </label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.free" name="grati" id="gratiNo"  [value]="false">
      <label class="form-check-label" for="grati"> No </label>
    </div>
    <br>
    
    <label for="intern"> Interno </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="intern" [(ngModel)]="model.interno" id="internSi"  [value]="true" checked>
      <label class="form-check-label" for="intern"> Si </label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.interno" name="intern" id="internNo"  [value]="false">
      <label class="form-check-label" for="intern"> No </label>
    </div>
    <br>

    <label for="telemantenimiento"> Telemantenimiento </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.telemantenimiento" name="tele" id="teleSi"  [value]="true" checked>
      <label class="form-check-label" for="tele"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.telemantenimiento" name="tele" id="teleNo"  [value]="false">
      <label class="form-check-label" for="tele"> No </label>
    </div>
    <br>


    <label for="cocheP"> Coche Particular </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.cocheParticular" name="coche" id="cocheSi"  [value]="true" checked>
      <label class="form-check-label" for="coche"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.cocheParticular" name="coche" id="cocheNo"  [value]="false">
      <label class="form-check-label" for="coche"> No </label>
    </div>
    <br>
  
    
    <label for="comment">Descipción:</label>
    <textarea class="form-control" rows="2" id="comment"></textarea>
   

    <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i class="fa fa-plus"></i></button>
    <br>
    <div *ngIf="comments>0">
      <label for="comment" >Descipción:</label>
      <textarea class="form-control" rows="2" name="comment0" [(ngModel)]="model.notes[0]"></textarea>
        <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i class="fa fa-plus"></i></button>
        <br>
        <div *ngIf="comments>1">
          <label for="comment" >Descipción:</label>
          <textarea class="form-control" rows="2" name="comment1" [(ngModel)]="model.notes[1]"></textarea>
        

        <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i class="fa fa-plus"></i></button>
        <br>
        <div *ngIf="comments>2">
          <label for="comment" >Descipción:</label>
          <textarea class="form-control" rows="2" name="comment2" [(ngModel)]="model.notes[2]"></textarea>
        </div>
    </div>
    </div>
    
    
    <button class="btn btn-outline-dark" type="submit" (click)="check()" > Guardar </button>

    <div  *ngIf="campos[0]==2" class="alert alert-primary" role="alert">
      Te ha faltado rellenar el campo usuario
    </div>
    <div  *ngIf="campos[1]==2" class="alert alert-primary" role="alert">
      Te ha faltado rellenar el campo fecha
    </div>
    <div  *ngIf="campos[2]==2" class="alert alert-primary" role="alert">
      Te ha faltado rellenar el campo Empresas
    </div>
    <div  *ngIf="campos[3]==2" class="alert alert-primary" role="alert">
      Te ha faltado rellenar el campo hora de inicio
    </div>
    <div  *ngIf="campos[4]==2" class="alert alert-primary" role="alert">
      Te ha faltado rellenar el campo hora de fin
    </div>
    <div  *ngIf="campos[5]==2" class="alert alert-primary" role="alert">
     La hora de inicio es mayor que la de fin
    </div>
    

    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class CreateParteForm implements OnInit {
  @Input() parte;

  

  model;
  //time: NgbTimeStruct = {hour:0,minute:0,second:0};
  //time2: NgbTimeStruct = {hour:0,minute:0,second:0};
  modify:boolean;
  time: NgbTimeStruct;
  time2: NgbTimeStruct;
  partes$: Observable<Report[]>;
  myparte: Report[];

  company$: Observable<Company[]>;
  mycompanies: Company[];

  user$: Observable<User[]>;
  myusers: User[];

  comments:number=0;
  
  constructor(public activeModal: NgbActiveModal, private ref: ChangeDetectorRef, private partesService: PartesService, 
    private companyService: CompanyService, private userService: UserService,
     private notify: NotifyService, private authService: AuthenticationService) {
    this.companyService.getCollection$().subscribe((myc: Company[]) => {
       this.mycompanies = myc;

    });
    this.userService.getAllUsers$().subscribe((myu: User[]) => {
      this.myusers = myu;
  
   });
   this.authService.user.subscribe((myu: User) => {
    this.model.createdby = myu.uid;
    });
    
  }
 

    
  //sortOrders: string[] = this.getCompaniesName();

  ChangeSortOrder(newSortOrder: string) { 
    this.selectedSortOrder = newSortOrder;
    this.model.company = newSortOrder;
  }

  selectedUser: string = "Usuario";
  selectedSortOrder: string = "Empresa";
  getSelectedUser(){
    if (this.model.operator == "") this.selectedUser =  "Usuario";
    else this.selectedUser=  this.model.operator;
  }
  getSelectedCompany(){
    
    if (this.model.company == "") this.selectedSortOrder =  "Empresa";
    else this.selectedSortOrder=  this.model.company;
  }
  ChangeUser(newU: string) { 
    this.selectedUser = newU;
    this.model.operator = newU;
    
  }



    newComment(){
     this.comments++;
    }
    
    campos: number[]=[0,0,0,0,0,0,0]; //0 nocheck, 1 checkok, 2checkbad
    check(){
      if ( this.model.operator ==''){
          this.campos[0] = 2;
      }else this.campos[0] = 1;

      if ( this.model.date ==null){
        this.campos[1] = 2;
      }else this.campos[1] = 1;

     if ( this.model.company ==''){
      this.campos[2] = 2;
    }else this.campos[2] = 1;

    if (  this.model.dBegining == null){
      this.campos[3] = 2;
    }else {
      this.campos[3] = 1;
      
    }
    if ( this.model.dEnd ==null){
     this.campos[4] = 2;
    }else this.campos[4] = 1;

    if(this.model.dEnd != null && this.model.dBegining != null){
     var min = (this.time2.hour*60 + this.time2.minute) - (this.time.hour*60 + this.time.minute);
     
     if ( min < 0) this.campos[5] = 2;
     else this.campos[5] = 1;
   
    }
    
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
    
    if(empty == false) {
      this.campos[6] = 1;
     
      if ( this.modify == true){
        this.partesService.updateTodo(this.model);
      this.activeModal.close('Close click')
      this.notify.update('Parte modificado correctamente', 'success');
      }else{
       
      this.partesService.add(this.model);
      this.companyService.updateLastMovement(this.model.company,this.model.date);
      this.activeModal.close('Close click')
      this.notify.update('Parte registrado correctamente', 'success');
      }
      }
    }
    

  ngOnInit() {

    this.partesService.getCollection$().subscribe((myparte: Report[]) => {
      this.myparte = myparte;
    });
 
    if (this.parte == undefined){
      var notes: string[] = [];
      this.model = new Report("",null,"",null,null,notes,0,false,0,false,false,false,false,"",null, "");
      this.modify = false;
     }
     else {

        this.model = new Report(this.parte.operator,this.parte.date,
          this.parte.company,this.parte.dBegining,
         this.parte.dEnd,this.parte.notes,this.parte.km, this.parte.displacements,
        this.parte.parking, this.parte.free,this.parte.interno, 
      this.parte.telemantenimiento, this.parte.cocheParticular, this.parte.createdby,this.parte.uid);
        // this.partesService.deleteTodo(this.parte);
        this.modify = true;
     }

     
     this.getSelectedUser();
     this.getSelectedCompany();
     this.time = this.model.dBegining;
   this.time2 = this.model.dEnd;
     
  }

}
@Component({
  selector: 'app-create-parte',
  templateUrl: './create-parte.component.html',
  styleUrls: ['./create-parte.component.css']
})
export class CreateParteComponent {

    constructor(private modalService: NgbModal) {}
    @Input() uid: string;
    open() {
      const modalRef = this.modalService.open(CreateParteForm, { size : 'lg' });
      modalRef.componentInstance.uid = this.uid ;
    }
  }
  @Component({
    selector: 'app-modify-parte',
    templateUrl: './modify-parte.component.html',
    styleUrls: ['./modify-parte.component.css']
  })
  export class ModifyParteComponent {
  
      constructor(private modalService: NgbModal) {}
      @Input() parte: Report;
      open2() {
        const modalRef = this.modalService.open(CreateParteForm, { size : 'lg' });
        modalRef.componentInstance.parte = this.parte;
        

        
      }
    }
  


 



  