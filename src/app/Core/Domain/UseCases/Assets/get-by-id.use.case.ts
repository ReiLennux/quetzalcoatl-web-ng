import { Injectable } from "@angular/core";
import { AssetsRepository } from "../../../Data/Repositories/assets.repository";



@Injectable({
    providedIn: 'root'
})
export class GetByIdUseCase {
    constructor(private assetsRepository: AssetsRepository) { }

    execute(id: number) {
        return this.assetsRepository.getById(id);
    }
}