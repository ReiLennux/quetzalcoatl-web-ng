import { Injectable } from "@angular/core";
import { ProvidersRepository } from "../../../Data/Repositories/providers.repository";



@Injectable({
    providedIn: 'root'
})
export class DeleteUseCase {
    constructor(private providersRepository: ProvidersRepository) { }

    execute(id: number) {
        return this.providersRepository.deleteProvider(id);
    }
}