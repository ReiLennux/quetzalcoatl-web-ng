import { Subsidiary } from './../../../Domain/Models/subsidiary.model';
import { GetUseCase as GetSubsidiariesUseCase } from './../../../Domain/UseCases/Subsidiaries/get.use-case';
import { Provider } from './../../../Domain/Models/provider.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../../Data/Services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetUseCase } from '../../../Domain/UseCases/Providers/get.use-case';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.manager.html',
})
export class AssetsManagerComponent implements OnInit {
  assetForm: FormGroup;
  id: number = 0;
  providers: { value: number; label: string }[] = [];
  subsidiaries: { value: number; label: string }[] = [];
  statuses = [
    { value: 1, label: 'Activo' },
    { value: 2, label: 'Inactivo' },
    { value: 3, label: 'Dado de baja' }
  ];

  constructor(
    private fb: FormBuilder,
    private assetService: AssetsService,
    private router: Router,
    private route: ActivatedRoute,
    private providerGetUseCase: GetUseCase,
    private subsidiaryGetUseCase: GetSubsidiariesUseCase
  ) {
    this.assetForm = this.fb.group({
      ActivoFijoID: [], // Asumí que el ID puede no ser requerido en la creación
      Nombre: ['', Validators.required], // Nombre del activo
      Descripcion: [''], // Descripción del activo (opcional)
      Serial: ['', Validators.required], // Serial obligatorio
      FechaCompra: ['', Validators.required], // Fecha de compra obligatoria
      ProveedorID: ['', Validators.required], // Proveedor obligatorio
      SucursalID: ['', Validators.required], // Sucursal obligatoria
      FechaAlta: ['', Validators.required], // Fecha de alta obligatoria
      FechaBaja: [''], // Fecha de baja (opcional)
      Estatus: ['', Validators.required] // Estatus obligatorio
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.assetService.getById(this.id).subscribe((data: any) => {
          // Patch the form values based on the response data
          this.assetForm.patchValue({
            ActivoFijoID: data.ActivoFijoID,
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            Serial: data.Serial,
            FechaCompra: new Date(data.FechaCompra),
            ProveedorID: data.ProveedorID,
            SucursalID: data.SucursalID,
            FechaAlta: new Date(data.FechaAlta),
            FechaBaja: data.FechaBaja ? new Date(data.FechaBaja) : null,
            Estatus: data.Estatus
          });
        });
      }
    });
    await this.getCatalogs();
  }

  private async getCatalogs() {
    // Obtener proveedores
    this.providerGetUseCase.execute().pipe(
      catchError((error) => {
        console.error('Error al obtener proveedores:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los proveedores.',
          icon: 'error'
        });
        return of([]); // Retornar un array vacío en caso de error
      })
    ).subscribe((data: Provider[]) => {
      this.providers = data.map((provider: Provider) => ({
        value: provider.ProveedorID,
        label: provider.Nombre
      }));
    });

    // Obtener sucursales
    this.subsidiaryGetUseCase.execute().pipe(
      catchError((error) => {
        console.error('Error al obtener sucursales:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las sucursales.',
          icon: 'error'
        });
        return of([]); // Retornar un array vacío en caso de error
      })
    ).subscribe((data: any) => {
      const subsidiariesData = data as Subsidiary[];
      this.subsidiaries = subsidiariesData.map((subsidiary: Subsidiary) => ({
        value: subsidiary.SucursalId,
        label: subsidiary.Nombre
      }));
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.assetForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.assetForm.invalid) return;
    const formValue = this.assetForm.value;

    // Asegurando que las fechas estén en formato correcto para el backend
    formValue.FechaCompra = new Date(formValue.FechaCompra).toISOString();
    formValue.FechaAlta = new Date(formValue.FechaAlta).toISOString();
    formValue.FechaBaja = formValue.FechaBaja ? new Date(formValue.FechaBaja).toISOString() : null;

    if (this.id > 0) {
      // Actualizar el activo existente
      this.assetService.putData(formValue).subscribe(() => {
        Swal.fire({
          title: 'Actualizado correctamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/assets']);
      });
    } else {
      // Crear un nuevo activo
      this.assetService.postData(formValue).subscribe(() => {
        Swal.fire({
          title: 'Guardado correctamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/assets']);
      });
    }
  }
}
