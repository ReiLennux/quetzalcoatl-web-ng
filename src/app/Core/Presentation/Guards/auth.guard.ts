import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './../../../Infrastructure/Storage/storage.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  canActivate(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(false);
    }

    return of(this.storageService.isAuthenticated()).pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
