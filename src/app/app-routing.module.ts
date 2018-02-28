import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';
import { LoginComponent } from './ui/login/login.component';
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';
import { CalendarComponent} from './ui/calendar/calendar.component';
import { PartesComponent } from './ui/partes/partes.component';
import { CompanyComponent } from './ui/company/company.component';
const routes: Routes = [

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard],
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'partes',
        component: PartesComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
