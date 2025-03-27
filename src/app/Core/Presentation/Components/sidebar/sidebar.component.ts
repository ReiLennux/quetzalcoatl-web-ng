import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  modules: { name: string; url: string; icon: string; }[] = [
    {
      name: 'Sucursales',
      url: '/subsidiaries',
      icon: 'fa-solid fa-shop',
    },
    {
      name: 'Proveedores',
      url: '/providers',
      icon: 'fa-solid fa-truck',
    },
    {
      name: 'Activos',
      url: '/assets',
      icon: 'fa-solid fa-database',
    }
  ];
}
