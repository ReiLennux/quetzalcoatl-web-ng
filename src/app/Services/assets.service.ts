import { Injectable } from '@angular/core';
import { Asset } from '../Models/asset.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor() { }

  assets: Asset[] = [
    {
      Id: 1,
      Name: 'Asset 1',
      Description: 'Description 1',
      Serial: 'SN1234567890',
      purchaseDate: new Date('2022-01-01'),
      providerId: 1,
      subsidiaryId: 1,
      start_date: new Date('2022-01-01'),
      end_date: new Date('2022-12-31')
    },
    {
      Id: 2,
      Name: 'Asset 2',
      Description: 'Description 2',
      Serial: 'SN9876543210',
      purchaseDate: new Date('2021-05-01'),
      providerId: 2,
      subsidiaryId: 2,
      start_date: new Date('2021-05-01'),
      end_date: new Date('2021-12-31')
    },
    {
      Id: 3,
      Name: 'Asset 3',
      Description: 'Description 3',
      Serial: 'SN0987654321',
      purchaseDate: new Date('2020-07-01'),
      providerId: 1,
      subsidiaryId: 1,
      start_date: new Date('2020-07-01'),
      end_date: new Date('2020-12-31')
    }
  ]

  getData(): Observable<Asset[]> {
    return of(this.assets);
  }

  getById(id: number): Observable<Asset> {
    const asset = this.assets.find(asset => asset.Id === id);
    if (asset) {
      return of(asset);
    } else {
      throw new Error(`Asset with id ${id} not found`);
    }
  }

  postData(asset: Asset): Observable<Asset> {
    asset.Id = Date.now();
    this.assets.push(asset);
    return of(asset);
  }

  putData(asset: Asset): Observable<Asset> {
    const index = this.assets.findIndex(a => a.Id === asset.Id);
    if (index!== -1) {
      this.assets[index] = asset;
    }
    return of(asset);
  }

  deleteData(id: number): Observable<void> {
    const index = this.assets.findIndex(asset => asset.Id === id);
    if (index!== -1) {
      this.assets.splice(index, 1);
    }
    return of();
  }
}
