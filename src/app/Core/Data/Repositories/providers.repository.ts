import { Provider } from './../../Domain/Models/provider.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProvidersRepository {
    private readonly apiUrl = environment.API_URL;

    constructor(private readonly http: HttpClient) {}

    getProviders(): Observable<Provider[]> {
        return this.http.get<Provider[]>(`${this.apiUrl}/gateway/proveedores`);
    }

    getbyId(id: number): Observable<Provider> {
        return this.http.get<Provider>(`${this.apiUrl}/gateway/proveedores/${id}`);
    }

    generateApiSecret(): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/generar_token`, {});
    }

    createProvider(provider: Provider): Observable<Provider> {
        return this.http.post<Provider>(`${this.apiUrl}/gateway/proveedores`, provider);
    }

    updateProvider(provider: Provider): Observable<Provider> {
        return this.http.put<Provider>(`${this.apiUrl}/gateway/proveedores/${provider.proveedorId}`, provider);
    }

    deleteProvider(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/gateway/proveedores/${id}`);
    }
}