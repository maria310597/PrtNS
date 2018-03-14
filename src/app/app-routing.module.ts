import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';
import { LoginComponent } from './ui/login/login.component';
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';
import { PartesComponent } from './ui/partes/partes.component';
import { CompanyComponent } from './ui/company/company.component';
import { UsersComponent } from './ui/users/users.component';
import { VehiclesComponent } from './ui/vehicles/vehicles.component';
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
  // Only admin
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthenticationGuard],
    data: {
      expectedRole: true
    },
    children: [
      {
        path: 'users',
        component: UsersComponent,
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
        path: 'vehicles',
        component: VehiclesComponent
      },
      {
        path: 'partes',
        component: PartesComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      },
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
