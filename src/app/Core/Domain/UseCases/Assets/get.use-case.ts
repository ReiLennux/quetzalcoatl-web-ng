import { Injectable } from "@angular/core";
import { AssetsRepository } from "../../../Data/Repositories/assets.repository";
import { Asset } from "../../Models/asset.model";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class GetUseCase {
    constructor(private assetsRepository: AssetsRepository) { }

    execute() :  Observable<Asset[]> {
        return this.assetsRepository.getAssets();
    }
}