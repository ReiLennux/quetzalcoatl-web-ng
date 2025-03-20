import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.css']
})
export class LoginViewComponent {

  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: SafeHtml = ""; 
  router: Router;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.router = router;
  }

  postData() {
    if (this.loginForm.invalid) {
      this.errorMessage = this.sanitizer.bypassSecurityTrustHtml('Por favor, completa todos los campos correctamente.');
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.postData(this.loginForm.value).subscribe(
      (response: { data: unknown }) => {
        console.log('Respuesta del servidor:', response.data);
        this.isSubmitting = false;
        this.router.navigate(['/r']);
      },
      (error: { message: string }) => {
        console.error('Error en la solicitud:', error.message);
        this.errorMessage = this.sanitizer.bypassSecurityTrustHtml('Error en el inicio de sesión. Verifica tus credenciales.');
        this.isSubmitting = false;
      }
    );
  }
}