import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Subsidiary } from "../../Domain/Models/subsidiary.model";

@Injectable({
  providedIn: 'root',
})
export class SubsidiariesRepository {
    private readonly apiUrl = environment.API_URL;

    constructor(private readonly http: HttpClient) {}

    getSubsidiaries() {
        return this.http.get(`${this.apiUrl}/gateway/sucursales`);
    }

    getbyId(id: number) {
        return this.http.get(`${this.apiUrl}/gateway/sucursales/${id}`);
    }

    createSubsidiary(subsidiary: Subsidiary) {
        return this.http.post(`${this.apiUrl}/gateway/sucursales`, subsidiary);
    }

    updateSubsidiary(subsidiary: Subsidiary) {
        return this.http.put(`${this.apiUrl}/gateway/sucursales/${subsidiary.sucursalId}`, subsidiary);
    }

    deleteSubsidiary(id: number) {
        return this.http.delete(`${this.apiUrl}/gateway/sucursales/${id}`);
    }
}