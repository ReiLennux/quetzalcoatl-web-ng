import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './Main/app.component';
import { DashboardViewComponent } from './Core/Presentation/Components/dashboard/dashboard.view';
import { LoginViewComponent } from './Core/Presentation/Pages/Login/login.view';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Core/Presentation/Components/navbar/navbar.component';
import { SidebarComponent } from './Core/Presentation/Components/sidebar/sidebar.component';
import { MenuItemItemComponent } from './Core/Presentation/Components/sidebar/menu-item/menu-item.item';
import { ReactiveFormsModule } from '@angular/forms';
import { GTextInput } from './Core/Presentation/Components/inputs/g-text/g-text.input';
import { SubsidiariesViewComponent } from './Core/Presentation/Pages/Subsidiaries/subsidiaries.view';
import { GAddButtonComponent } from './Core/Presentation/Components/buttons/g-add/g-add.button';
import { GPaginatorComponent } from './Core/Presentation/Components/pagination/g-paginator/g-paginator.component';
import { SubsidiariesManagerComponent } from './Core/Presentation/Pages/Subsidiaries/subsidiaries.manager';
import { GEditButtonComponent } from './Core/Presentation/Components/buttons/g-edit/g-edit.button';
import { GSelectInputComponent } from './Core/Presentation/Components/inputs/g-select/g-select.input';
import { GDeleteButtonComponent } from './Core/Presentation/Components/buttons/g-delete/g-delete.button';
import { AuthInterceptor } from './Infrastructure/Interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ProvidersViewComponent } from './Core/Presentation/Pages/Providers/providers.view';
import { ProvidersManagerComponent } from './Core/Presentation/Pages/Providers/providers.manager';
import { GTextAreaInput } from './Core/Presentation/Components/inputs/g-text-area/g-text-area.input';
import { AssetsViewComponent } from './Core/Presentation/Pages/Assets/assets.view';
import { AssetsManagerComponent } from './Core/Presentation/Pages/Assets/assets.manager';
import { GDateInput } from './Core/Presentation/Components/inputs/g-date/g-date.input';

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    LoginViewComponent,
    NavbarComponent,
    SidebarComponent,
    MenuItemItemComponent,
    GTextInput,
    SubsidiariesViewComponent,
    GAddButtonComponent,
    GPaginatorComponent,
    SubsidiariesManagerComponent,
    GEditButtonComponent,
    GSelectInputComponent,
    GDeleteButtonComponent,
    ProvidersViewComponent,
    ProvidersManagerComponent,
    GTextAreaInput,
    AssetsViewComponent,
    AssetsManagerComponent,
    GDateInput
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Permite que puedas agregar múltiples interceptores si es necesario
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
