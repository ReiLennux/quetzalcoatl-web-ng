import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginView } from './Views/Login/login.view';
import { DashboardView } from './Views/dashboard/dashboard.view';
import { AuthGuard } from './auth.guard';
import { SubsidiariesView } from './Views/subsidiaries/subsidiaries.view';

const routes: Routes = [
  {
    path: 'login',
    component: LoginView
  },
  {
    path:'dashboard',
    component: DashboardView,
    canActivate: [AuthGuard]
  },
  {
    path: 'subsidiaries',
    component: SubsidiariesView,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }