import { Provider } from './../../Models/provider.model';
import { Injectable } from "@angular/core";
import { ProvidersRepository } from "../../../Data/Repositories/providers.repository";


@Injectable({
    providedIn: 'root'
})
export class PutUseCase {
    constructor(private providersRepository: ProvidersRepository) { }
    execute(provider: Provider) {
        return this.providersRepository.updateProvider(provider);
    }
}