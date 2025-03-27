import { Injectable } from '@angular/core';
import { Asset } from '../../../Core/Domain/Models/asset.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor() { }

  assets: Asset[] = [
    { ActivoFijoID: 1, Nombre: 'Asset 1', Descripcion: 'Descripción 1', Serial: 'Serial 1', FechaCompra: new Date('2021-01-01'), ProveedorID: 1, SucursalID: 1, FechaAlta: new Date('2021-01-01'), FechaBaja: undefined, Estatus: 'Activo' },
    { ActivoFijoID: 2, Nombre: 'Asset 2', Descripcion: 'Descripción 2', Serial: 'Serial 2', FechaCompra: new Date('2021-02-01'), ProveedorID: 2, SucursalID: 2, FechaAlta: new Date('2021-02-01'), FechaBaja: undefined, Estatus: 'Activo' },
    { ActivoFijoID: 3, Nombre: 'Asset 3', Descripcion: 'Descripción 3', Serial: 'Serial 3', FechaCompra: new Date('2021-03-01'), ProveedorID: 3, SucursalID: 3, FechaAlta: new Date('2021-03-01'), FechaBaja: undefined, Estatus: 'Inactivo' }
    
  ]

  getData(): Observable<Asset[]> {
    return of(this.assets);
  }

  getById(id: number): Observable<Asset> {
    const asset = this.assets.find(asset => asset.ActivoFijoID === id);
    if (asset) {
      return of(asset);
    } else {
      throw new Error(`Asset with id ${id} not found`);
    }
  }

  postData(asset: Asset): Observable<Asset> {
    asset.ActivoFijoID = Date.now();
    this.assets.push(asset);
    return of(asset);
  }

  putData(asset: Asset): Observable<Asset> {
    const index = this.assets.findIndex(a => a.ActivoFijoID === asset.ActivoFijoID);
    if (index!== -1) {
      this.assets[index] = asset;
    }
    return of(asset);
  }

  deleteData(id: number): Observable<void> {
    const index = this.assets.findIndex(asset => asset.ActivoFijoID === id);
    if (index!== -1) {
      this.assets.splice(index, 1);
    }
    return of();
  }
}
