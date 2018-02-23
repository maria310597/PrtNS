import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <app-notification-message></app-notification-message>
  <div class="container">
      <router-outlet></router-outlet>
  </div>
`
})
export class AppComponent {
  title = 'app';
}
