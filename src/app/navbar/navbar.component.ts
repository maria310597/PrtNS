import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import {} from '../ui/notifications/notification-message.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

}
