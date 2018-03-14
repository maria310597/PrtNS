import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import {PartesService} from '../../services/partes.service';
import { Report } from '../../models/report';
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
    <label for="name"> ¿Quieres borrarlo? </label>
    <br>
    <button type="button" class="btn btn-success" (click)="si()" > Si </button>

    <button type="button" class="btn btn-danger" (click)="no()" > No </button>
    </form>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() company;
  @Input() report;
  constructor(private companyService: CompanyService, public activeModal: NgbActiveModal
  ,private reportService: PartesService) { }

  ngOnInit() {
   
  }
  si(){
    if ( this.company != undefined){
       this.companyService.deleteTodo(this.company);
      this.activeModal.close('Close click');
    }
     else {
      this.reportService.deleteTodo(this.report);
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

