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
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ]
  types = [
    { value: 'main', label: 'Principal' },
    { value: 'branch', label: 'Sucursal' }
  ]
  
  constructor(
    private fb: FormBuilder, 
    private GetUseCase: GetByIdUseCase,
    private putUseCase: PutUseCase,
    private postUseCase: PostUseCase,
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.subsidiaryForm = this.fb.group({
      key: ['', []],
      address: ['', [Validators.required, Validators.minLength(6)]],
      manager: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      status: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.GetUseCase.execute(this.id).subscribe((data: any) => {
          const subsidiaryData = data as Subsidiary;
          this.subsidiaryForm.patchValue(subsidiaryData);
          this.subsidiaryForm.patchValue(data);
        });
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.subsidiaryForm.get(controlName);

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
    }
    return '';  // Si no hay error
  }

  onSubmit() {
    if (this.subsidiaryForm.invalid) {
      return;
    }
    console.log(this.subsidiaryForm.value);
    if (this.id > 0) {
      this.putUseCase.execute(this.subsidiaryForm.value);
    } else {
      this.postUseCase.execute(this.subsidiaryForm.value);
    }
    
    this.router.navigate(['/subsidiaries']);
    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true
    });
  }
}
