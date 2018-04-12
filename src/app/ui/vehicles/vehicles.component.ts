import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import 'rxjs/add/observable/combineLatest';

import {
  startOfDay,
  
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfHour
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent, CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { VehicleService } from '../../services/vehicle.service';
import { Reserva } from '../../models/reserva';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Vehicle } from '../../models/vehicle';
import { NotifyService } from '../../core/notify.service';
import { NgbActiveModal, NgbTimepicker, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./vehicles.component.css'],
  templateUrl: './vehicles.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class VehiclesComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';
  time: NgbTimeStruct;
  time2: NgbTimeStruct;
  viewDate: Date = new Date();
  locale = 'es_ES';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  modalData: {
    by: string;
    data: Date;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        //console.log(event.meta.uidr);
       // console.log(event.meta.coche);
         this.vehicleService.deleteReserva(event.meta.uidr, event.meta.cocheuid);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;
  reservas: Reserva[] = [];
  myuser: User;
  vehiculo: string;
  copy: Reserva[] = [];
  vehiculos: Vehicle[];
  constructor(private modal: NgbModal, private vehicleService: VehicleService, private authService: AuthenticationService, private notify: NotifyService) {}

  ngOnInit() {
    const coche1 = 'dMKW1qvTLc79c02BEOOR';
    this.time ={hour: 0, minute: 0, second: 0};
    this.time2 ={hour: 0, minute: 0, second: 0};

    this.vehicleService.getAllVehicles().subscribe((v: Vehicle[]) => {
      this.vehiculos = v;
      this.events = [];
    for (let ve of v){
     
      //console.log("ve.uid")
      this.vehicleService.getReservas(ve.uid).take(1).subscribe((reservas: Reserva[]) => {
        
          //console.log(this.reservas)
          this.reservas = reservas;
          //console.log(this.reservas)
          var inicio: Date;
          var fin: Date;

          for (let reserva of this.reservas) {
          inicio = new Date(reserva.solicitud);
          inicio.setHours(reserva.timeStart.hour);
          inicio.setMinutes(reserva.timeStart.minute);

          fin = new Date(reserva.solicitud);
          
          fin.setHours(reserva.timeEnd.hour);
          fin.setMinutes(reserva.timeEnd.minute);


            this.añadirReservasDB(ve, inicio, fin, reserva.motivo, reserva.by, reserva.uid);
          }
    
  
     // console.log(this.events)
    }); 
  }
  });
    this.authService.user.subscribe((user: User) => {
      this.myuser = user;
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }



  realizarReserva(by: string, data: Date): void {
    this.vehicleService.checkVehiclesForDay(data);
    this.modalData = { by, data };
    this.modal.open(this.modalContent);
  }

  // Funcion buena;

  addEventC(date: Date): void {
    this.events.push({
      start: date,
      title: 'New event',
      color: colors.red
    });
    this.refresh.next();
  }

  añadirReservasDB(coche: Vehicle, inicio: Date, fin: Date, motivo: string, by: string, uidr: string): void {

  this.events.push({
                  title: 'Operario: ' + by + '<br> Motivo: ' + motivo + '<br> Coche: ' + coche.Marca,
                  start: inicio, 
                 
                  end: fin,
                  color: colors.red, // Implementar seleccion de coche
                  draggable: true,
                  actions: this.actions,
                  meta: {
                    createdby: by,
                    cocheuid: coche.uid,
                    uidr: uidr
      }
    });
   // console.log(this.events)
    this.refresh.next();
        
   
  }

motivo: string;

  solicitar(){
    var selectedText = $("#inputGroupSelect02").find("option:selected").text();
    var reserva = new Reserva(this.myuser.realname,this.motivo,this.modalData.data,this.time,this.time2);
    
    this.vehicleService.getVehiculeID$(selectedText).subscribe(v =>{
     
      var uidR = this.vehicleService.addReserva(reserva,v[0].uid);

      var inicio = new Date(reserva.solicitud);
          inicio.setHours(reserva.timeStart.hour);
          inicio.setMinutes(reserva.timeStart.minute);

          var fin = new Date(reserva.solicitud);
          
          fin.setHours(reserva.timeEnd.hour);
          fin.setMinutes(reserva.timeEnd.minute);


            this.añadirReservasDB(v[0], inicio, fin, reserva.motivo, reserva.by, uidR);
      
    });
    this.motivo = "";
    this.notify.update('Vehiculo reservado correctamente', 'success');
  }
  operativos: Vehicle[] = [];
  mostrarcoches() {

    var reservado: Reserva[] = [];//Reservas Coincidentes
    var inicio: number= 0;
    var fin: number= 0;
    this.operativos = [];
    var inicioNow: number = this.time.hour*60 + this.time.minute;
    var finNow: number = this.time2.hour*60 + this.time2.minute;

    for( let reserva of this.reservas){
      
      inicio = reserva.timeStart.hour * 60 + reserva.timeStart.minute;
      fin = reserva.timeEnd.hour * 60 + reserva.timeEnd.minute;

      if(JSON.stringify(reserva.solicitud).toLocaleLowerCase() === JSON.stringify(this.modalData.data).toLocaleLowerCase()
       && finNow <= fin && inicioNow >= inicio){

        reservado.push(reserva);
      }
    }
    if (reservado.length == 0) {
      //console.log(this.vehiculos)
     this.operativos = this.vehiculos;
     //console.log(this.operativos)
      // return this.vehiculos;
    }
    else {
     // var coches: Vehicle[] =[];
     // var car: Observable<Vehicle>;
      let observables = [];

      for ( let r of reservado){

       observables.push( this.vehicleService.getVehicleFromRe(r.uid));
    }

    Observable.combineLatest(observables).subscribe(data =>{

      var disponibles: Vehicle[] = [];
      Object.assign(disponibles ,this.vehiculos);
      

      for(let d of data){
        let i = 0;
        for(let v of this.vehiculos){
          if (d.uid === v.uid) {
            disponibles.splice(i,1);
            break;
          }
          else i++;
        }
         
        }
       
        this.operativos = disponibles;
       // console.log(this.operativos)
        //return disponibles;
        });
    

  }
}

}