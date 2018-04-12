import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import {PartesService} from '../../services/partes.service';
import {
  VehicleService
} from '../../services/vehicle.service';
import { Report } from '../../models/report';
import {Vehicle} from '../../models/vehicle';

@Component({
  selector: 'app-confirm',
  styles: ["js/bootstrap.min.js", 
  "js/bootstrap.js"],
  template: `
  <div class="modal-header">
      <h4 class="modal-title">¿Seguro que quieres borrar?</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
    <label for="name"> Los cambios serán irreversibles </label>
    <br>
    <button type="button" class="btn btn-success" (click)="si()" > Si </button>

    <button type="button" class="btn btn-danger" (click)="no()" > No </button>
    </form>
    </div>
  `
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() company;
  @Input() report;
  @Input() vehicle;

  constructor(private companyService: CompanyService, public activeModal: NgbActiveModal
  ,private reportService: PartesService, private vehicleService: VehicleService) { }

  ngOnInit() {
   
  }
  si(){
    if ( this.company != undefined){
       this.companyService.deleteTodo(this.company);
      this.activeModal.close('Close click');
    }
     else if (this.report != undefined) {
      this.reportService.deleteTodo(this.report);
      this.activeModal.close('Close click');
     }else {
      this.vehicleService.deleteTodo(this.vehicle);
      this.activeModal.close('Close click');
     }
  }
  no(){
    this.activeModal.close('Close click');
  }
}

  @Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.css']
  })
  export class CreateConfirmComponent {
  
      constructor(private modalService: NgbModal,) {}
      @Input() company: Company;
      open() {
        const modalRef = this.modalService.open(ConfirmDeleteComponent, { size : 'lg' });
        modalRef.componentInstance.company = this.company ;
      }
    }
    @Component({
      selector: 'app-confirm-parte-delete',
      templateUrl: './confirm-delete.component.html',
      styleUrls: ['./confirm-delete.component.css']
    })
    export class CreateConfirmParteComponent {
    
        constructor(private modalService: NgbModal,) {}
        @Input() parte: Report;
        open() {
          const modalRef = this.modalService.open(ConfirmDeleteComponent, { size : 'lg' });
          modalRef.componentInstance.report = this.parte ;
        }
      }
      @Component({
        selector: 'app-vehicle-delete',
        templateUrl: './confirm-delete.component.html',
        styleUrls: ['./confirm-delete.component.css']
      })
      export class CreateConfirmVehiculoComponent {
      
          constructor(private modalService: NgbModal,) {}
          @Input() vehiculo: Vehicle;
          open() {
            const modalRef = this.modalService.open(ConfirmDeleteComponent, { size : 'lg' });
            modalRef.componentInstance.vehicle = this.vehiculo ;
          }
        }
