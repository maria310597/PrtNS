import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle';
import { NotifyService } from '../../../core/notify.service';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module";

@Component({
  selector: 'app-fdelete-vehiculo',
  templateUrl: './deleteForm-vehicle.component.html',
  styleUrls: ['./delete-vehiculo.component.css']
})
export class FDeleteVehiculoComponent  implements OnInit{

  
  selectedVehicle: string = "Vehículos";
  vehicles : Vehicle[] = [];
 
  constructor(public activeModal: NgbActiveModal, public vehicleService: VehicleService,public  notifyService: NotifyService) { }

  ngOnInit() {
   
    this.vehicleService.getAllVehicles().subscribe(v =>{
      console.log(v)
      this.vehicles = v;
    });
  }


  ChangeSortOrder(newSortOrder: string) { 
    this.selectedVehicle = newSortOrder;
    
  }

 






  campos: number[]=[0,0]; //0 nocheck, 1 checkok, 2checkbad
guardar(){
  
 /* if (this.model.Marca != "" && this.model.nombre != ""){
    this.campos[0] = 1;
    this.campos[1] = 1;

    this.vehicleService.addVehiculo(this.model);
    this.activeModal.close('Close click')
    this.notifyService.update('Vehiculo registrado correctamente', 'success');
  }else if (this.model.Marca === "") {
    this.campos[0] = 2;
  }else {
    this.campos[1] = 2;
  }*/
  
}
  

}

@Component({
  selector: 'app-delete-vehiculo',
  templateUrl: './delete-vehiculo.component.html',
  styleUrls: ['./delete-vehiculo.component.css']
})
export class DeleteVehiculoComponent  {
  myvehicles: Observable<Vehicle[]>;

 
  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(FDeleteVehiculoComponent, { size : 'lg' });
  }


 
}
