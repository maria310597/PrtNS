import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService} from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { User } from '../models/user';
import { isAdmin } from '@firebase/util';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        const expectedRole = next.data.expectedRole;
        this.auth.user.subscribe((data: User) => {
          let token;
          if(data != null){
            token = data.admin;
          }
          if (!loggedIn) {
            this.router.navigate(['/login']);
          } else if (token !== undefined && token != null && expectedRole !== undefined &&  token !== expectedRole) {
            this.router.navigate(['/dashboard']);
          }
        });
    });
}
}
