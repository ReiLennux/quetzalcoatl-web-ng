import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrl: './login.view.css'
})
export class LoginView {
  loginForm: FormGroup;
  isSubmitting: boolean = false; 
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  postData() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.postData(this.loginForm.value).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.isSubmitting = false;
      },
      (error: any) => {
        console.error('Error en la solicitud:', error);
        this.errorMessage = 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.isSubmitting = false;
      }
    );
  }
}
