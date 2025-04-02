import { Injectable } from "@angular/core";
import { Subsidiary } from "../../Models/subsidiary.model";
import { SubsidiariesRepository } from "../../../Data/Repositories/subsidiaries.repository";



@Injectable({
    providedIn: 'root'
})
export class PostUseCase {
    constructor(
        private subsidiariesRepository: SubsidiariesRepository
    ) { }

    execute(subsidiary: Subsidiary) {
        return this.subsidiariesRepository.createSubsidiary(subsidiary);
    }
}