import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const csrfToken = this.getCsrfToken();
    
    if (csrfToken) {
      const cloned = req.clone({
        setHeaders: {
          'X-CSRF-TOKEN': csrfToken
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }

  // Obtener el token CSRF de la cookie o de un meta tag
  private getCsrfToken(): string | null {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? null;
  }
}
