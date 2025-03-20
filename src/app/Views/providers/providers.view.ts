import { Component, OnInit } from '@angular/core';
import { ProvidersColumn } from '../../Models/dto/providers.dto';
import { ProvidersService } from '../../Services/providers.service';
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
    
      // Crear el objeto JSON simulado
      const apiSecrets = {
        providerId: provider.id,
        name: provider.razon_social,
        apiKey: "sk-XXXX-XXXX-XXXX",
        base_irl: "https://quetzalcoatl.com/api/v1/prov",
        createdAt: new Date().toISOString()
      };
    
      const blob = new Blob([JSON.stringify(apiSecrets, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `api_secrets_${provider.id}.json`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      Swal.fire({
        title: "API SECRETs generados",
        text: "Los API SECRETs han sido generados con éxito y se ha iniciado la descarga.",
        icon: "success"
      });
      this.confirmationStatus[providerId] = false;
    });
  }
  
}
