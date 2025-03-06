import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardViewComponent } from './Views/dashboard/dashboard.view';
import { LoginViewComponent } from './Views/Login/login.view';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Views/Generic/navbar/navbar.component';
import { SidebarComponent } from './Views/Generic/sidebar/sidebar.component';
import { MenuItemItem } from './Views/Generic/sidebar/menu-item/menu-item.item';
import { ReactiveFormsModule } from '@angular/forms';
import { GTextInput } from './Views/Generic/inputs/g-text/g-text.input';
import { SubsidiariesViewComponent } from './Views/subsidiaries/subsidiaries.view';
import { GAddButtonComponent } from './Views/Generic/buttons/g-add/g-add.button';
import { GPaginatorComponent } from './Views/Generic/pagination/g-paginator/g-paginator.component';
import { SubsidiariesManagerComponent } from './Views/subsidiaries/subsidiaries.manager';
import { GEditButtonComponent } from './Views/Generic/buttons/g-edit/g-edit.button';
import { GSelectInputComponent } from './Views/Generic/inputs/g-select/g-select.input';

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    LoginViewComponent,
    NavbarComponent,
    SidebarComponent,
    MenuItemItem,
    GTextInput,
    SubsidiariesViewComponent,
    GAddButtonComponent,
    GPaginatorComponent,
    SubsidiariesManagerComponent,
    GEditButtonComponent,
    GSelectInputComponent
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
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
