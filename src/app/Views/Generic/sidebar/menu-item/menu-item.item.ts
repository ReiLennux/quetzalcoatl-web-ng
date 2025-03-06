import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.item.html',
  styleUrl: './menu-item.item.css'
})
export class MenuItemItem {
  @Input() module: {name: string, url: string, icon: string} | null = null;
}
