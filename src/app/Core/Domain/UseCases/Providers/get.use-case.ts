import { ProvidersRepository } from '../../../Data/Repositories/providers.repository';
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class GetUseCase {
    constructor(
        private providersRepository: ProvidersRepository
    ) { }

    execute() {
        return this.providersRepository.getProviders();
    }
}