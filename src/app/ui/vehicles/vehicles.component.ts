import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
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
        console.log(event.meta.uidr);
        console.log(event.meta.coche);
         this.vehicleService.deleteReserva(event.meta.uidr, event.meta.cocheuid);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;
  reservas: Reserva[];
  myuser: User;

  constructor(private modal: NgbModal, private vehicleService: VehicleService, private authService: AuthenticationService) {}

  ngOnInit() {
    const coche1 = 'dMKW1qvTLc79c02BEOOR';
    this.vehicleService.getReservas(coche1).subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
      for (let reserva of this.reservas) {
        this.añadirReservasDB(coche1, reserva.solicitud, reserva.solicitudEnd, reserva.motivo, reserva.by, reserva.uid);
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

  añadirReservasDB(coche: string, start: Date, end: Date, motivo: string, by: string, uidr: string): void {
    this.events.push({
      title: 'Operario: ' + by + '<br> Motivo: ' + motivo,
      start: startOfDay(start),
      end: endOfDay(end),
      color: colors.red, // Implementar seleccion de coche
      draggable: true,
      actions: this.actions,
      meta: {
        createdby: by,
        cocheuid: coche,
        uidr: uidr
      }
    });
    this.refresh.next();
  }
}
