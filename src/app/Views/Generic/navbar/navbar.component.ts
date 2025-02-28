import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  nombre = localStorage.getItem('name');
  email = localStorage.getItem('email');
  rol = localStorage.getItem('role');

   constructor(private authService: AuthService) { }
  
    logOut() {
      this.authService.logOut();
    }
}
