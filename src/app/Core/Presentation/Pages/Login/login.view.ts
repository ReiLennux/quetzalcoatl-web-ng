import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../Domain/UseCases/Auth/login.use-case';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.css']
})
export class LoginViewComponent {

  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = "";

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginUseCase: LoginUseCase,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  postData() {
    // Validación de formulario
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Llamada al caso de uso para login
    const userData = {
      correo: this.loginForm.value.correo,
      pwd: this.loginForm.value.pwd
    };

    this.loginUseCase.execute(userData).subscribe(
      (response) => {
        this.isSubmitting = false;
        this.router.navigate(['/r']); // Redirigir al home o a la ruta deseada
      },
      (error) => {
        console.error('Error en la solicitud:', error.message);
        this.errorMessage = 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.isSubmitting = false;
      }
    );
  }
}
