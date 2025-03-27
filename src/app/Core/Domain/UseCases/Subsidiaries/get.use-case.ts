import { Injectable } from "@angular/core";
import { SubsidiariesRepository } from "../../../Data/Repositories/subsidiaries.repository";



@Injectable({
    providedIn: 'root'
})
export class GetUseCase {
    constructor(
        private ProvidersRepository: SubsidiariesRepository
    ) { }

    execute() {
        return this.ProvidersRepository.getSubsidiaries();
    }
}