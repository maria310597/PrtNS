import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';

import { Reserva } from '../models/reserva';
import { Vehicle } from '../models/vehicle';



@Injectable()
export class VehicleService {
  public available: Vehicle[] = [];
  readonly path = 'vehicles';
  constructor(private afs: AngularFirestore, private notify: NotifyService) { }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.afs.collection<Vehicle>(this.path).valueChanges();
  }

  getReservas(uid: string): Observable<Reserva[]> {
    return this.afs.collection<Reserva>(this.path + '/' + uid + '/reservas').valueChanges();
  }

  deleteReserva(uid: string, coche: string) {
    return this.afs.doc(this.path + '/' + coche + '/reservas/' + uid).delete();
  }

  checkDay(vehicle: Vehicle, date: Date) {
    let reservas: Reserva[];
    console.log(date.getTime().toString());
    this.afs.collection<Reserva>(this.path + '/' + vehicle.uid + '/reservas', ref => 
    ref.where('solicitud', '==', date.getTime().toString()))
    .valueChanges()
    .subscribe((res: Reserva[]) => {
      reservas = res;
      if (reservas.length === 0) {
        this.available.push(vehicle);
        console.log(this.available);
      }
    });
  }

  checkVehiclesForDay(fecha: Date) {
    let vehicles: Vehicle[];
    this.available = [];
    this.getAllVehicles().subscribe((vehi: Vehicle[]) => {
      vehicles = vehi;
      for (let av of vehi) {
        this.checkDay(av, fecha);
      }
    });
  }
  updateReserva() {

  }

}
