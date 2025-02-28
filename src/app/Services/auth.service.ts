import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Auth } from '../Models/auth.model';

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

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  postData(userData: Auth): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap(response => {
        if (response?.token) {
          this.saveUserData(response);
        }
      }),
      catchError(error => {
        console.error('Error en autenticación:', error);
        return throwError(() => error);
      })
    );
  }

  logOut(): void {
    Object.values(this.storageKeys).forEach(key => localStorage.removeItem(key));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKeys.token);
  }

  private saveUserData({ token, rol, nombre, email }: { token: string; rol: string; nombre: string, email: string }): void {
    localStorage.setItem(this.storageKeys.token, token);
    localStorage.setItem(this.storageKeys.role, rol);
    localStorage.setItem(this.storageKeys.name, nombre);
    localStorage.setItem(this.storageKeys.email, email);
  }
}
