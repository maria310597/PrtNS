import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle';
import { NotifyService } from '../../../core/notify.service';

@Component({
  selector: 'app-f-vehiculo',
  templateUrl: './c-vehiculoform.component.html',
  styleUrls: []
})
export class FVehiculoComponent  implements OnInit{

  model: Vehicle;

  constructor(public activeModal: NgbActiveModal, public vehicleService: VehicleService,public  notifyService: NotifyService) { }

  ngOnInit() {

    this.model = new Vehicle("","");
  }

  campos: number[]=[0,0]; //0 nocheck, 1 checkok, 2checkbad
guardar(){
  
  if (this.model.Marca != "" && this.model.nombre != ""){
    this.campos[0] = 1;
    this.campos[1] = 1;

    this.vehicleService.addVehiculo(this.model);
    this.activeModal.close('Close click')
    this.notifyService.update('Vehiculo registrado correctamente', 'success');
  }else if (this.model.Marca === "") {
    this.campos[0] = 2;
  }else {
    this.campos[1] = 2;
  }
  
}
  

}
@Component({
  selector: 'app-c-vehiculo',
  templateUrl: './c-vehiculo.component.html',
  styleUrls: ['./c-vehiculo.component.css']
})
export class CVehiculoComponent {

  constructor(private modalService: NgbModal) { }

  
  
  open() {
    const modalRef = this.modalService.open(FVehiculoComponent, { size : 'lg' });
  
   //modalRef.componentInstance.company = this.company ;
  }

}