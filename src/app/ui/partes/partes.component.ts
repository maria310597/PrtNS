import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Report} from '../../models/report';
import { User } from '../../models/user';
import { Company } from '../../models/company';

import { PartesService } from '../../services/partes.service';
import { CompanyService } from '../../services/company.service';
import { UserService } from '../../services/user.service';
import { InfoUserComponent } from '../info-user/info-user.component';
import { InfoCompanyComponent } from '../info-company/info-company.component';



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
// tslint:disable-next-line:component-class-suffix
export class ParteInfoContent implements OnInit {
  @Input() uid;

  partes: Report[];
  users: User[];
  company: Company[];

  loaded = false;
  constructor(public activeModal: NgbActiveModal,
    private reportService: PartesService,
    private companyService: CompanyService,
    private userService: UserService) {}



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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private reportService: PartesService, private modalService: NgbModal) { }


  moreInfo(report: Report): void {
    const modal = this.modalService.open(ParteInfoContent, { size : 'lg' });
    modal.componentInstance.uid = report.uid;
  }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.reportService.getCollection$().subscribe((mypartes: Report[]) => {
      this.mypartes = mypartes;
      this.dtTrigger.next();
    });
  }


}
