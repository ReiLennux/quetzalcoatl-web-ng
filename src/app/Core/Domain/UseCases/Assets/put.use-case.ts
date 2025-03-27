import { Injectable } from "@angular/core";
import { AssetsRepository } from "../../../Data/Repositories/assets.repository";
import { Asset } from "../../Models/asset.model";



@Injectable({
    providedIn: 'root'
})
export class PutUseCase {
    constructor(private assetsRepository: AssetsRepository) { }

    execute(asset: Asset) {
        return this.assetsRepository.putData(asset);
    }
}