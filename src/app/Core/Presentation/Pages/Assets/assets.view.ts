import { Component, OnInit } from '@angular/core';
import { Asset } from '../../../Domain/Models/asset.model';
import { AssetsService } from '../../../Data/Services/assets.service';
import { AssetsColumns } from '../../../Data/dto/assets.dto';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.view.html',
})
export class AssetsViewComponent implements OnInit {
[x: string]: any;
    columnsName = AssetsColumns;
    assets: Asset[] = [];

    constructor( private assetService: AssetsService){}

  ngOnInit() {
        this.assetService.getData().subscribe((data: Asset[]) => {
            this.assets = data;

        });
  }

  deleteAsset(id: number) {
        this.assetService.deleteData(id).subscribe(() => {
            this.assets = this.assets.filter(asset => asset.ActivoFijoID !== id);
        });
    }

  
}
