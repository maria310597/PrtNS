import { Component, OnInit, Input } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { Estadistica } from '../../../models/estadistica';
import { Company } from '../../../models/company';
import { Filter } from '../../../models/filters';
import { CompanyService } from '../../../services/company.service';

interface OurData {
  data: any[];
  label:string;
}

@Component({
  selector: 'app-dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.css']
})

export class DashboardStatisticsComponent implements OnInit {
  // Variables
  @Input() uidUser;
  @Input() name;
  ready = false;
  mycompanys: Company[];
  public barChartData:any[] = [{data:[],label:''}];
  public barChartLabels:string[]=[];
  public allData: Estadistica[];


  constructor(private stadService: StatisticsService, private companyService:CompanyService) { }

  ngOnInit() {
    this.companyService.getCollection$().subscribe((mycompany: Company[]) => {
      this.mycompanys = mycompany;
      for(let c of this.mycompanys){
        this.barChartLabels.push(c.name);
      }
    });
    this.stadService.getHorasEmpresaTodos(Filter.Month).subscribe((myvar: Estadistica[]) => {
     this.allData = myvar;
     let labels:OurData = {data:[],label:''}; 
     while(this.barChartData.length != this.allData.length){
      this.barChartData.push(labels); // Esto es necesario para que no falle inicialmente
    }
     let j = 0;
      for(let e of this.allData){
        let dataofUser = new Array(this.barChartLabels.length).fill(0);
        let label = e.user.nickname;
         e.estad.forEach((value: number, key: string) => {
         let index = this.barChartLabels.indexOf(key);
         dataofUser[index] = value;
        });
        let finalData:OurData = {data:dataofUser,label:label};
        this.barChartData[j] = finalData;
        j++;
      }
      this.ready = true;
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
