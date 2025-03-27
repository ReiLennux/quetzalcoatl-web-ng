import { Injectable } from "@angular/core";
import { ProvidersRepository } from "../../../Data/Repositories/providers.repository";


@Injectable({
    providedIn: 'root'
})
export class GenerateApiSecretUseCase {
    constructor(private providersRepository: ProvidersRepository) { }
    execute() {
        return this.providersRepository.generateApiSecret();
    }
}