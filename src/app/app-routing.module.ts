import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './Views/Login/login.view';
import { DashboardViewComponent } from './Views/dashboard/dashboard.view';
import { AuthGuard } from './auth.guard';
import { SubsidiariesViewComponent } from './Views/subsidiaries/subsidiaries.view';
import { SubsidiariesManagerComponent } from './Views/subsidiaries/subsidiaries.manager';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path:'dashboard',
    component: DashboardViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subsidiaries',
    component: SubsidiariesViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'subsidiaries/manager',
    component: SubsidiariesManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'subsidiaries/manager/:id',
    component: SubsidiariesManagerComponent,
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