import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './../Storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`,
      });

      const authRequest = request.clone({ headers });

      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
