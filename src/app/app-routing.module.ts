import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';
import { LoginComponent } from './ui/login/login.component';
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardComponent } from './ui/dashboard/dashboard/dashboard.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard/dashboard-layout.component';
import { PartesComponent } from './ui/partes/partes/partes.component';
import { CompanyComponent } from './ui/company/company/company.component';
import { UsersComponent } from './ui/user/users/users.component';
import { VehiclesComponent } from './ui/vehicles/vehicles.component';
import { AdminComponent } from './ui/admin/admin.component';
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
        data: { title: 'Neosistec - Usuarios' }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { title: 'Neosistec - Administración' }
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
        component: DashboardComponent,
        data: { title: 'Neosistec - Inicio' }
      },
      {
        path: 'vehicles',
        component: VehiclesComponent,
        data: { title: 'Neosistec - Vehículos' }
      },
      {
        path: 'partes',
        component: PartesComponent,
        data: { title: 'Neosistec - Partes' }
      },
      {
        path: 'company',
        component: CompanyComponent,
        data: { title: 'Neosistec - Empresas' }
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
