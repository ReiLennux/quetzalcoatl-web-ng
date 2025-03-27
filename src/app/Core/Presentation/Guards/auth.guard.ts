import { StorageService } from './../../../Infrastructure/Storage/storage.service';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = this.storageService.isAuthenticated()
      if (isLoggedIn ) {
        return true;
      }
    }
    this.router.navigate(['/login']); 
    return false;
  }
}

