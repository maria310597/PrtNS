import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'angular-calendar';
import { VehicleModule } from './ui/vehicles/vehicle.module';
import { ChartsModule } from 'ng2-charts';

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
import { InfoUserComponent, UserInfoContent} from './ui/info-user/info-user.component';
import { InfoCompanyComponent, CompanyInfoContent } from './ui/info-company/info-company.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { PartesComponent, ParteInfoContent } from './ui/partes/partes.component';
import { CompanyComponent } from './ui/company/company.component';
import {CreateCompanyComponent,CompanyForm, ModifyCompanyComponent} from './ui/create-company/create-company.component';
import {ConfirmDeleteComponent, CreateConfirmComponent, CreateConfirmParteComponent} from './ui/confirm-delete/confirm-delete.component';
// Layouts
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';

// Servicios
import {AuthenticationService} from './services/authentication.service';
import { PartesService } from './services/partes.service';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';
import { CreateParteComponent, CreateParteForm, ModifyParteComponent  } from './ui/create-parte/create-parte.component';
import { UsersComponent } from './ui/users/users.component';
import { CreateUserComponent, CreateUserForm, ModifyUserComponent } from './ui/create-user/create-user.component';
import { UploadService } from './uploads/shared/upload.service';
import { VehiclesComponent } from './ui/vehicles/vehicles.component';
import { VehicleService } from './services/vehicle.service';
import { StatisticsService } from './services/statistics.service';
import { UserStatisticsComponent } from './ui/user-statistics/user-statistics.component';
import { DashboardStatisticsComponent } from './ui/dashboard-statistics/dashboard-statistics.component';
import { DashboardMiniWidgetsComponent } from './ui/dashboard-mini-widgets/dashboard-mini-widgets.component';
import { TaskService } from './services/task.service';
import { TasksComponent } from './ui/tasks/tasks.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './ui/admin/admin.component';
import {ExportService} from './services/export.service';
import { FacturacionComponent, FacturacionFormComponent, FacturacionFormNo } from './ui/facturacion/facturacion.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginLayoutComponent,
    NotificationMessageComponent,
    DashboardComponent,
    DashboardLayoutComponent,
    PartesComponent,
    ParteInfoContent,
    InfoUserComponent,
    UserInfoContent,
    InfoCompanyComponent,
    CompanyInfoContent,
    CompanyComponent,
    CompanyComponent,
    CreateCompanyComponent,
    CompanyInfoContent,
    CompanyForm,
    CreateParteComponent,
    UsersComponent,
    CreateUserComponent,
    CreateUserForm,
    ConfirmDeleteComponent,
    UserStatisticsComponent,
    DashboardStatisticsComponent,
    CreateParteComponent,
    CompanyForm,
    CreateParteForm,
    ConfirmDeleteComponent,
    CreateConfirmComponent,
    ModifyCompanyComponent,
    CreateConfirmParteComponent,
    ModifyParteComponent,
    ModifyUserComponent,
    DashboardMiniWidgetsComponent,
    TasksComponent,
    FacturacionComponent,
    FacturacionFormComponent,
    FacturacionFormNo,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    VehicleModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    NgbModalModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DataTablesModule,
    ChartsModule
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    PartesService,
    UserService,
    CompanyService,
    UploadService,
    VehicleService,
    StatisticsService,
    TaskService,
    ExportService,
    HttpClient
  ],
  bootstrap: [AppComponent],
  exports: [
    NotificationMessageComponent,

  ],
  entryComponents: [
    UserInfoContent,
    ParteInfoContent,
    CompanyInfoContent,
    CompanyForm,
    CreateUserForm,
    CreateParteForm,
    ConfirmDeleteComponent,
    CreateConfirmComponent,
    ModifyCompanyComponent,
    ModifyParteComponent,
    CreateConfirmParteComponent,
    FacturacionFormComponent,
    ModifyUserComponent,
    FacturacionFormNo
  ]
})
export class AppModule { }


