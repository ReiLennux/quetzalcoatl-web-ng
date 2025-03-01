import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardView } from './Views/dashboard/dashboard.view';
import { LoginView } from './Views/Login/login.view';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Views/Generic/navbar/navbar.component';
import { SidebarComponent } from './Views/Generic/sidebar/sidebar.component';
import { MenuItemItem } from './Views/Generic/sidebar/menu-item/menu-item.item';
import { ReactiveFormsModule } from '@angular/forms';
import { GTextInput } from './Views/Generic/inputs/g-text/g-text.input';
import { SubsidiariesView } from './Views/subsidiaries/subsidiaries.view';

@NgModule({
  declarations: [
    AppComponent,
    DashboardView,
    LoginView,
    NavbarComponent,
    SidebarComponent,
    MenuItemItem,
    GTextInput,
    SubsidiariesView
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
