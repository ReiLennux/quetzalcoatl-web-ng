import { Injectable } from "@angular/core";
import { SubsidiariesRepository } from "../../../Data/Repositories/subsidiaries.repository";
import { Subsidiary } from "../../Models/subsidiary.model";



@Injectable({
    providedIn: 'root'
})
export class PutUseCase {
    constructor(
        private subsidiariesRepository: SubsidiariesRepository
    ) { }

    execute(subsidiary: Subsidiary) {
        return this.subsidiariesRepository.updateSubsidiary(subsidiary);
    }
}