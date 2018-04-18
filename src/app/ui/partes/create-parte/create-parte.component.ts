import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal, NgbTimepicker, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PartesService } from '../../../services/partes.service';
import {CompanyService} from '../../../services/company.service';
import {UserService} from '../../../services/user.service';
import { Report } from '../../../models/report';
import { Company } from '../../../models/company';
import { User } from '../../../models/user';
import { NotifyService } from '../../../core/notify.service';
import { empty } from 'rxjs/Observer';
import {AuthenticationService} from '../../../services/authentication.service';

//import { NotifyService } from '../../core/notify.service';
declare let ClientIP: any;
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
    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="select1">Empresas</label>
  </div>
  <select class="custom-select" id="select1">
    <option *ngFor="let sortOrder of mycompanies"  >{{sortOrder.name}}</option>
    
  </select>
</div>
  

   </div>
      
    <br>
    <label for="name"> Fecha </label>

    <div class="form-group">
      <div class="input-group">
        <input class="form-control" placeholder="yyyy-mm-dd"
              name="date" [(ngModel)]="model.date" [dayTemplate]="customDay" ngbDatepicker #d="ngbDatepicker">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
          <i class="fa fa-calendar"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
  
      </div>

    <br />

   
    <div class="form-inline">
      <a> Hora de Inicio  &nbsp;</a>
      <ngb-timepicker size="small" name="dBegining" [(ngModel)]="time" [(ngModel)]="model.dBegining" [ngModelOptions]="{standalone: true}" ></ngb-timepicker>
    
       </div>

       <div class="form-inline">
      <label for="duracionH" class="form-inline"> Duración Horas &nbsp;</label>
      <input type="number" size=10 class="form-control-inline"  required [(ngModel)]="duracionH"  name="duracionH">

      <label for="duracionM" class="form-inline"> h &nbsp;</label>
      <input type="number" size=10 class="form-control-inline"  required [(ngModel)]="duracionM"  name="duracionM">
      <label for="duracionM" class="form-inline"> min &nbsp;</label>
    </div>
<br> 

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

    <label for="cocheP"> Servicio adicional </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.servAditional" name="serv" id="servSi"  [value]="true" >
      <label class="form-check-label" for="serv"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.servAditional" name="serv" id="servNo"  [value]="false" checked>
      <label class="form-check-label" for="serv"> No </label>
    </div>
    <br>
  
    
    <label for="comment">Descipción:</label>
    <textarea class="form-control" rows="2" name="comment0" id="comment0" [(ngModel)]="model.notes[0]"></textarea>
   

    <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i aria-hidden class="fa fa-plus" title="nuevo comentario"></i> <span class="sr-only">nuevo comentario</span></button>
    <br>
    <div *ngIf="comments>0">
      <label for="comment" >Descipción:</label>
      <textarea class="form-control" rows="2" name="comment1" [(ngModel)]="model.notes[1]"></textarea>
        <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i aria-hidden class="fa fa-plus" title="nuevo comentario"></i> <span class="sr-only">nuevo comentario</span></button>
        <br>
        <div *ngIf="comments>1">
          <label for="comment" >Descipción:</label>
          <textarea class="form-control" rows="2" name="comment2" [(ngModel)]="model.notes[2]"></textarea>
        

        <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i aria-hidden class="fa fa-plus" title="nuevo comentario"></i> <span class="sr-only">nuevo comentario</span></button>
        <br>
        <div *ngIf="comments>2">
          <label for="comment" >Descipción:</label>
          <textarea class="form-control" rows="2" name="comment3" [(ngModel)]="model.notes[3]"></textarea>
        </div>
    </div>
    </div>
    
    
    <button class="btn btn-outline-success float-right" type="submit" (click)="check()" > Guardar </button>
    <br>
    <br>
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
    

    </form>
    </div>
  `
})

export class CreateParteForm implements OnInit {
  @Input() parte;

  

  model;
  //time: NgbTimeStruct = {hour:0,minute:0,second:0};
  //time2: NgbTimeStruct = {hour:0,minute:0,second:0};
  modify:boolean;
  customDay:any;
  time: NgbTimeStruct;
  
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
    this.model.operator = myu.realname;
    });

    
    
  }
 

    
  //sortOrders: string[] = this.getCompaniesName();

  ChangeSortOrder(newSortOrder: string) { 
    this.selectedSortOrder = newSortOrder;
   
    this.model.company = newSortOrder;
  }

  selectedUser: string;
  selectedSortOrder: string = "Empresa";

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
    
    campos: number[]=[0,0,0,0,0,0]; //0 nocheck, 1 checkok, 2checkbad
    check(){
      var selectedText = $("#select1").find("option:selected").text();
      this.model.company = selectedText;
      this.model.duracion = this.duracionH *60 + this.duracionM;
console.log ( this.model.duracion)


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
    if ( this.model.duracion == 0){
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
    
    if(empty == false) {
      this.campos[5] = 1;
    
      if ( this.modify == true){
       // console.log(this.model)
        this.partesService.updateTodo(this.model);
        this.companyService.updateLastMovement(this.model.company,this.model.date);
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
    
duracionH: number = 0;
duracionM: number= 0;
  ngOnInit() {

    this.partesService.getCollection$().subscribe((myparte: Report[]) => {
      this.myparte = myparte;
    });
 
    if (this.parte == undefined){
      var notes: string[] = [];
      this.model = new Report("",null,"",null,0,notes,0,false,0,false,false,false,false,"",false,null, "");
      this.model.hiddenIP = ClientIP;
      this.modify = false;
     }
     else {

        this.model = new Report(this.parte.operator,this.parte.date,
          this.parte.company,this.parte.dBegining,
         this.parte.duracion,this.parte.notes,this.parte.km, this.parte.displacements,
        this.parte.parking, this.parte.free,this.parte.interno, 
      this.parte.telemantenimiento, this.parte.cocheParticular, this.parte.createdby,this.parte.servAditional,this.parte.typec,this.parte.uid);
        // this.partesService.deleteTodo(this.parte);
        this.modify = true;
        var h = this.parte.duracion / 60;
        this.duracionH = Math.trunc(h);
        this.duracionM = this.parte.duracion % 60;
     }

    
     this.getSelectedCompany();
     this.time = this.model.dBegining;
  
     
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
  


 



  