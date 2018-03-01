import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Report} from '../../models/report';

import { PartesService } from '../../services/partes.service';
import { InfoUserComponent } from '../info-user/info-user.component';

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
  constructor(private reportService: PartesService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.reportService.getCollection$().subscribe((mypartes: Report[]) => {
      this.mypartes = mypartes;
      this.dtTrigger.next();
    });
  }


}
