import { DeleteUseCase } from './../../../Domain/UseCases/Assets/delete.use-case';
import { GetUseCase } from './../../../Domain/UseCases/Assets/get.use-case';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../../../Domain/Models/asset.model';
import { AssetsColumns } from '../../../Data/dto/assets.dto';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.view.html',
})
export class AssetsViewComponent implements OnInit {
[x: string]: any;
    columnsName = AssetsColumns;
    assets: Asset[] = [];

    constructor( 
        private getUseCase: GetUseCase,
        private deleteUseCase: DeleteUseCase
    ){}

  ngOnInit() {
    this.getUseCase.execute().subscribe((assets: Asset[]) => {
        this.assets = assets;
    });
  }

  deleteAsset(id: number) {
        this.deleteUseCase.execute(id).subscribe(() => {
            this.assets = this.assets.filter(asset => asset.ActivoFijoID !== id);
        });
    }

  
}
