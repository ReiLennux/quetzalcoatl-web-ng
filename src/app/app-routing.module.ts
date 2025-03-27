import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './Core/Presentation/Pages/Login/login.view';
import { DashboardViewComponent } from './Core/Presentation/Components/dashboard/dashboard.view';
import { AuthGuard } from './Core/Presentation/Guards/auth.guard';
import { SubsidiariesViewComponent } from './Core/Presentation/Pages/Subsidiaries/subsidiaries.view';
import { SubsidiariesManagerComponent } from './Core/Presentation/Pages/Subsidiaries/subsidiaries.manager';
import { ProvidersViewComponent } from './Core/Presentation/Pages/Providers/providers.view';
import { ProvidersManagerComponent } from './Core/Presentation/Pages/Providers/providers.manager';
import { AssetsViewComponent } from './Core/Presentation/Pages/Assets/assets.view';
import { AssetsManagerComponent } from './Core/Presentation/Pages/Assets/assets.manager';

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