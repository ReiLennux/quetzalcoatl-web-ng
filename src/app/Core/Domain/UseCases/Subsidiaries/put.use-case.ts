import { Injectable } from "@angular/core";
import { ProvidersRepository } from "../../../Data/Repositories/providers.repository";
import { Provider } from "../../Models/provider.model";



@Injectable({
    providedIn: 'root'
})
export class PutUseCase {
    constructor(
        private providersRepository: ProvidersRepository
    ) { }

    execute(provider: Provider) {
        return this.providersRepository.updateProvider(provider);
    }
}