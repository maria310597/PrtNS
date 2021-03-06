import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal,NgbDatepicker,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Report} from '../../../models/report';
import { User } from '../../../models/user';
import { Company } from '../../../models/company';

import { HttpClient } from '@angular/common/http';
import { PartesService } from '../../../services/partes.service';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';
import { InfoUserComponent } from '../../user/info-user/info-user.component';
import { InfoCompanyComponent } from '../../company/info-company/info-company.component';

import { DataTablesModule } from 'angular-datatables';

import { Button } from 'protractor';
import { ExportService } from '../../../services/export.service';
import { StatisticsService } from '../../../services/statistics.service';
import { AuthCredential } from '@firebase/auth-types';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-user-info-content',
  styles: [`
  .btn{
    border-radius: 0;
    }
    .btn-md {
    border-width: 0;
    outline: none;
    border-radius: 0;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .6);
    cursor: pointer;
    }
    `
],
  templateUrl: './info-parte.component.html',
})

export class ParteInfoContent implements OnInit {
  @Input() uid;

  privateIP ;
  publicIP;

  partes: Report[];
  users: User[];
  company: Company[];

  loaded = false;

  constructor(public activeModal: NgbActiveModal,
    private reportService: PartesService,
    private companyService: CompanyService,
    private userService: UserService,
    private exportService:ExportService)
    {

    }

    sacarPDF(){
      this.exportService.createPDF("","test.pdf");
     }

    loadCompany(name: string) {
      this.companyService.getCompany$(name).subscribe((company: Company[]) => {
        this.company = company;
        this.loaded = true;
      });
    }

    loadUser(parte: Report) {
      this.userService.getUser$(parte.createdby).subscribe((users: User[]) => {
        this.users = users;
        this.loadCompany(parte.company);
    });

    
    }

  

  ngOnInit() {
    this.reportService.getParte$(this.uid).subscribe((partes: Report[]) => {
        this.partes = partes;
        this.loadUser(this.partes[0]);
    });
  }
}





@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css']
})
export class PartesComponent implements OnInit {
  partes$: Observable<Report[]>;
  mypartes: Report[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  selectedUser: string = "Usuario";
  selectedCompany: string = "Empresa";

  user$: Observable<User[]>;
  myusers: User[];
  myuser: User;
  dtTriggerU: Subject<any> = new Subject();

  company$: Observable<Company[]>;
  mycompanies: Company[];
  dtTriggerC: Subject<any> = new Subject();
  dropDownCompany: string[] = ["No filtrar"];
  ChangeUser(newU: string) { 
    this.selectedUser = newU;
  }
  ChangeCompany(newC: string) { 
    this.selectedCompany = newC;
  }
  /*getSelectedUser(){
    if (this.model.operator == "") this.selectedUser =  "Usuario";
    else this.selectedUser=  this.model.operator;
  }*/

  constructor(private reportService: PartesService,private companyService: CompanyService, 
    private modalService: NgbModal, private userService: UserService,
    private exportService: ExportService,private staService: StatisticsService,
    private authService: AuthenticationService ) { 
    this.userService.getAllUsers$().subscribe((myu: User[]) => {
      this.myusers = myu;
      this.dtTriggerU.next();
   });
  
  this.companyService.getCollection$().subscribe((myc: Company[]) => {
    this.mycompanies = myc;
   
    this.dtTriggerC.next();
    for(let c of myc){
      this.dropDownCompany.push(c.name)
    }

   });
  
   
  }


  export(){
    this.exportService.createPDF("",'test.pdf');
 
  }

  moreInfo(report: Report): void {
    const modal = this.modalService.open(ParteInfoContent, { size : 'lg' });
    modal.componentInstance.uid = report.uid;
  }

  exportarPdf(){

    $('#table').DataTable({
     

  })
}

  exportarCsv(){

  }
  clear(){
    this.reportService.getCollection$().subscribe((mypartes: Report[]) => {
      this.mypartes = mypartes;
      this.dtTrigger.next();
    });
  }
  filtrar(date :NgbDateStruct, date2: NgbDateStruct){
    var selectedText = $("#select").find("option:selected").text();
    this.selectedCompany = selectedText;
    
    //Ninuno
    if ( this.selectedCompany == "Empresa"){
      if( this.selectedUser == "Usuario"){
        this.reportService.getCollection$().subscribe((mypart: Report[]) => {
          this.mypartes = [];
          for(let par of mypart){
            if(par.date.year >= date.year && par.date.year <= date2.year && par.date.month >= date.month && par.date.month <= date2.month
            && par.date.day >= date.day && par.date.day <= date2.day ){
              this.mypartes.push(par);
            }
          }
          this.dtTrigger.next();

        });
      }// Usuario
      else{
        this.reportService.getPartesFromOperator$(this.selectedUser).subscribe((mypart : Report[]) => {
          this.mypartes = [];
          for(let par of mypart){
            if(par.date.year >= date.year && par.date.year <= date2.year && par.date.month >= date.month && par.date.month <= date2.month
            && par.date.day >= date.day && par.date.day <= date2.day ){
              this.mypartes.push(par);
            }
          }
          this.dtTrigger.next();
        });
      }
    }
    else{
      //Empresa
      if( this.selectedUser == "Usuario"){
        this.reportService.getPartesCompany$(this.selectedCompany).subscribe((mypart : Report[]) => {
          this.mypartes = [];
          for(let par of mypart){
            if(par.date.year >= date.year && par.date.year <= date2.year && par.date.month >= date.month && par.date.month <= date2.month
            && par.date.day >= date.day && par.date.day <= date2.day ){
              this.mypartes.push(par);
            }
          }
          this.dtTrigger.next();
        });
      }//Todos
      else{
        this.reportService.getPartesFromInCU$(this.selectedCompany, this.selectedUser).subscribe((mypar: Report[]) => {
         
          this.mypartes = [];
          for(let par of mypar){
            
            if(par.date.year >= date.year && par.date.year <= date2.year && par.date.month >= date.month && par.date.month <= date2.month
            && par.date.day >= date.day && par.date.day <= date2.day ){
              
              this.mypartes.push(par);
            }

          }
          
         // this.mypartes = mypar;
          this.dtTrigger.next();
        });
      }
    }
 
    
     
    }
   //console.log(this.selectedCompany)
    
  


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    };

    this.authService.user.subscribe((data: User)=>{
      this.myuser = data;
      if(data.admin){
        this.reportService.getCollection$().subscribe((mypartes: Report[]) => {
          this.mypartes = mypartes;
          this.dtTrigger.next();
        });
      }else{
        this.reportService.getPartesFrom$(data.uid).subscribe((mypartes: Report[]) => {
          this.mypartes = mypartes;
          this.dtTrigger.next();
        });
      }
    });
  
  }


}
