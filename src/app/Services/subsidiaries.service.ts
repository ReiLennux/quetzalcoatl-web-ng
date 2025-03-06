import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subsidiary } from '../Models/subsidiary.model';

@Injectable({
  providedIn: 'root'
})
export class SubsidiariesService {

  //constructor() {}

  subsidiaries: Subsidiary[] = [
    {
      id: 1,
      key: 'key',
      address: 'address',
      manager: 'manager',
      phone: 'phone',
      status: 'status',
      email: 'email',
      type: 'type'
    },
    {
      id: 2,
      key: 'key',
      address: 'address',
      manager: 'manager',
      phone: 'phone',
      status: 'status',
      email: 'email',
      type: 'type'
    },
    {
      id: 3,
      key: 'key',
      address: 'address',
      manager: 'manager',
      phone: 'phone',
      status: 'status',
      email: 'email',
      type: 'type'
    },

  ]

  getData(): Observable<Subsidiary[]> {
      return of(this.subsidiaries);
    }

  postData(subsidiary: Subsidiary): Observable<object> {
    subsidiary.id = Date.now();
    subsidiary.key = 'key';
    this.subsidiaries.push(subsidiary);
    return of(subsidiary);
  }

  getById(id: number): Observable<Subsidiary> {
    const res = (this.subsidiaries.find(subsidiary => subsidiary.id === id));
    if (!res) {
      throw new Error('No se encontró la sucursal');
    }
    return of(res);
  }

  putData(subsidiary: Subsidiary): Observable<object> {
    const index = this.subsidiaries.findIndex(subsidiary => subsidiary.id === subsidiary.id);
    if (index === -1) {
      throw new Error('No se encontró la sucursal');
    }
    this.subsidiaries[index] = subsidiary;
    return of(subsidiary);
  }

  deleteData(id: number): Observable<object> {
    const index = this.subsidiaries.findIndex(subsidiary => subsidiary.id === id);
    if (index === -1) {
      throw new Error('No se encontró la sucursal');
    }
    this.subsidiaries.splice(index, 1);
    return of(this.subsidiaries);
  }
  

}
