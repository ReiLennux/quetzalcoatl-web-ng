import { Component, OnInit } from '@angular/core';
import { ProvidersColumn } from '../../../Data/dto/providers.dto';
import { ProvidersService } from '../../../Data/Services/providers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.view.html',
})
export class ProvidersViewComponent implements OnInit {
  columnsName = ProvidersColumn;
  providers: any[] | undefined;
  confirmationStatus: { [key: number]: boolean } = {}; // Estado de confirmación por proveedor

  constructor(private providerServices: ProvidersService) {}

  ngOnInit() {
    this.providerServices.getData().subscribe((data: any[]) => {
      this.providers = data;
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
    this.providerServices.getProvider(providerId).subscribe(provider => {
      if (!provider) {
        return;
      }
  
      this.providerServices.generateApiSecret(providerId).subscribe(response => {
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
          Token: response.token,  // Aquí ya está asignado el token correctamente
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
