import { Provider } from '../../Models/provider.model';
import { ProvidersRepository } from './../../../Data/Repositories/providers.repository';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class PostUseCase {
    constructor(private providersRepository: ProvidersRepository) { }
    execute(provider: Provider) {
        return this.providersRepository.createProvider(provider);
    }
}