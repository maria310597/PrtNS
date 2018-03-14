import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import {} from '../ui/notifications/notification-message.component';
import { User } from '../../models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  myuser: Observable<User>;
  constructor(private authService: AuthenticationService) { }

  logout() {
    this.authService.signOut();
  }

  ngOnInit() {
    this.myuser = this.authService.user;
  }
}
