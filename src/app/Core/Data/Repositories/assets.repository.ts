import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { Asset } from "../../Domain/Models/asset.model";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class AssetsRepository  {
    private apiUrl = environment.API_URL;

    constructor(private http: HttpClient) { }

    getAssets() : Observable<Asset[]> {
        return this.http.get<Asset[]>(`${this.apiUrl}/gateway/activofijo`);
    }
    getById(id: number) : Observable<Asset> {
        return this.http.get<Asset>(`${this.apiUrl}/gateway/activofijo/${id}`);
    }
    postData(asset: Asset)  : Observable<Asset> {
        return this.http.post<Asset>(`${this.apiUrl}/gateway/activofijo`, asset);
    }
    putData(asset: Asset)  : Observable<Asset> {
        return this.http.put<Asset>(`${this.apiUrl}/gateway/activofijo/${asset.activoFijoID}`, asset);
    }
    deleteData(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/gateway/activofijo/${id}`);
    }

}