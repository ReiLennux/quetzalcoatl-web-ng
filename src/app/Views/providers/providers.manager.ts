import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../Services/providers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.manager.html',
})
export class ProvidersManagerComponent implements OnInit {
  providerForm: FormGroup;
  id = 0;
  statuses = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ]
  types = [
    { value: 'fiscal', label: 'Fiscal' },
    { value: 'natural', label: 'Natural' }
  ]

  constructor(
    private fb: FormBuilder, 
    private providersService: ProvidersService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {
    this.providerForm = this.fb.group({
      key: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13)]],
      razon_social: ['', [Validators.required, Validators.maxLength(200)]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      type: ['', Validators.required],
      max_capacity: ['', [Validators.required, Validators.min(1)]],
      conditions: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.providersService.getProvider(this.id).subscribe((data: any) => {
          this.providerForm.patchValue(data);
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
    }
    return '';  // Si no hay error
  }

  onSubmit() {
      if (this.providerForm.invalid) {
        return;
      }
      console.log(this.providerForm.value);
      if (this.id > 0) {
        this.providersService.putData(this.providerForm.value);
      } else {
        this.providersService.postData(this.providerForm.value);
      }
      
      this.router.navigate(['/providers']);
      Swal.fire({
        title: "Guardado correctamente!",
        icon: "success",
        draggable: true,
      });
    }

}
