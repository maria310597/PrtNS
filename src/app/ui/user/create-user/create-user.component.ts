import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { NotifyService } from '../../../core/notify.service';

import { User } from '../../../models/user';
import { Upload } from '../../../uploads/shared/upload';
import { UploadService } from '../../../uploads/shared/upload.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-user-form',
  styleUrls: ['./create-user-form.css'],
  templateUrl: './create-user-form.html'
})


export class CreateUserForm implements OnInit {
  @Input() user;

  currentUpload: Upload;
  selectedFiles: FileList | null ;
  uid: string;
  modelo;
  modify:boolean;
  enviado = false;
  error: boolean = false;
  
  msg:string;

  constructor(private auth: AuthenticationService,public userService:UserService,private notify: NotifyService, public activeModal: NgbActiveModal, private upSvc: UploadService) {}
  onSubmit() {
    if ( !this.modify){
      var er = this.auth.emailSignUp(this.modelo.email, this.modelo.password, this.modelo);
     
      if( er != undefined) {
       this.msg =  this.auth.handleError(er);
        this.error = true;
      }
      
      //this.notify.update('Usuario modificado correctamente', 'success');
    }
    else{
      this.userService.updateTodo(this.modelo);
      this.activeModal.close('Close click')
      this.notify.update('Usuario modificado correctamente', 'success');
    }
    this.enviado = true;
    this.activeModal.dismiss();
  }
  resetpassword(){
    this.auth.resetPassword(this.modelo.email);
  }
  updateUrl() {
    this.modelo.imagen = this.currentUpload.url;
    console.log(this.modelo.imagen);
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
}

uploadSingle() {
  const file = this.selectedFiles;
  if (file && file.length === 1) {
    this.currentUpload = new Upload(file.item(0));
    this.upSvc.pushUpload(this.currentUpload);
  } else {
    console.error('No file found!');
  }
}

  ngOnInit() {

    if (this.user == undefined){
     this.modelo = new User('Nombre real', 'Nickname', 'Email', 'Telefono', 'Imagen', false, 'Clave');
    this.modify = false;
    }else{
      this.modelo = new User(this.user.realname,this.user.nickname,this.user.email,this.user.phone,this.user.imagen,this.user.admin,this.user.password,this.user.uid);
      this.modify = true;
    }
  }
}



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  constructor(private modalService: NgbModal) {}
  @Input() user: User;
  open() {
    const modalRef = this.modalService.open(CreateUserForm, { size : 'lg' });
    modalRef.componentInstance.uid = this.user;
  }

}
@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent {

    constructor(private modalService: NgbModal) {}
    @Input() user: User;
    open2() {
      const modalRef = this.modalService.open(CreateUserForm, { size : 'lg' });
      modalRef.componentInstance.user = this.user;
      

      
    }
  }
