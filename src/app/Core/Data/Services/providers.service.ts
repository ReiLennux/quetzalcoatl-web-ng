import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Provider } from '../../../Core/Domain/Models/provider.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private API_URL = environment.API_TOKEN_URL;
  constructor(private httpClient: HttpClient) { }

  providers: Provider[] = [
    { ProveedorID: 1, Nombre: 'Provider 1', Tipo: 'Jurídico', Direccion: 'Dirección 1', Telefono: '1234567890', Email: 'provider1@example.com', Fechalta: new Date('2021-01-01'), FechaBaja: undefined, Estatus: 'Activo' },
    { ProveedorID: 2, Nombre: 'Provider 2', Tipo: 'Natural', Direccion: 'Dirección 2', Telefono: '9876543210', Email: 'provider2@example.com', Fechalta: new Date('2021-02-01'), FechaBaja: undefined, Estatus: 'Activo' },
    { ProveedorID: 3, Nombre: 'Provider 3', Tipo: 'Jurídico', Direccion: 'Dirección 3', Telefono: '0987654321', Email: 'provider3@example.com', Fechalta: new Date('2021-03-01'), FechaBaja: undefined, Estatus: 'Inactivo' },
    { ProveedorID: 4, Nombre: 'Provider 4', Tipo: 'Natural', Direccion: 'Dirección 4', Telefono: '1234567890', Email: 'provider4@example.com', Fechalta: new Date('2021-04-01'), FechaBaja: new Date('2021-06-30'), Estatus: 'Suspendido'}
  ]

  getData() {
    return of(this.providers);
  }

  getProvider(id: number) {
    return of(this.providers.find(provider => provider.ProveedorID === id));
  }

  putData(provider: Provider) {
    const index = this.providers.findIndex(p => p.ProveedorID === provider.ProveedorID);
    if (index!== -1) {
      this.providers[index] = provider;
    }
  }
  postData(provider: Provider) {
    this.providers.push(provider);
  }

  deleteData(id: number) {
    const index = this.providers.findIndex(provider => provider.ProveedorID === id);
    if (index!== -1) {
      this.providers.splice(index, 1);
    }
  }

  generateApiSecret(providerId: number): Observable<any> {
    let response = this.httpClient.post<any>(`${this.API_URL}`, {});
    return response;
  }
}
