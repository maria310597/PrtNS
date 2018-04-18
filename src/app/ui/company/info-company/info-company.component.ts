import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company';

@Component({
  selector: 'app-user-info-content',
  styles: [`
  .btn{
    border-radius: 0;
    }
    .btn-md {
    border-width: 0;
    outline: none;
    border-radius: 0;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .6);
    cursor: pointer;
    }
    `
],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Información detallada</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div *ngIf="loaded">
    <div style="text-align:center" class="row-fluid">
        <div class="span10 offset1">
        <div id="modalTab">
            <div class="tab-content">
                <div class="tab-pane active" id="about">
                    <h3 class="media-heading">
                    {{company[0].name}} <small *ngIf="company[0].igualada" class="badge badge-danger">Igualada</small>
                    </h3>
                    <span><strong>Informacion: </strong></span>
                    <br>
                    <span><strong>Email: </strong></span>
                    <span class="badge badge-warning">{{company[0].email}}</span>
                    <br>
                    <span><strong>Email factura: </strong></span>
                    <span class="badge badge-warning">{{company[0].billMail}}</span>
                    <br>
                    <span><strong>Fax: </strong></span>
                    <span class="badge badge-info">{{company[0].faxNumber}}</span>
                    <br>
                    <span><strong>Telefono: </strong></span>
                    <span class="badge badge-success">{{company[0].tlf}}</span>
                    <br>
                    <span><strong>Direccion: </strong></span>
                    <span class="badge badge-success">{{company[0].address}}</span>
                    <br>
                    <span><strong>NIF: </strong></span>
                    <span class="badge badge-success">{{company[0].nif}}</span>
                    <br>
                    <span><strong>Último movimiento: </strong></span>
                    <span class="badge badge-success">{{company[0].lastmovement.day}}/{{company[0].lastmovement.month}}/{{company[0].lastmovement.year}} </span>
                    <hr>
                </div>
            </div>
        </div>
    </div>

    </div>
    <div *ngIf="!loaded"><i aria-hidden class="fa fa-circle-o-notch fa-spin" style="font-size:24px" title="descargando"></i> <span class="sr-only">descargando</span></div>
    </div>
  `
})
// tslint:disable-next-line:component-class-suffix
export class CompanyInfoContent implements OnInit {
  @Input() name;

  company: Company[];
  loaded = false;
  constructor(public activeModal: NgbActiveModal, private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompany$(this.name).subscribe((company: Company[]) => {
        this.company = company;
        this.loaded = true;
    });
  }

}

@Component({
  selector: 'app-info-company',
  templateUrl: './info-company.component.html'
})
export class InfoCompanyComponent  {
  constructor(private modalService: NgbModal) {}
  @Input() name: string;
  open() {
    const modalRef = this.modalService.open(CompanyInfoContent, { size : 'lg' });
    modalRef.componentInstance.name = this.name;
  }
}

