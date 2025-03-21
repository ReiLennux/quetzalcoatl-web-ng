import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = this.authService.getToken()
      if (isLoggedIn ) {
        return true;
      }
    }

    this.router.navigate(['/login']); 
    return false;
  }
}