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

  getData(): Observable<object> {
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
  

}
