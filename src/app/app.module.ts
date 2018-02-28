import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
// Routing
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


// PDF
// import { PdfmakeModule } from 'ng-pdf-make';

// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AuthenticationGuard } from './services/authentication.guard';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import {LoginComponent} from './ui/login/login.component';
import {CalendarComponent} from './ui/calendar/calendar.component';
import { NotificationMessageComponent } from './ui/notifications/notification-message.component';
import { PartesComponent } from './ui/partes/partes.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';

// Layouts
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';
import { PartesLayoutComponent } from './ui/partes/partes-layout.component';

// Servicios
import {AuthenticationService} from './services/authentication.service';
import { PartesService } from './services/partes.service';
import { PruebaComponent } from './ui/prueba/prueba.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PruebaComponent,
    LoginComponent,
    LoginLayoutComponent,
    CalendarComponent,
    NotificationMessageComponent,
    PruebaComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    PartesComponent,
    PartesLayoutComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTablesModule,
    // PdfmakeModule
  ],
  providers: [AuthenticationService, AuthenticationGuard, PartesService],
  bootstrap: [AppComponent],
  exports: [
    NotificationMessageComponent,
  ]
})
export class AppModule { }


