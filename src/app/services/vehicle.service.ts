import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Report} from '../models/report';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../core/notify.service';
import 'rxjs/add/observable/combineLatest';
import { Reserva } from '../models/reserva';
import { Vehicle } from '../models/vehicle';



@Injectable()
export class VehicleService {
  public available: Vehicle[] = [];
  readonly path = 'vehicles';
  constructor(private afs: AngularFirestore, private notify: NotifyService) { 
    
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.afs.collection<Vehicle>(this.path).valueChanges();
  }
  getVehiculeID$( vehiculo:  string): Observable<Vehicle[]> {
    return this.afs.collection<Vehicle>(this.path, ref => ref.where('Marca', '==', vehiculo)).valueChanges();
  }
  getReservas(uid: string): Observable<Reserva[]> {
    return this.afs.collection<Reserva>(this.path + '/' + uid + '/reservas').valueChanges();
  }
  getVehicleFromRe(uid: string): Observable<Vehicle> {
    var vehiculos: Vehicle[] = [];
    var devuelto: boolean = false;
    var total;

  return Observable.create(result => {

    this.getAllVehicles().subscribe(car => {
      
      vehiculos = car;
      let observables = [] ;
      for (let v of vehiculos){
        
        observables.push(this.afs.collection<Reserva>(this.path + '/' + v.uid + '/reservas', ref => ref.where('uid', '==', uid)).valueChanges());
        
      }
      Observable.combineLatest(observables).subscribe(data =>{
        for(let i=0;i<data.length;i++){
          
          if (data[i].length != 0) {
            
            result.next(vehiculos[i]);
            result.complete();
        }
      }
      });
    });
  });

    


  }

  addReserva(reserva: Reserva, cocheuid: string): string{
    
    this.afs.collection<Reserva>(this.path + '/' + cocheuid + '/reservas').add({
            by: reserva.by,
            motivo: reserva.motivo, solicitud:reserva.solicitud,
             timeStart:reserva.timeStart,timeEnd:reserva.timeEnd,
    }) .then(ref => {
      reserva.uid = ref.id;
      this.updateReserva(reserva, cocheuid);
      });
      return reserva.uid;
    
  }
  updateReserva(reserva: Reserva, cocheuid: string){
    this.afs.doc(this.path + '/' + cocheuid + '/reservas'+'/'+ reserva.uid).update({
                              by: reserva.by,
             motivo: reserva.motivo, solicitud:reserva.solicitud,
             timeStart:reserva.timeStart,timeEnd:reserva.timeEnd,
             uid:reserva.uid
    });
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
        //console.log(this.available);
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
 

}
