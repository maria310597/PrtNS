import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Report } from '../../models/report';
import { PartesService } from '../../services/partes.service';
import { StatisticsService } from '../../services/statistics.service';
import {DashboardStatisticsComponent} from '../dashboard-statistics/dashboard-statistics.component'; 
import { Estadistica } from '../../models/estadistica';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    mypartes: Observable<Report[]>;
    estad: Map<string, number>;
    public mio: any;
    uid = '137ni3PFHSMLpJql9apCbuMajgB2';
    name = 'Borja';

  constructor(private auth: AuthenticationService, private pService: PartesService, private stadService: StatisticsService) { }

  ngOnInit() {
    this.mypartes = this.pService.getPartesFromIn$('137ni3PFHSMLpJql9apCbuMajgB2', 'Everis');
    this.stadService.getHorasEmpresaTodos().subscribe((test1: any) => {
      this.mio = test1;
      console.log(this.mio.length);
    })
    this.stadService.getHorasEmpresa('137ni3PFHSMLpJql9apCbuMajgB2').subscribe((result: Map<string, number>) => {
      this.estad = result;
    });
  }
}
