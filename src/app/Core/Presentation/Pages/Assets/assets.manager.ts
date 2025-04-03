import { GetByIdUseCase } from './../../../Domain/UseCases/Assets/get-by-id.use-case';
import { Subsidiary } from './../../../Domain/Models/subsidiary.model';
import { GetUseCase as GetSubsidiariesUseCase } from './../../../Domain/UseCases/Subsidiaries/get.use-case';
import { Provider } from './../../../Domain/Models/provider.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetUseCase } from '../../../Domain/UseCases/Providers/get.use-case';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostUseCase } from '../../../Domain/UseCases/Assets/post.use-case';
import { PutUseCase } from '../../../Domain/UseCases/Assets/put.use-case';
import { Asset } from '../../../Domain/Models/asset.model';

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
    private router: Router,
    private route: ActivatedRoute,
    private providerGetUseCase: GetUseCase,
    private subsidiaryGetUseCase: GetSubsidiariesUseCase,
    private getByIdUseCase: GetByIdUseCase,
    private postUseCase: PostUseCase,
    private putUseCase: PutUseCase
  ) {
    this.assetForm = this.fb.group({
      activoFijoId: [], // Asumí que el ID puede no ser requerido en la creación
      nombre: ['', Validators.required], // Nombre del activo
      descripcion: [], // Descripción del activo (opcional)
      serial: ['', Validators.required], // Serial obligatorio
      fechaCompra: ['', Validators.required], // Fecha de compra obligatoria
      proveedorID: [null, Validators.required], // Proveedor obligatorio
      sucursalID: [null, Validators.required], // Sucursal obligatoria
      fechaAlta: ['', Validators.required], // Fecha de alta obligatoria
      fechaBaja: [''], // Fecha de baja (opcional)
      estatus: ['', Validators.required] // Estatus obligatorio
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.getByIdUseCase.execute(this.id).subscribe((data: any) => {
          // Patch the form values based on the response data
          this.assetForm.patchValue({
            activoFijoId: data.activoFijoId,
            nombre: data.nombre,
            descripcion: data.descripcion,
            serial: data.serial,
            fechaCompra: new Date(data.fechaAlta),
            proveedorID: data.proveedorID,
            sucursalID: data.sucursalID,
            fechaAlta: new Date(data.fechaAlta),
            fechaBaja: data.fechaBaja ? new Date(data.fechaBaja) : null,
            estatus: data.estatus
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
          icon: 'error',
        });
        return of([]); // Retornar un array vacío en caso de error
      })
    ).subscribe((data: Provider[]) => {
      this.providers = data.map((provider: Provider) => ({
        value: provider.proveedorId,
        label: provider.nombre
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
        value: subsidiary.sucursalId,
        label: subsidiary.nombre
      }));
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.assetForm.get(controlName);
    
    if (control?.invalid && control?.touched) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if (control.hasError('minlength')) {
        return 'Debe contener al menos 3 caracteres';
      }
      if (control.hasError('maxlength')) {
        return 'No debe exceder los 500 caracteres';
      }
      if (control.hasError('pattern')) {
        return 'Formato inválido';
      }
    }
    
    return '';
  }
  
  onSubmit() {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
            Swal.fire({
              title: 'Por favor, corrige los errores del formulario.',
              icon: 'error',
            });

      return;
    }
  
    const formValue = { ...this.assetForm.value };
    formValue.fechaCompra = formValue.fechaCompra ? new Date(formValue.fechaCompra).toISOString() : null;
    formValue.fechaAlta = formValue.fechaAlta ? new Date(formValue.fechaAlta).toISOString() : null;
  
    if (this.id > 0) {
      formValue.activoFijoId = this.id;
      formValue.fechaBaja = formValue.fechaBaja ? new Date(formValue.fechaBaja).toISOString() : null;
  
      this.putUseCase.execute(formValue).subscribe(() => {
        Swal.fire({
          title: 'Actualizado correctamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/assets']);
      });
  
    } else {
      formValue.fechaBaja = null;
      delete formValue.activoFijoId;
  
      this.postUseCase.execute(formValue).subscribe(() => {
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
