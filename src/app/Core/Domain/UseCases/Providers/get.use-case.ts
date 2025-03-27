import { ProvidersRepository } from '../../../Data/Repositories/providers.repository';
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class GetUseCase {
    constructor(
        private ProvidersRepository: ProvidersRepository
    ) { }

    execute() {
        return this.ProvidersRepository.getProviders();
    }
}