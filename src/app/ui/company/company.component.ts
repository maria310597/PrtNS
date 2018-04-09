import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Company} from '../../models/company';

import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies$: Observable<Company[]>;
  mycompany: Company[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private companyService: CompanyService) { }

  
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };
    this.companyService.getCollection$().subscribe((mycompany: Company[]) => {
      this.mycompany = mycompany;
    
      this.dtTrigger.next();
    });
  }
}
