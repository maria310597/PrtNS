
import { Company } from '../../models/company';
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PartesService } from '../../services/partes.service';
import { Report } from '../../models/report';
import { NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { async } from 'q';
@Component({
  selector: 'app-facturacion-form',
  templateUrl: './facturacion-form.component.html',
  styleUrls: ['./facturacion-form.component.css']
})
export class FacturacionFormComponent implements OnInit{
  
  @Input() company: Company;

  mypartes: Report[] = [];
  servAditional: Report[];
  weekend: Report[] = [];
  totalHours: number = 0 ;
  iguala: number = 0;
  partesExceso: Report[] = [];
  extra: number = 0;
  hFinSemana: number = 0;
  allPartes: Report[] =[];
  months: number[] = [];
  selected: number = new Date().getMonth()+1 ;
  HGastadas: number = 0;
  hServAditional:number = 0;
  HIguala: number = 0;

    constructor(public activeModal: NgbActiveModal, public partesService: PartesService){
      
    }
   
     ngOnInit() {
       var ig = this.company.igualahours*60;
       if(ig === 0){
        this.iguala = 99999999999999;
       }else this.iguala = ig;
      
      
      
      for(let i = 0;i<=new Date().getMonth()+1;i++){
        this.months.push(i);
      }
       this.partesService.getPartesCompany$(this.company.name).subscribe((mypartes: Report[]) => {
         
        
         this.allPartes = mypartes;
          for (let p of mypartes){
            if (p.date.month === this.selected){
              this.mypartes.push(p);
            }
          }
         console.log(this.mypartes)
          
          this.getTotal();
          this.getHorasFinSemana();
          this.getExceso();
          this.getHGastadas();
          this.getHServAdicional();

      
         
     });

     this.partesService.getServAditionalCompany$(this.company.name).subscribe((mypartes: Report[]) => {
        this.servAditional = mypartes;
        });
          
        
    }
    ChangeMonth(newM: number) { 
     this.HGastadas= 0;
      this.hServAditional = 0;
      this.HIguala = 0;
      this.extra= 0;
      this.hFinSemana= 0;
      this.totalHours= 0 ;

        this.selected = newM;
        var partes: Report[] = [];
        Object.assign(partes,this.allPartes);
        this.mypartes = [];
      
        for ( let p of partes){
          if ( p.date.month === newM){
            this.mypartes.push(p);
          }
        }
        console.log(this.mypartes)
          
          this.getTotal();
          this.getHorasFinSemana();
          this.getExceso();
          this.getHGastadas();
          this.getHServAdicional();
      
    }
   
    getHorasFinSemana(){

      for(let parte of this.mypartes){
        var date = new Date(parte.date.year,parte.date.month-1,parte.date.day);
       
        if( date.toString().includes('Sat') || date.toString().includes('Sun') && !parte.servAditional){
          this.weekend.push(parte);
          this.hFinSemana = this.hFinSemana +(((parte.dEnd.hour*60)+(parte.dEnd.minute)) - (parte.dBegining.hour*60 + parte.dBegining.minute));
        }
      } 
     
    }
    //Sin contar que sean servicios adicionales
    getTotal(){
      let total:number  = 0;
      for(let parte of this.mypartes) {
        if( !parte.servAditional){
          total +=  ((parte.dEnd.hour*60)+(parte.dEnd.minute)) - (parte.dBegining.hour*60 + parte.dBegining.minute);
        }
      }
      this.totalHours = total;
    }
    getHServAdicional(){
      let total:number  = 0;

      for(let parte of this.mypartes) {
        if( parte.servAditional){
          total +=  ((parte.dEnd.hour*60)+(parte.dEnd.minute)) - (parte.dBegining.hour*60 + parte.dBegining.minute);
        }
      }
      this.hServAditional = total;
    }
    getExceso(){
    
      let horas: number=0;
      let exceso:number = 0;
      let h:number = 0;

      for(let parte of this.mypartes)  {
        var date = new Date(parte.date.year,parte.date.month-1,parte.date.day);

        if (!parte.servAditional && !(date.toString().includes('Sat') || date.toString().includes('Sun'))) {
         
          horas +=  ((parte.dEnd.hour*60)+(parte.dEnd.minute)) - (parte.dBegining.hour*60 + parte.dBegining.minute);
            if(this.iguala < horas){
              this.partesExceso.push(parte);
            }
        }
        
      }
      this.HIguala = horas;
      h = horas - this.iguala;
      if (h > 0 ){
        this.extra =  h;
      }else this.extra = 0;
     
    }
    
    getHGastadas(){

     let h:number = this.HIguala;
      if ( this.HIguala < this.iguala ){
        this.HGastadas = h;
      }
      else this.HGastadas = this.iguala;
    }

    
  }
  @Component({
    selector: 'app-facturacion-NoIguala',
    templateUrl: './facturacion-formNo.component.html',
    styleUrls: ['./facturacion-form-No.component.css']
  })
  export class FacturacionFormNo implements OnInit{
    @Input() company: Company;
    
    months: number[] = [];
    selected: number = new Date().getMonth()+1 ;
    mypartes: Report[] = [];
    servAditional: Report[];
    weekend: Report[] = [];
    hFinSemana: number = 0;
    allPartes: Report[] =[];
    totalHours: number = 0 ;
    hours: number = 0;

    constructor(public activeModal: NgbActiveModal, public partesService: PartesService){ 
    }

    

     ngOnInit() {

      for(let i = 0;i<=new Date().getMonth()+1;i++){
        this.months.push(i);
      }
       this.partesService.getPartesCompany$(this.company.name).subscribe((mypartes: Report[]) => {
         
        
         this.allPartes = mypartes;
          for (let p of mypartes){
            if (p.date.month === this.selected){
              this.mypartes.push(p);
            }
          }
          this.getHorasFinSemana();
          this.getHoras();
       });
    }
    ChangeMonth(newM: number) { 
     
       this.hFinSemana= 0;
    
 
         this.selected = newM;
         var partes: Report[] = [];
         Object.assign(partes,this.allPartes);
         this.mypartes = [];
       
         for ( let p of partes){
           if ( p.date.month === newM){
             this.mypartes.push(p);
           }
         }
         console.log(this.mypartes)
           
          // this.getTotal();
           this.getHorasFinSemana();
           this.getHoras();
           /*this.getExceso();
           this.getHGastadas();
           this.getHServAdicional();*/
       
     }
     getHorasFinSemana(){

      for(let parte of this.mypartes){
        var date = new Date(parte.date.year,parte.date.month-1,parte.date.day);
       
        if( date.toString().includes('Sat') || date.toString().includes('Sun')){
          this.weekend.push(parte);
          this.hFinSemana = this.hFinSemana +(((parte.dEnd.hour*60)+(parte.dEnd.minute)) - (parte.dBegining.hour*60 + parte.dBegining.minute));
        }
      } 
     
    }

    getHoras(){
      let total:number  = 0;
      for(let parte of this.mypartes) {
        var date = new Date(parte.date.year,parte.date.month-1,parte.date.day);

        if (!(date.toString().includes('Sat') || date.toString().includes('Sun'))) {
          total +=  ((parte.dEnd.hour*60)+(parte.dEnd.minute)) - (parte.dBegining.hour*60 + parte.dBegining.minute);
        
      }
     
    }
    this.hours = total;
  }

}


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent{
@Input() company: Company;


constructor(private modalService: NgbModal) {}
open() {
  if (this.company.igualada){
    const modalRef = this.modalService.open(FacturacionFormComponent, { size : 'lg' });
    modalRef.componentInstance.company = this.company ;
  }else {
    const modalRef = this.modalService.open(FacturacionFormNo, { size : 'lg' });
    modalRef.componentInstance.company = this.company ;
  }
  
}
}
