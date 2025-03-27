import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../Core/Data/Services/Styles/flowbite.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'quetzalcoatl-web-ng';
  showLayout = true;

  constructor(private flowbiteService: FlowbiteService, private router: Router) {
    this.router.events.subscribe(() => {
      this.showLayout = this.router.url !== '/login';
    });
  }
  
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
