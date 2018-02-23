import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: boolean = true;

  constructor(private authService: AuthenticationService) { }
 changestate(state:boolean) {
   this.isLoggedIn$ = state;
  
  }
  ngOnInit() {
    
  }

}
