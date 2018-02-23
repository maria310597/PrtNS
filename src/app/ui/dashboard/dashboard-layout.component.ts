import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class DashboardLayoutComponent {}
