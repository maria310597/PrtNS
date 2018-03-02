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
import { InfoUserComponent, UserInfoContent } from './ui/info-user/info-user.component';
import { InfoCompanyComponent, CompanyInfoContent } from './ui/info-company/info-company.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { PartesComponent, ParteInfoContent } from './ui/partes/partes.component';
import { CalendarComponent } from './ui/calendar/calendar.component';
import { CompanyComponent } from './ui/company/company.component';
<<<<<<< HEAD
=======
import { CreateCompanyComponent } from './ui/create-company/create-company.component';
>>>>>>> 88e8534a65e2f796f41bcb36c4cbc4709c99f3df

// Layouts
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';

// Servicios
import {AuthenticationService} from './services/authentication.service';
import { PartesService } from './services/partes.service';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';
import { CreateParteComponent } from './create-parte/create-parte.component';



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
    ParteInfoContent,
    InfoUserComponent,
    UserInfoContent,
    InfoCompanyComponent,
<<<<<<< HEAD

    CompanyInfoContent,
    CompanyComponent,

   
=======
    CompanyInfoContent,
    CompanyComponent,
<<<<<<< HEAD
    CreateCompanyComponent
=======
=======
    CompanyComponent,
>>>>>>> 88e8534a65e2f796f41bcb36c4cbc4709c99f3df
    CreateCompanyComponent,

    CreateParteComponent
<<<<<<< HEAD

=======
=======
    CompanyInfoContent
>>>>>>> ea0243160bb624c994f6bb5ab6e276ceca14e46b
>>>>>>> 043f2836fe22c6f089f7b2c20d1d1573779094ed
>>>>>>> 130097eda9c4389d0f5dfb6fa248f30823e88d3d
>>>>>>> 88e8534a65e2f796f41bcb36c4cbc4709c99f3df

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
  providers: [AuthenticationService, AuthenticationGuard, PartesService, UserService, CompanyService],
  bootstrap: [AppComponent],
  exports: [
    NotificationMessageComponent,

  ],
  entryComponents: [
    UserInfoContent,
    ParteInfoContent,
    CompanyInfoContent
  ]
})
export class AppModule { }


