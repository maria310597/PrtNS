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
import { NotificationsService } from 'angular2-notifications';

//import { NotifyService } from '../../core/notify.service';
declare let ClientIP: any;
@Component({
  selector: 'app-create-parte-form',
  styleUrls: ['create-parte.component.css'],
  templateUrl:'modal-create-parte.html'
})

export class CreateParteForm implements OnInit {
  @Input() parte;
  model;
  //time: NgbTimeStruct = {hour:0,minute:0,second:0};
  //time2: NgbTimeStruct = {hour:0,minute:0,second:0};
  modify:boolean;
  customDay:any;
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
     private notifyservice: NotificationsService, private authService: AuthenticationService) {
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
       // console.log(this.model)
        this.partesService.updateTodo(this.model);
        this.companyService.updateLastMovement(this.model.company,this.model.date);
      this.activeModal.close('Close click');
      const toast = this.notifyservice.info('Parte modificado correctamente','', {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true
      });
    
      }else{
       
      this.partesService.add(this.model);
      this.companyService.updateLastMovement(this.model.company,this.model.date);
      this.activeModal.close('Close click');
      const toast = this.notifyservice.info('Parte registrado correctamente.','', {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true
      });
  
      }
      }
    }
    

  ngOnInit() {

    this.partesService.getCollection$().subscribe((myparte: Report[]) => {
      this.myparte = myparte;
    });
 
    if (this.parte == undefined){
      var notes: string[] = [];
      var date = new Date();
      var mengbDateStruct = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
      this.model = new Report("",mengbDateStruct,"",null,null,notes,0,false,0,false,false,false,false,"",false,null, "");
      this.model.hiddenIP = ClientIP;
      this.modify = false;
     }
     else {

        this.model = new Report(this.parte.operator,this.parte.date,
          this.parte.company,this.parte.dBegining,
         this.parte.dEnd,this.parte.notes,this.parte.km, this.parte.displacements,
        this.parte.parking, this.parte.free,this.parte.interno, 
      this.parte.telemantenimiento, this.parte.cocheParticular, this.parte.createdby,this.parte.servAditional,this.parte.typec,this.parte.uid);
        // this.partesService.deleteTodo(this.parte);
        this.modify = true;
     }

    
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
  


 



  