import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    const test = new User('Pepe', 'pepejm', 'test@gmail.com', '6345435', '1234');
    this.authenticationService.login(test);

}

  login() {


  }
}
