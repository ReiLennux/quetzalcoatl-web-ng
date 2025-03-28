import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subsidiary } from '../../../Domain/Models/subsidiary.model';
import Swal from 'sweetalert2';
import { GetByIdUseCase } from '../../../Domain/UseCases/Subsidiaries/get-by-id.use.case';
import { PutUseCase } from '../../../Domain/UseCases/Subsidiaries/put.use-case';
import { PostUseCase } from '../../../Domain/UseCases/Subsidiaries/post.use-case';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.manager.html',
})

export class SubsidiariesManagerComponent implements OnInit {
  subsidiaryForm: FormGroup;
  id = 0;
  statuses = [
    { value: 1, label: 'Activo' },
    { value: 2, label: 'Inactivo' },
    { value: 3, label: 'Suspendido' }
  ]
  types = [
    { value: 1, label: 'Principal' },
    { value: 2, label: 'Sucursal' }
  ]
  
  constructor(
    private fb: FormBuilder, 
    private GetUseCase: GetByIdUseCase,
    private putUseCase: PutUseCase,
    private postUseCase: PostUseCase,
    private router: Router, 
    private route: ActivatedRoute
  ) {
    
    // Aquí creamos el formulario con las validaciones correctas
    this.subsidiaryForm = this.fb.group({
      SucursalId: [0],
      Nombre: ['', [Validators.required, Validators.minLength(3)]],

      Direccion: ['', [Validators.required, Validators.minLength(6)]],
      Ciudad: ['', [Validators.required, Validators.minLength(3)]],
      Estado: ['', [Validators.required]],
      Pais: ['', [Validators.required]],
      CodigoPostal: ['', [Validators.required, Validators.minLength(5)]],
      Latitud: [null, [Validators.required]],
      Longitud: [null, [Validators.required]],
      
      FechaAlta: [new Date(), [Validators.required]], 
      FechaBaja: [null],
      Estatus: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.GetUseCase.execute(this.id).subscribe((data: any) => {
          const subsidiaryData = data as Subsidiary;

          // Asignamos los valores del SubsidiaryData al formulario
          this.subsidiaryForm.patchValue({
            SucursalId: subsidiaryData.sucursalId,
            Nombre: subsidiaryData.nombre,
            Direccion: subsidiaryData.direccion,
            Ciudad: subsidiaryData.ciudad,
            Estado: subsidiaryData.estado,
            Pais: subsidiaryData.pais,
            CodigoPostal: subsidiaryData.codigoPostal,
            Latitud: subsidiaryData.latitud,
            Longitud: subsidiaryData.longitud,
            FechaAlta: subsidiaryData.fechaAlta,
            FechaBaja: subsidiaryData.fechaBaja,
            Estatus: subsidiaryData.estatus
          });
        });
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.subsidiaryForm.get(controlName);

    if (control?.invalid && control?.touched) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      if (control.hasError('minlength')) {
        return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
      }
    }
    return '';  // Si no hay error
  }

  onSubmit() {
    if (this.subsidiaryForm.invalid) {
      return;
    }

    // Preparamos los datos para ser enviados
    const formValue = this.subsidiaryForm.value;

    // Enviar la información
    if (this.id > 0) {
      this.putUseCase.execute(formValue).subscribe(() => {
        Swal.fire({
          title: 'Sucursal actualizada!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/subsidiaries']);
      });
    } else {
      this.postUseCase.execute(formValue).subscribe(() => {
        Swal.fire({
          title: 'Sucursal guardada!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/subsidiaries']);
      });
    }
  }
}
