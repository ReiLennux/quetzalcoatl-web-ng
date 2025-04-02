
import { Injectable } from "@angular/core";
import { SubsidiariesRepository } from "../../../Data/Repositories/subsidiaries.repository";



@Injectable({
    providedIn: 'root'
})
export class GetByIdUseCase {
    constructor(
        private subsidiariesRepository: SubsidiariesRepository
    ) { }

    execute(id: number) {
        return this.subsidiariesRepository.getbyId(id);
    }
}