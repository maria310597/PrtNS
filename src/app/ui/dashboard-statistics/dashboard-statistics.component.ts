import { Component, OnInit, Input } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.css']
})
export class DashboardStatisticsComponent implements OnInit {
  @Input() uidUser;
  @Input() name;
  estad: Map<string, number>;
  public barChartData:any[] = [{data: [] , label: ''}];
  public barChartLabels:string[]=[];

  constructor(private stadService: StatisticsService) { }

  ngOnInit() {
    console.log(this.uidUser);
    this.stadService.getHorasEmpresa(this.uidUser).subscribe((result: Map<string, number>) => {
      this.estad = result;
      let fulldata:any[] = [];
      this.estad.forEach((value: number, key: string) => {
        this.barChartLabels.push(key);
        fulldata.push(value);
      });
      this.barChartData = [{data: fulldata , label: this.name},{data: fulldata , label: 'Pepe'},{data: fulldata , label: this.name}];
    });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
          stacked: true
      }],
      yAxes: [{
          stacked: true
      }]
    },
    title: {
      display: true,
      text: 'Horas por empresa'
  }
  };

  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public colors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(110, 110, 219, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(320, 10, 219, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
