import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostUseCase } from './../../../Domain/UseCases/Providers/post.use-case';
import { PutUseCase } from './../../../Domain/UseCases/Providers/put.use-case';
import { GetById } from './../../../Domain/UseCases/Providers/get-by-id.use-case';
import { Provider } from '../../../Domain/Models/provider.model';
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
    { value: 1, label: 'Equipamiento' },
    { value: 2, label: 'Servicios' },
    { value: 3, label: 'Materia Prima'}
  ];

  initialFormValue: any

  constructor(
    private fb: FormBuilder,
    private postUseCase: PostUseCase,
    private getbyIdUseCase: GetById,
    private putUseCase: PutUseCase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Actualización del FormGroup según el modelo Provider
    this.providerForm = this.fb.group({
      proveedorId: [0],  // No se requiere validación si es solo para editar
      nombre: ['', [Validators.required, Validators.maxLength(200)]],

      tipo: ['', Validators.required],

      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Solo números
      email: ['', [Validators.required, Validators.email]],
      fechaAlta: ['', Validators.required],  // Necesitaría un formateo específico para fechas
      fechaBaja: [''],  // Opcional
      estatus: ['1', Validators.required]
    });
  }

  ngOnInit() {
    // Cargando los datos si es necesario para la edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.getbyIdUseCase.execute(this.id).subscribe((data: Provider) => {
          this.providerForm.patchValue({
            proveedorId: data.proveedorId,
            nombre: data.nombre,
            tipo: data.tipo,
            direccion: data.direccion,
            telefono: data.telefono,
            email: data.email,
            fechaAlta: data.fechaAlta,
            fechaBaja: data.fechaBaja,
            estatus: data.estatus
          });
          this.initialFormValue = { ...this.providerForm };  // Guarda los valores iniciales
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
      this.providerForm.markAllAsTouched();
      Swal.fire({
        title: 'Por favor, corrige los errores del formulario.',
        icon: 'error',
      });
      return;
    }

    const formData = this.providerForm.value;
          // Compara los valores actuales del formulario con los valores iniciales

      const isFormUnchanged = JSON.stringify(formData.value) === JSON.stringify(this.initialFormValue.value);
    
      if (isFormUnchanged) {
        Swal.fire({
          title: 'No se realizaron cambios.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/providers']);  // Redirige a la página principal
        });
        return;
      }

    if (this.id > 0) {
      this.putUseCase.execute(formData).subscribe(
        () => this.handleSuccess('Actualización exitosa'),
        () => this.handleError()
      );
    } else {
      formData.fechaBaja = null;  // No se requiere para un nuevo registro
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

