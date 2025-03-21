
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Auth } from '../Models/auth.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://api-gateway-production-9080.up.railway.app"; // Usa environment para manejar la URL

  private storageKeys = {
    token: 'token',
    role: 'role',
    name: 'name',
    email: 'email'
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  postData(userData: Auth): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap(response => {
        if (response?.token) {
          this.createCookie('authToken', response.token);
        }
      }),
      catchError(error => {
        console.error('Error en autenticación:', error);
        return throwError(() => error);
      })
    );
  }


  getToken(): boolean {
    if (this.cookieService.get('authToken')) return true ; else return false;
  }

  createCookie(name: string, value: string, days = 1): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    this.cookieService.set(name, value, expirationDate, '/', '', false, 'Lax');  // Cambia Secure y SameSite
  }
  
  logout(): void {
    this.cookieService.delete('authToken', '/');
    window.location.reload();
  }
  

  isAuthenticated(): boolean {
    return this.cookieService.check('authToken');
  }

  private saveUserData({ token, rol, nombre, email }: { token: string; rol: string; nombre: string, email: string }): void {
    localStorage.setItem(this.storageKeys.role, rol);
    localStorage.setItem(this.storageKeys.name, nombre);
    localStorage.setItem(this.storageKeys.email, email);
  }
}
