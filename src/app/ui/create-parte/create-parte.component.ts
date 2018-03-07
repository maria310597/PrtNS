import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PartesService } from '../../services/partes.service';
import {CompanyService} from '../../services/company.service'
import { Report } from '../../models/report';
import { Company } from '../../models/company';

  

@Component({
  selector: 'app-create-parte-form',
  styles: ["js/bootstrap.min.js", 
  "js/bootstrap.js"
],
  template: `
  
  <div class="modal-header">
      <h4 class="modal-title">Nuevo Parte</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
    
  
       <div class="row">
       <div class="col">
       <div ngbDropdown class="d-inline-block">
        <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>Operador</button>
        <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Another Action</button>
          <button class="dropdown-item">Something else is here</button>
        </div>
      </div>
      </div>
      </div>
      
    <br />
    <label for="name"> Fecha </label>

    <div class="form-group">
      <div class="input-group">
        <input class="form-control" placeholder="yyyy-mm-dd"
              name="date" [(ngModel)]="model.date" ngbDatepicker #d="ngbDatepicker">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
          <i class="fa fa-calendar"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
       <div class="col">
       <div ngbDropdown class="d-inline-block">
        <button class="btn btn-outline-primary" id="dropdownBasic1" ngbDropdownToggle>Empresa</button>
        <div ngbDropdownMenu aria-labelledby="dropdownBasic1" >
        <li *ngFor="let comp of mycompanies">
          <button class="dropdown-item">{{ comp.name }}</button>
        </li>
        </div>
      </div>
      </div>
      </div>

    <br />

   
    <div class="form-inline">
      <a> Hora de Inicio  &nbsp;</a>
      <ngb-timepicker size="small" name="dBegining" [(ngModel)]="model.dBegining" [ngModelOptions]="{standalone: true}"></ngb-timepicker>
    
      <a>&nbsp; Hora de Fin &nbsp;</a>
      <ngb-timepicker  size="small" name="dEnd" [(ngModel)]="model.dEnd" [ngModelOptions]="{standalone: true}"></ngb-timepicker>
    </div>

    <div class="form-inline">
      <label for="km"class="form-inline"> Km recorridos &nbsp;</label>
      <input type="number" size=10 class="form-control-inline"  required [(ngModel)]="model.km"  name="km">

    </div>
<br> 

<div class="form-inline">
<label for="Park"class="form-inline"> Parking &nbsp;</label>
<input type="number" size=10 class="form-control-inline"  required [(ngModel)]="model.parking"  name="park">

</div>
<br> 
<label for="displacements"> Desplazamiento </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.displacements" name="dis" id="disSi"  [value]="true" checked>
      <label class="form-check-label" for="dis"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.displacements" name="dis" id="disNo"  [value]="false">
      <label class="form-check-label" for="dis"> No </label>
    </div>
    
    <br>

    <label for="gratuito"> Gratuito </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.free" name="grati" id="gratiSi"  [value]="true" checked>
      <label class="form-check-label" for="grati"> Si </label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.free" name="grati" id="gratiNo"  [value]="false">
      <label class="form-check-label" for="grati"> No </label>
    </div>
    <br>
    
    <label for="intern"> Interno </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="intern" [(ngModel)]="model.intern" id="internSi"  [value]="true" checked>
      <label class="form-check-label" for="intern"> Si </label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.intern" name="intern" id="internNo"  [value]="false">
      <label class="form-check-label" for="intern"> No </label>
    </div>
    <br>

    <label for="telemantenimiento"> Telemantenimiento </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.telemantenimiento" name="tele" id="teleSi"  [value]="true" checked>
      <label class="form-check-label" for="tele"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.telemantenimiento" name="tele" id="teleNo"  [value]="false">
      <label class="form-check-label" for="tele"> No </label>
    </div>
    <br>


    <label for="cocheP"> Coche Particular </label>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.cocheParticular" name="coche" id="cocheSi"  [value]="true" checked>
      <label class="form-check-label" for="coche"> Si </label>
    </div>
    <div class="form-check-inline">
      <input class="form-check-input" type="radio" [(ngModel)]="model.cocheParticular" name="coche" id="cocheNo"  [value]="false">
      <label class="form-check-label" for="coche"> No </label>
    </div>
    <br>
  
    
    <label for="comment">Notas:</label>
    <textarea class="form-control" rows="2" id="comment"></textarea>
   

    <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i class="fa fa-plus"></i></button>
    <br>
    <div *ngIf="comments>0">
      <label for="comment" >Notas:</label>
      <textarea class="form-control" rows="2" id="comment"></textarea>
        <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i class="fa fa-plus"></i></button>
        <br>
        <div *ngIf="comments>1">
          <label for="comment" >Notas:</label>
          <textarea class="form-control" rows="2" id="comment"></textarea>
        

        <button (click)="newComment()" class="btn btn-outline-success btn-sm"><i class="fa fa-plus"></i></button>
        <br>
        <div *ngIf="comments>2">
          <label for="comment" >Notas:</label>
          <textarea class="form-control" rows="2" id="comment"></textarea>
        </div>
    </div>
    </div>
    
    
    <button
    type="submit"

    (click)="guardarMovimiento()" > Guardar
  </button>

    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class CreateParteForm implements OnInit {
  @Input() uid;

  time = {hour: 13, minute: 30};

  model = new Report("",null,"",null,null,null,0,false,0,false,false,false,false,"");
  //submitted = false;
  partes$: Observable<Report[]>;
  myparte: Report[];

  company$: Observable<Company[]>;
  mycompanies: Company[];
  dtTriggerC: Subject<any> = new Subject();

  

  dtTriggerP: Subject<any> = new Subject();
  comments:number=0;
  
  constructor(public activeModal: NgbActiveModal, private ref: ChangeDetectorRef, private partesService: PartesService, private companyService: CompanyService) {
    
  }
 
    newComment(){
     this.comments++;
     
    }
   
  
    guardarMovimiento() {
      this.partesService.add(this.model);
     }

  ngOnInit() {

    this.partesService.getCollection$().subscribe((myparte: Report[]) => {
      this.myparte = myparte;
      this.dtTriggerP.next();
    });

    this.companyService.getCollection$().subscribe((myc: Company[]) => {
      this.mycompanies = myc;
      this.dtTriggerC.next();
    });
  }

}
@Component({
  selector: 'app-create-parte',
  templateUrl: './create-parte.component.html',
  styleUrls: ['./create-parte.component.css']
})
export class CreateParteComponent {

    constructor(private modalService: NgbModal) {}
    @Input() uid: string;
    open() {
      const modalRef = this.modalService.open(CreateParteForm, { size : 'lg' });
      modalRef.componentInstance.uid = this.uid ;
    }
  }


 



  