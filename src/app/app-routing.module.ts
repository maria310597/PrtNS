import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';
import { LoginComponent } from './ui/login/login.component';
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';
import { CalendarComponent} from './ui/calendar/calendar.component';
import { PruebaComponent } from './ui/prueba/prueba.component';
import { PartesComponent } from './ui/partes/partes.component';
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
        path: 'prueba',
        component: PruebaComponent
      },
      {
        path: 'vehiculo',
        component: PruebaComponent
      },
      {
        path: 'partes',
        component: PartesComponent
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
