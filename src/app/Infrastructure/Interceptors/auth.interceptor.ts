import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from './../Storage/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getToken();

    let authRequest = request;

    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`,
      });

      authRequest = request.clone({ headers });
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('Token expirado, redirigiendo al login...');

          // Elimina el token del almacenamiento
          this.storageService.clearSession();

          // Muestra alerta de token expirado
          Swal.fire({
            title: 'Token expirado',
            text: 'Debe volver a iniciar sesión.',
            icon: 'warning',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }

        return throwError(() => error);
      })
    );
  }
}
