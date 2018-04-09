import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';



import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { UserStatisticsComponent } from '../user-statistics/user-statistics.component';

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
                    <a><img src="{{ myusers[0].imagen }}" name="aboutme" width="140" height="140" border="0" class="rounded-circle"></a>
                    <h3 class="media-heading">{{myusers[0].realname}}  <small class="badge badge-danger">Técnico</small></h3>
                    <span><strong>Informacion: </strong></span>
                    <br>
                    <span><strong>Correo: </strong></span>
                    <span class="badge badge-warning">{{myusers[0].email}}</span>
                    <br>
                    <span><strong>Nickname: </strong></span>
                    <span class="badge badge-info">{{myusers[0].nickname}}</span>
                    <br>
                    <span><strong>Telefono: </strong></span>
                    <span class="badge badge-success">{{myusers[0].phone}}</span>
                    <hr>
                        <p class="text-left"><strong>Resumen estadisticas: </strong></p>
                        <app-user-statistics [uidUser]="this.uid" [name]="myusers[0].realname"></app-user-statistics>
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
export class UserInfoContent implements OnInit {
  @Input() uid;

  myusers: User[];
  loaded = false;
  constructor(public activeModal: NgbActiveModal, private ref: ChangeDetectorRef, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser$(this.uid).subscribe((myusers: User[]) => {
        this.myusers = myusers;
        this.loaded = true;
    });
  }

}

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html'
})
export class InfoUserComponent  {
  constructor(private modalService: NgbModal) {}
  @Input() uid: string;
  open() {
    const modalRef = this.modalService.open(UserInfoContent, { size : 'lg' });
    modalRef.componentInstance.uid = this.uid ;
  }
}

