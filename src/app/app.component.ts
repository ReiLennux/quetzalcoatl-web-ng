import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from './Services/Styles/flowbite.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'quetzalcoatl-web-ng';
  
  constructor(private flowbiteService: FlowbiteService) {}
  
  ngOnInit() {
    this.flowbiteService.initFlowbite();
  }

  canActivate(): boolean {
      if (isPlatformBrowser(this.platformId)) {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn ) {
          return true;
        }
      }
      return false;
    }
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }
}
