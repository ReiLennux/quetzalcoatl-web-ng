import { Injectable } from '@angular/core';
import { StorageService } from '../../../../Infrastructure/Storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {
  constructor(private storageService: StorageService) {}

  execute(): void {
    this.storageService.clearSession();
    window.location.reload();
  }
}
