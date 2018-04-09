import { Component, OnInit, Input } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { Filter } from '../../../models/filters';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  @Input() uidUser;
  @Input() name;
  estad: Map<string, number>;
  public barChartData:any[] = [{data: [] , label: ''}];
  public barChartLabels:string[]=[];

  constructor(private stadService: StatisticsService) { }

  ngOnInit() {
    console.log(this.uidUser);
    this.stadService.getHorasEmpresa(this.uidUser,Filter.Month).subscribe((result: Map<string, number>) => {
      this.estad = result;
      let fulldata:any[] = [];
      this.estad.forEach((value: number, key: string) => {
        console.log(key,value);
        this.barChartLabels.push(key);
        fulldata.push(value);
      });
      this.barChartData = [{data: fulldata , label: this.name}];
    });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Horas por empresa'
  }
  };

  
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;
  public colors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(110, 110, 219, 1)',
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
