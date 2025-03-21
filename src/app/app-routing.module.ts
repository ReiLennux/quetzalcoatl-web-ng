import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './Views/Login/login.view';
import { DashboardViewComponent } from './Views/dashboard/dashboard.view';
import { AuthGuard } from './auth.guard';
import { SubsidiariesViewComponent } from './Views/subsidiaries/subsidiaries.view';
import { SubsidiariesManagerComponent } from './Views/subsidiaries/subsidiaries.manager';
import { ProvidersViewComponent } from './Views/providers/providers.view';
import { ProvidersManagerComponent } from './Views/providers/providers.manager';
import { AssetsViewComponent } from './Views/assets/assets.view';
import { AssetsManagerComponent } from './Views/assets/assets.manager';

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
    path:'providers',
    component: ProvidersViewComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'providers/manager',
    component: ProvidersManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'providers/manager/:id',
    component: ProvidersManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'assets',
    component: AssetsViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'assets/manager',
    component: AssetsManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'assets/manager/:id',
    component: AssetsManagerComponent,
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