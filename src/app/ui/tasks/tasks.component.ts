import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { AuthenticationGuard } from '../../services/authentication.guard';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  mytasks: Observable<Task[]>;
  user: User;
  constructor(private authService: AuthenticationService,private taskService: TaskService) { }

  ngOnInit() {
    this.authService.user.subscribe(user=>{
      this.user = user;
      this.mytasks = this.taskService.getPendientesFrom$(this.user.uid);
    })
  }

  deleteTask(uid: string){
    //console.log("Se va ha borrar"+ uid);
    this.taskService.deletePendiente(uid);
  }

}
