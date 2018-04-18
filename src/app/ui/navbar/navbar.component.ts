import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import {} from '../ui/notifications/notification-message.component';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TimeCustom } from "../../models/Time";
import { Status } from "../../models/status";
import { NotifyService } from '../../core/notify.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  myuser: Observable<User>;
  constructor(private authService: AuthenticationService,private taskService: TaskService, private notifyService: NotifyService) { }

  task = new Task('',null,null,null,'');

  logout() {
    this.authService.signOut();
  }

  ngOnInit() {
    this.myuser = this.authService.user;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

  onSubmit(){
    const fechaActual = new Date();
    let time:TimeCustom = {
      hour:fechaActual.getHours(),
      minute:fechaActual.getMinutes(),
      second:fechaActual.getSeconds()
    }
    let date:NgbDateStruct={
      day:fechaActual.getDay(),
      month:fechaActual.getMonth(),
      year:fechaActual.getFullYear()
    }
    this.myuser.subscribe(user =>{
      this.task.date = date;
      this.task.time = time;
      this.task.status = Status.Pendiente;
      this.task.createdby = user.uid;
      console.log(this.task.description);
      this.taskService.addPendiente(Object.assign({}, this.task)); // Clone para evitar cambios inesperados por ser async
      this.notifyService.update("Recordatorio añadido","success");
      this.task.description="";
    });
  }
}
