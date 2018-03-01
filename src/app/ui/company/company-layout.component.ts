import { Component } from '@angular/core';

@Component({
  selector: 'app-company-layout',
  template: `
    <app-navbar></app-navbar>
    <app-notification-message></app-notification-message>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class ComapnyLayoutComponent {}