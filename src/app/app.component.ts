import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  
  <nav>
    <a routerLink="/main" routerLinkActive="active">Prueba</a>
   
  </nav>
  <router-outlet></router-outlet>
`
})
export class AppComponent {
  title = 'app';
}
