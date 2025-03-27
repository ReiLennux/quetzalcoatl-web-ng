import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.item.html'
})
export class MenuItemItemComponent {
  @Input() module: {name: string, url: string, icon: string, notifications?: number} | null = null;
}
