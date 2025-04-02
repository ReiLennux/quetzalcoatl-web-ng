import { Component, OnInit } from '@angular/core';
import { ProvidersColumn } from '../../../Data/dto/providers.dto';
import Swal from 'sweetalert2';
import { GetUseCase } from '../../../Domain/UseCases/Providers/get.use-case';
import { GetById } from '../../../Domain/UseCases/Providers/get-by-id.use-case';
import { GenerateApiSecretUseCase } from '../../../Domain/UseCases/Providers/generate-api-secret.use-case';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Provider } from '../../../Domain/Models/provider.model';
import { DeleteUseCase } from '../../../Domain/UseCases/Providers/delete.use-case';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.view.html',
})
export class ProvidersViewComponent implements OnInit {
  columnsName = ProvidersColumn;
  providers: Provider[] = [];
  confirmationStatus: { [key: number]: boolean } = {};

  constructor(
    private getUseCase: GetUseCase,
    private getbyIdUseCase: GetById,
    private deleteUseCase: DeleteUseCase,
    private generateApiSecretUseCase: GenerateApiSecretUseCase
  ) {}

  ngOnInit() {
    this.getProviders();
  }

  getProviders() {
    this.getUseCase.execute().pipe(
      catchError(error => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los proveedores.',
          icon: 'error',
        });
        console.error('Error al obtener los proveedores:', error);
        return of([] as Provider[]);
      })
    ).subscribe((data: Provider[]) => {
      this.providers = data || [];
    });
  }

  deleteProvider(provider: Provider) {
    console.log("entro")
    this.deleteUseCase.execute(provider.proveedorId).pipe(
      catchError(error => {
        this.showAlert('Error', 'No se pudo eliminar la sucursal.', 'error');
        console.error('Error al eliminar sucursal:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.providers = this.providers.filter(s => s.proveedorId !== provider.proveedorId);
      this.getProviders()
      this.showAlert('Eliminado', 'Sucursal eliminada correctamente.', 'success');
    });
  }

  getEstado(estatus: string): string {
    if (estatus === '1') {
      return "Activo";
    } else if (estatus === '2') {
      return "Inactivo";
    } else {
      return "Dado de Baja"; // Or handle other statuses as needed
    }
  }

    getType(id: string): string {
      if (id === '1') {
        return 'Equipamiento';
      }
      if (id === '2'){
        return 'Servicios'
      }
      if (id === '3'){
        return 'Materia Prima'
      }
      return 'Sin especificar'
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
