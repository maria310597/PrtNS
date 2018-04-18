import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { StatisticsService } from '../../../services/statistics.service';
import { Filter } from '../../../models/filters';
@Component({
  selector: 'app-dashboard-mini-widgets',
  templateUrl: './dashboard-mini-widgets.component.html',
  styleUrls: ['./dashboard-mini-widgets.component.css']
})
export class DashboardMiniWidgetsComponent implements OnInit {
  myuser: Observable<User>;
  uid: string;
  kmparticular: number;
  htotales: number;
  parkingTotal: number;
  partesTotales: number;
  horasSinIguala: number;
  constructor(private authService: AuthenticationService, private staService: StatisticsService) { }
  ngOnInit() {
    this.myuser = this.authService.user;
    this.myuser.subscribe((user : User) =>{
      this.uid = user.uid;
      this.staService.getEstadisticasWidgets(this.uid,user.admin,Filter.Month).subscribe((data:number[])=>{
        this.kmparticular = data[0];
        this.htotales = data[1];
        this.parkingTotal = data[2];
        this.partesTotales = data[3];
        this.horasSinIguala = data[4];
      });
    });
  }
}
