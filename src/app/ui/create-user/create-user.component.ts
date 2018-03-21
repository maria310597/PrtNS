import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';


import { User } from '../../models/user';
import { Upload } from '../../uploads/shared/upload';
import { UploadService } from '../../uploads/shared/upload.service';

@Component({
  selector: 'app-company-info-content',
  styleUrls: ['./create-user-form.css'],
  templateUrl: './create-user-form.html'
})


export class CreateUserForm implements OnInit {

  currentUpload: Upload;
  selectedFiles: FileList | null ;
  uid: string;
  modelo = new User('Nombre real', 'Nickname', 'Email', 'Telefono', 'Imagen', false, 'Clave');
  enviado = false;


  constructor(private auth: AuthenticationService, public activeModal: NgbActiveModal, private upSvc: UploadService) {}
  onSubmit() {
    this.auth.emailSignUp(this.modelo.email, this.modelo.password, this.modelo);
    this.enviado = true;
    this.activeModal.dismiss();
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

  }
}



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CreateUserForm, { size : 'lg' });
    modalRef.componentInstance.uid = '';
  }

}
