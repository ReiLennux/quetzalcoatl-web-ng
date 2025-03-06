import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubsidiariesService } from '../../Services/subsidiaries.service';
import { Subsidiary } from '../../Models/subsidiary.model';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.manager.html',
  styleUrl: './subsidiaries.manager.css'
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
    private subsidiariesService: SubsidiariesService, 
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
        this.subsidiariesService.getById(this.id).subscribe((data: Subsidiary) => {
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
    this.subsidiariesService.postData(this.subsidiaryForm.value);
    this.router.navigate(['/subsidiaries']);
  }
}
