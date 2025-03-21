import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardViewComponent } from './Views/dashboard/dashboard.view';
import { LoginViewComponent } from './Views/Login/login.view';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Views/Generic/navbar/navbar.component';
import { SidebarComponent } from './Views/Generic/sidebar/sidebar.component';
import { MenuItemItemComponent } from './Views/Generic/sidebar/menu-item/menu-item.item';
import { ReactiveFormsModule } from '@angular/forms';
import { GTextInput } from './Views/Generic/inputs/g-text/g-text.input';
import { SubsidiariesViewComponent } from './Views/subsidiaries/subsidiaries.view';
import { GAddButtonComponent } from './Views/Generic/buttons/g-add/g-add.button';
import { GPaginatorComponent } from './Views/Generic/pagination/g-paginator/g-paginator.component';
import { SubsidiariesManagerComponent } from './Views/subsidiaries/subsidiaries.manager';
import { GEditButtonComponent } from './Views/Generic/buttons/g-edit/g-edit.button';
import { GSelectInputComponent } from './Views/Generic/inputs/g-select/g-select.input';
import { SanitizeHtmlDirective } from './sanitize-html.directive';
import { GDeleteButtonComponent } from './Views/Generic/buttons/g-delete/g-delete.button';
import { SafePipe } from './safe.pipe';
import { AuthInterceptor } from './auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ProvidersViewComponent } from './Views/providers/providers.view';
import { ProvidersManagerComponent } from './Views/providers/providers.manager';
import { GTextAreaInput } from './Views/Generic/inputs/g-text-area/g-text-area.input';
import { AssetsViewComponent } from './Views/assets/assets.view';
import { AssetsManagerComponent } from './Views/assets/assets.manager';
import { GDateInput } from './Views/Generic/inputs/g-date/g-date.input';

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
    SanitizeHtmlDirective,
    GDeleteButtonComponent,
    SafePipe,
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
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
