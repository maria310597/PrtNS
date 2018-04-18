import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <simple-notifications></simple-notifications>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class DashboardLayoutComponent {}
