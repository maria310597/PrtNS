import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';



import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

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
                    <a><img src="{{ company[0].imagen }}" name="aboutcompany" width="140" height="140" border="0" class="rounded-circle"></a>
                    <h3 class="media-heading"> {{myusers[0].name}} <small *ngIf="company[0].igualada" class="badge badge-danger">Igualada</small></h3>
                    <span><strong>Informacion: </strong></span>
               
                    <hr>
                        <p class="text-left"><strong>Resumen estadisticas: </strong><br>Aqui estadisticas</p>
                        <br>
                </div>
            </div>
        </div>
    </div>

    </div>
    <div *ngIf="!loaded"><i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i></div>
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

