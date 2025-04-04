import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Auth, AuthResponse } from '../../../Core/Domain/Models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) {}

  login(userData: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData);
  }


}
