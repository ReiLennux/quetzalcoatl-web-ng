import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardViewComponent } from './Views/dashboard/dashboard.view';
import { LoginView } from './Views/Login/login.view';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Views/Generic/navbar/navbar.component';
import { SidebarComponent } from './Views/Generic/sidebar/sidebar.component';
import { MenuItemItem } from './Views/Generic/sidebar/menu-item/menu-item.item';
import { ReactiveFormsModule } from '@angular/forms';
import { GTextInput } from './Views/Generic/inputs/g-text/g-text.input';
import { SubsidiariesView } from './Views/subsidiaries/subsidiaries.view';
import { GAddButton } from './Views/Generic/buttons/g-add/g-add.button';
import { GPaginatorComponent } from './Views/Generic/pagination/g-paginator/g-paginator.component';
import { SubsidiariesManagerComponent } from './Views/subsidiaries/subsidiaries.manager';

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    LoginView,
    NavbarComponent,
    SidebarComponent,
    MenuItemItem,
    GTextInput,
    SubsidiariesView,
    GAddButton,
    GPaginatorComponent,
    SubsidiariesManagerComponent
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
