import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Report } from '../../models/report';
import { PartesService } from '../../services/partes.service';
import { StatisticsService } from '../../services/statistics.service';
import {DashboardStatisticsComponent} from '../dashboard-statistics/dashboard-statistics.component'; 
import {DashboardMiniWidgetsComponent} from '../dashboard-mini-widgets/dashboard-mini-widgets.component';
import { Estadistica } from '../../models/estadistica';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthenticationService, private pService: PartesService, private stadService: StatisticsService) { }
  ngOnInit() {
  
  }
}
