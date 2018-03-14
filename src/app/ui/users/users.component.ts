import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User []>;
  constructor(private userService: UserService) { }

  deleteUser(uid: string) {
    this.userService.deleteUser(uid);
  }

  ngOnInit() {
    this.users = this.userService.getAllUsers$();
  }

}
