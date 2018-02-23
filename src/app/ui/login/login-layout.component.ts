import { Component } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
  <app-notification-message></app-notification-message>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class LoginLayoutComponent {}
