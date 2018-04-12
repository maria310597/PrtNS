import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  VehicleService
} from '../../../services/vehicle.service';

import {Vehicle} from '../../../models/vehicle';

@Component({
  selector: 'app-confirm-v',
  styles: ["js/bootstrap.min.js", 
  "js/bootstrap.js"],
  template: `
  <button (click)="open()"  class="btn btn-sm btn-outline-secondary"> <i aria-hidden class="fa fa-trash-o" title="eliminar"></i> <span class="sr-only">eliminar</span></button>

  `
})
export class ConfirmDeleteComponent  {
  
  @Input() vehicle;

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(ConfirmVehiculoComponent, { size : 'lg' });
    modalRef.componentInstance.vehicle = this.vehicle ;
  }
  
}


  
@Component({
        selector: 'app-confirm-vehicle-delete',
        templateUrl: './confirm-d.component.html',
        styleUrls: ['./confirm-d.component.css']
})
 export class ConfirmVehiculoComponent {
      
          constructor(public activeModal: NgbActiveModal,private vehicleService: VehicleService) {}
          @Input() vehicle: Vehicle;


          si(){

           this.vehicleService.deleteTodo(this.vehicle);
            this.activeModal.close('Close click');
           
        }
        no(){
          this.activeModal.close('Close click');
        }
          
 }
