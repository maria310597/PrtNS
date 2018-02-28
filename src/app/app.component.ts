import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-notification-message></app-notification-message>
    <router-outlet></router-outlet>

`
})
export class AppComponent {
  title = 'app';
}
