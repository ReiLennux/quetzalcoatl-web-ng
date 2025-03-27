import { ProvidersRepository } from '../../../Data/Repositories/providers.repository';
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class GetByIdUseCase {
    constructor(
        private providersRepository: ProvidersRepository
    ) { }

    execute(id: number) {
        return this.providersRepository.getbyId(id);
    }
}