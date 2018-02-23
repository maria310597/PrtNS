import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';
import { LoginComponent } from './ui/login/login.component';
import { LoginLayoutComponent } from './ui/login/login-layout.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { DashboardLayoutComponent} from './ui/dashboard/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
    {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
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
