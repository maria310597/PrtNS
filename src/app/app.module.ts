import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

// Routing
import { RouterModule, Routes } from '@angular/router';


// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AuthenticationGuard } from './services/authentication.guard';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {CalendarComponent} from './ui/calendar/calendar.component';
import { NotificationMessageComponent } from './ui/notifications/notification-message.component';

// Servicios
import {AuthenticationService} from './services/authentication.service';
import { PruebaComponent } from './prueba.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';

const appRoutes: Routes = [


  {
    path: 'main',
    component: PruebaComponent,

  },
  { path: 'main/vehiculo',
  component: CalendarComponent,

  },
  // Es importante que esta sea la última

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: NavbarComponent
      },


    ]

  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PruebaComponent,
    LoginComponent,
    CalendarComponent,
    NotificationMessageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AuthenticationService, AuthenticationGuard],
  bootstrap: [AppComponent],
  exports: [
    NotificationMessageComponent,
  ]
})
export class AppModule { }


