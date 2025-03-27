import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Auth, AuthResponse } from '../../../Domain/Models/auth.model';
import { AuthRepository } from '../../../Data/Repositories/auth.repository';
import { StorageService } from '../../../../Infrastructure/Storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(
    private authRepository: AuthRepository,
    private storageService: StorageService
  ) {}

  execute(userData: Auth): Observable<AuthResponse> {
    return this.authRepository.login(userData).pipe(
      tap(response => {
        this.storageService.setToken(response.token);
        this.storageService.saveUserData(response.rol, response.nombre, userData.correo);
      })
    );
  }
}
