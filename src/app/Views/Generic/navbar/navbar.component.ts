import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  nombre: string | null = null;
  email: string | null = null;
  rol: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.nombre = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      this.rol = localStorage.getItem('role');
    }
  }

  logOut() {
    this.authService.logout();
  }
}
