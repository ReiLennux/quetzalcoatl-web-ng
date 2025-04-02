import { SubsidiariesRepository } from './../../../Data/Repositories/subsidiaries.repository';
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class GetUseCase {
    constructor(
        private subsidiariesRepository: SubsidiariesRepository
    ) { }

    execute() {
        return this.subsidiariesRepository.getSubsidiaries();
    }
}