import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subsidiary } from '../Models/subsidiary.model';

@Injectable({
  providedIn: 'root'
})
export class SubsidiariesService {

  constructor() { }

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
}
