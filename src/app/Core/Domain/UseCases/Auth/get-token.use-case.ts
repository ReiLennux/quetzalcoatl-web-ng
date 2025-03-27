import { Injectable } from '@angular/core';
import { StorageService } from '../../../../Infrastructure/Storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetTokenUseCase {
  constructor(private storageService: StorageService) {}

  execute(): string {
    return this.storageService.getToken();
  }
}
