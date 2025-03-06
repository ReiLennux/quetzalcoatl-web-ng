import { Component } from '@angular/core';
import { MenuItemItem } from './menu-item/menu-item.item';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  modules: { name: string; url: string; icon: string; }[] = [{
      name: 'Sucursales',
      url: '/subsidiaries',
      icon: 'fa-solid fa-shop',
    }
  ];
}
