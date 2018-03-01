import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { DataTablesModule } from 'angular-datatables';

// Routing
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


// Firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AuthenticationGuard } from './services/authentication.guard';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './ui/login/login.component';
import { NotificationMessageComponent } from './ui/notifications/notification-message.component';
<<<<<<< HEAD
import { InfoUserComponent, UserInfoContent } from './ui/info-user/info-user.component';
import { InfoCompanyComponent } from './ui/info-company/info-company.component';
=======
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { PartesComponent } from './ui/partes/partes.component';
>>>>>>> eeb7b9fbb615feac14c6aeacae58efabcc6feaf0
import { CalendarComponent } from './ui/calendar/calendar.component';
import { CompanyComponent } from './ui/company/company.component';

// Layouts
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';

// Servicios
import {AuthenticationService} from './services/authentication.service';
import { PartesService } from './services/partes.service';
<<<<<<< HEAD
import { UserService } from './services/user.service';



=======
import { CompanyService } from './services/company.service';
>>>>>>> eeb7b9fbb615feac14c6aeacae58efabcc6feaf0




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginLayoutComponent,
    NotificationMessageComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    CalendarComponent,
    PartesComponent,
<<<<<<< HEAD
    InfoUserComponent,
    UserInfoContent,
    InfoCompanyComponent
=======
    CompanyComponent
>>>>>>> eeb7b9fbb615feac14c6aeacae58efabcc6feaf0

  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTablesModule

  ],
<<<<<<< HEAD
  providers: [AuthenticationService, AuthenticationGuard, PartesService, UserService],
=======
  providers: [AuthenticationService, AuthenticationGuard, PartesService, CompanyService],
>>>>>>> eeb7b9fbb615feac14c6aeacae58efabcc6feaf0
  bootstrap: [AppComponent],
  exports: [
    NotificationMessageComponent,

  ],
  entryComponents: [
    UserInfoContent,
  ]
})
export class AppModule { }


