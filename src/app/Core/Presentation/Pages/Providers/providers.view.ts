import { GenerateApiSecretUseCase } from './../../../Domain/UseCases/Providers/generate-api-secret.use-case';
import { getbyId } from './../../../Domain/UseCases/Providers/get-by-id.use-case';
import { Component, OnInit } from '@angular/core';
import { ProvidersColumn } from '../../../Data/dto/providers.dto';
import Swal from 'sweetalert2';
import { GetUseCase } from '../../../Domain/UseCases/Providers/get.use-case';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.view.html',
})
export class ProvidersViewComponent implements OnInit {
  columnsName = ProvidersColumn;
  providers: any[] | undefined;
  confirmationStatus: { [key: number]: boolean } = {};

  constructor(
    private getUseCase: GetUseCase,
    private getbyIdUseCase: getbyId,
    private generateApiSecretUseCase: GenerateApiSecretUseCase
  ) {}

  ngOnInit() {
    this.getUseCase.execute().subscribe((providers: any) => {
      this.providers = providers;
    });
  }

  deleteProvider(provider: any) {
    this.providers = this.providers?.filter(p => p.id !== provider.id);
    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true
    });
  }

  confirmGeneration(event: any, providerId: number) {
    const inputValue = event.target.value;
    this.confirmationStatus[providerId] = inputValue === "CONFIRMAR";
  }

  generateApiSecrets(providerId: number) {
    this.getbyIdUseCase.execute(providerId).subscribe(provider => {
      if (!provider) {
        return;
      }
  
      this.generateApiSecretUseCase.execute().subscribe(response => {
        if (!response || !response.token) {
          Swal.fire({
            title: "Error",
            text: "No se pudo generar el API Secret.",
            icon: "error"
          });
          return;
        }
  
        // Crear el objeto JSON con el token
        const apiSecrets = {
          providerId: provider.ProveedorID,
          name: provider.Nombre,
          Token: response.token,
          base_url: "https://quetzalcoatl.com/api/v1/prov",
          createdAt: new Date().toISOString()
        };
  
        // Convertir a JSON y descargar
        const blob = new Blob([JSON.stringify(apiSecrets, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `api_secrets_${provider.ProveedorID}.json`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
  
        Swal.fire({
          title: "API SECRETs generados",
          text: "Los API SECRETs han sido generados con éxito y se ha iniciado la descarga.",
          icon: "success"
        });
  
        // Restablecer estado de confirmación
        this.confirmationStatus[providerId] = false;
      });
    });
  }
  
  
}
