import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Provider } from '../Models/provider.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private API_URL = 'api-gateway-production-9080.up.railway.app/api/generar_token';
  constructor(private httpClient: HttpClient) { }

  providers: Provider[] = [
    {
      id: 1,
      rfc: 'ABC123',
      razon_social: 'Provider 1',
      address: '123 Main St',
      phone: '123-456-7890',
      type: 'Type 1',
      email: 'provider1@example.com',
      status: 'Active',
      max_capacity: 1000,
      conditions: 'Conditions 1'
    },
    {
      id: 2,
      rfc: 'DEF456',
      razon_social: 'Provider 2',
      address: '456 Elm St',
      phone: '987-654-3210',
      type: 'Type 2',
      email: 'provider2@example.com',
      status: 'Inactive',
      max_capacity: 500,
      conditions: 'Conditions 2'
    },
    {
      id: 3,
      rfc: 'GHI789',
      razon_social: 'Provider 3',
      address: '789 Oak St',
      phone: '321-098-7654',
      type: 'Type 3',
      email: 'provider3@example.com',
      status: 'Active',
      max_capacity: 2000,
      conditions: 'Conditions 3'
    }
  ]

  getData() {
    return of(this.providers);
  }

  getProvider(id: number) {
    return of(this.providers.find(provider => provider.id === id));
  }

  putData(provider: Provider) {
    const index = this.providers.findIndex(p => p.id === provider.id);
    if (index!== -1) {
      this.providers[index] = provider;
    }
  }
  postData(provider: Provider) {
    this.providers.push(provider);
  }

  deleteData(id: number) {
    const index = this.providers.findIndex(provider => provider.id === id);
    if (index!== -1) {
      this.providers.splice(index, 1);
    }
  }

  generateApiSecret(providerId: number): Observable<any> {
    return this.httpClient.post(this.API_URL, {});
  }
}
