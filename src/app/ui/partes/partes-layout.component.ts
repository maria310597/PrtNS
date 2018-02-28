import { Component } from '@angular/core';

@Component({
  selector: 'app-partes-layout',
  template: `
    <app-navbar></app-navbar>
    <app-notification-message></app-notification-message>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class PartesLayoutComponent {}
