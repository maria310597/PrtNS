import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Routing
import { RouterModule, Routes } from '@angular/router';


// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import{CalendarComponent} from './calendar/calendar.component';

// Servicios
import {AuthenticationService} from './services/authentication.service';
import { PruebaComponent } from './prueba.component';

const appRoutes: Routes = [

  
  {
    path: 'main',
    component: PruebaComponent,
   // data: { title: 'Heroes List' }
  },
  { path: 'main/vehiculo',
  component: CalendarComponent,
   
  }, 
  //Es importante que esta sea la última
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PruebaComponent,
    LoginComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }


