import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrl: './login.view.css'
})
export class LoginViewComponent {
  loginForm: FormGroup;
  isSubmitting = false; 
  errorMessage = '';
  router: Router;
  constructor(private fb: FormBuilder, private authService: AuthService, router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.router = router;
  }

  postData() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.postData(this.loginForm.value).subscribe(
      (response: { data: any }) => {
        console.log('Respuesta del servidor:', response.data);
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      },
      (error: { message: string }) => {
        console.error('Error en la solicitud:', error.message);
        this.errorMessage = 'Error en el inicio de sesión. Verifica tus credenciales.';
        this.isSubmitting = false;
      }
    );
  }
}
