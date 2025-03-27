import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PostUseCase } from './../../../Domain/UseCases/Providers/post.use-case';
import { PutUseCase } from './../../../Domain/UseCases/Providers/put.use-case';
import { getbyId } from './../../../Domain/UseCases/Providers/get-by-id.use-case';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.manager.html',
})
export class ProvidersManagerComponent implements OnInit {
  providerForm: FormGroup;
  id = 0;
  statuses = [
    { value: 1, label: 'Activo' },
    { value: 2, label: 'Inactivo' },
    { value: 3, label: 'Suspendido' }
  ];
  types = [
    { value: 1, label: 'Fiscal' },
    { value: 2, label: 'Natural' }
  ];

  constructor(
    private fb: FormBuilder,
    private postUseCase: PostUseCase,
    private getbyIdUseCase: getbyId,
    private putUseCase: PutUseCase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Actualización del FormGroup según el modelo Provider
    this.providerForm = this.fb.group({
      ProveedorID: [0],  // No se requiere validación si es solo para editar
      Nombre: ['', [Validators.required, Validators.maxLength(200)]],

      Tipo: ['', Validators.required],

      Direccion: ['', Validators.required],
      Telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Solo números
      Email: ['', [Validators.required, Validators.email]],
      FechaAlta: ['', Validators.required],  // Necesitaría un formateo específico para fechas
      FechaBaja: [''],  // Opcional
      Estatus: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Cargando los datos si es necesario para la edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.getbyIdUseCase.execute(this.id).subscribe((data: any) => {
          // Aquí se espera que los datos tengan el formato adecuado para el formulario
          this.providerForm.patchValue({
            ProveedorID: data.ProveedorID,
            Nombre: data.Nombre,
            Tipo: data.Tipo,
            Direccion: data.Direccion,
            Telefono: data.Telefono,
            Email: data.Email,
            FechaAlta: data.Fechalta, // Este es un campo de tipo Date, puede necesitar formateo
            FechaBaja: data.FechaBaja, 
            Estatus: data.Estatus
          });
        });
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.providerForm.get(controlName);

    // Verificar si el control es inválido y tocado
    if (control?.invalid && control?.touched) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if (control.hasError('minlength')) {
        return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
      }
      if (control.hasError('email')) {
        return 'El correo no es válido';
      }
      if (control.hasError('pattern')) {
        return 'El formato del teléfono no es válido';
      }
    }
    return '';  // Si no hay error
  }

  onSubmit() {
    if (this.providerForm.invalid) {
      Swal.fire({
        title: 'Por favor, corrige los errores del formulario.',
        icon: 'error',
      });
      return;
    }

    const formData = this.providerForm.value;
    if (this.id > 0) {
      this.putUseCase.execute(formData).subscribe(
        () => this.handleSuccess('Actualización exitosa'),
        () => this.handleError()
      );
    } else {
      this.postUseCase.execute(formData).subscribe(
        () => this.handleSuccess('Proveedor creado correctamente'),
        () => this.handleError()
      );
    }
  }

  private handleSuccess(message: string) {
    this.router.navigate(['/providers']);
    Swal.fire({
      title: message,
      icon: 'success',
      draggable: true,
    });
  }

  private handleError() {
    Swal.fire({
      title: 'Ocurrió un error al guardar los datos.',
      icon: 'error',
    });
  }
}

export interface Provider {
  ProveedorID: number;
  Nombre: string;
  Tipo: string;
  Direccion: string;
  Telefono: string;
  Email: string;
  Fechalta: Date;
  FechaBaja?: Date;
  Estatus: string;
}
