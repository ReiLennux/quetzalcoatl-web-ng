import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subsidiary } from '../../../Core/Domain/Models/subsidiary.model';

@Injectable({
  providedIn: 'root'
})
export class SubsidiariesService {

  //constructor() {}

  subsidiaries: Subsidiary[] = [
    { SucursalId: 1, Nombre: 'Sucursal 1', Direccion: 'Dirección 1', Ciudad: 'Ciudad 1', Estado: 'Estado 1', Pais: 'País 1', CodigoPostal: '12345', Latitud: 10.0, Longitud: 10.0, FechaAlta: new Date('2021-01-01'), FechaBaja: undefined, Estatus: 'Activo' },
    { SucursalId: 2, Nombre: 'Sucursal 2', Direccion: 'Dirección 2', Ciudad: 'Ciudad 2', Estado: 'Estado 2', Pais: 'País 2', CodigoPostal: '67890', Latitud: 20.0, Longitud: 20.0, FechaAlta: new Date('2021-02-01'), FechaBaja: undefined, Estatus: 'Activo' },
    { SucursalId: 3, Nombre: 'Sucursal 3', Direccion: 'Dirección 3', Ciudad: 'Ciudad 3', Estado: 'Estado 3', Pais: 'País 3', CodigoPostal: '13579', Latitud: 30.0, Longitud: 30.0, FechaAlta: new Date('2021-03-01'), FechaBaja: undefined, Estatus: 'Activo' }
  ]
  getData(): Observable<Subsidiary[]> {
      return of(this.subsidiaries);
    }

  postData(subsidiary: Subsidiary): Observable<object> {
    subsidiary.SucursalId = Date.now();
    this.subsidiaries.push(subsidiary);
    return of(subsidiary);
  }

  getById(id: number): Observable<Subsidiary> {
    const res = (this.subsidiaries.find(subsidiary => subsidiary.SucursalId === id));
    if (!res) {
      throw new Error('No se encontró la sucursal');
    }
    return of(res);
  }

  putData(subsidiary: Subsidiary): Observable<object> {
    const index = this.subsidiaries.findIndex(subsidiary => subsidiary.SucursalId === subsidiary.SucursalId);
    if (index === -1) {
      throw new Error('No se encontró la sucursal');
    }
    this.subsidiaries[index] = subsidiary;
    return of(subsidiary);
  }

  deleteData(id: number): Observable<object> {
    const index = this.subsidiaries.findIndex(subsidiary => subsidiary.SucursalId === id);
    if (index === -1) {
      throw new Error('No se encontró la sucursal');
    }
    this.subsidiaries.splice(index, 1);
    return of(this.subsidiaries);
  }
  

}
