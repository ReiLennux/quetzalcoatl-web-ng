import { Component, OnInit } from '@angular/core';
import { ProvidersColumn } from '../../../Data/dto/providers.dto';
import Swal from 'sweetalert2';
import { GetUseCase } from '../../../Domain/UseCases/Providers/get.use-case';
import { GetById } from '../../../Domain/UseCases/Providers/get-by-id.use-case';
import { GenerateApiSecretUseCase } from '../../../Domain/UseCases/Providers/generate-api-secret.use-case';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.view.html',
})
export class ProvidersViewComponent implements OnInit {
  columnsName = ProvidersColumn;
  providers: any[] = [];
  confirmationStatus: { [key: number]: boolean } = {};

  constructor(
    private getUseCase: GetUseCase,
    private getbyIdUseCase: GetById,
    private generateApiSecretUseCase: GenerateApiSecretUseCase
  ) {}

  ngOnInit() {
    this.getUseCase.execute().subscribe(providers => {
      this.providers = providers || [];
    });
  }

  deleteProvider(provider: any) {
    this.providers = this.providers?.filter(p => p.id !== provider.id);
    this.showAlert('Eliminado', 'Proveedor eliminado correctamente.', 'success');
  }

  confirmGeneration(event: any, providerId: number) {
    this.confirmationStatus[providerId] = event.target.value === 'CONFIRMAR';
  }

  generateApiSecrets(providerId: number) {
    this.getbyIdUseCase.execute(providerId).pipe(
      switchMap(provider => {
        if (!provider) {
          this.showAlert('Error', 'Proveedor no encontrado.', 'error');
          return of(null);
        }
        return this.generateApiSecretUseCase.execute().pipe(
          switchMap(response => {
            if (!response?.token) {
              this.showAlert('Error', 'No se pudo generar el API Secret.', 'error');
              return of(null);
            }
            this.downloadApiSecrets(provider, response.token);
            this.confirmationStatus[providerId] = false;
            this.showAlert('Éxito', 'Los API SECRETs han sido generados y descargados.', 'success');
            return of(true);
          })
        );
      })
    ).subscribe();
  }

  private downloadApiSecrets(provider: any, token: string) {
    const apiSecrets = {
      providerId: provider.ProveedorID,
      name: provider.Nombre,
      Token: token,
      base_url: 'https://quetzalcoatl.com/api/v1/prov',
      createdAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(apiSecrets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api_secrets_${provider.ProveedorID}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title,
      text,
      icon,
      background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2b2b2b' : '#ffffff',
      color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000'
    });
  }
}
