
import { Injectable } from "@angular/core";
import { AssetsRepository } from "../../../Data/Repositories/assets.repository";



@Injectable({
    providedIn: 'root'
})
export class DeleteUseCase {
    constructor(private assetsRepository: AssetsRepository) { }

    execute(id: number) {
        return this.assetsRepository.deleteData(id);
    }
}