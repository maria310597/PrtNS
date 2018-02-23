import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav>
    <a routerLink="/main" routerLinkActive="active">Prueba</a>
  </nav>
  <app-notification-message></app-notification-message>
  <app-navbar></app-navbar>
  <div class="container">
      <router-outlet></router-outlet>
  </div>
`
})
export class AppComponent {
  title = 'app';
}
