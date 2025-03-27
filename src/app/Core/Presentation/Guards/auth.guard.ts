import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './../../../Infrastructure/Storage/storage.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private router = inject(Router);
  private storageService = inject(StorageService);

  canActivate(): Observable<boolean> {
    // Verificamos si estamos en el navegador (sólo hacer la validación en el navegador)
    if (!isPlatformBrowser) {
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
