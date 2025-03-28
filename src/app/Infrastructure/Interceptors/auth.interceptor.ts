import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './../Storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getToken();
    console.log('Token obtenido:', token);

    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`,
      });

      const authRequest = request.clone({ headers, withCredentials: true });

      console.log('Petición modificada:', authRequest);
      console.log('Cabecera Authorization:', authRequest.headers.get('Authorization')); // Asegurar que se adjunta

      return next.handle(authRequest);
    }

    console.log('Petición sin token:', request);
    return next.handle(request);
  }
}
