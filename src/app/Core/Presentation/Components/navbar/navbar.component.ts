import { Component, OnInit } from '@angular/core';
import { LogoutUseCase } from '../../../Domain/UseCases/Auth/logout.use-case';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  nombre: string | null = null;
  email: string | null = null;
  rol: string | null = null;

  constructor(private logoutUseCase: LogoutUseCase) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.nombre = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      this.rol = localStorage.getItem('role');
    }
  }

  logOut() {
    this.logoutUseCase.execute();
  }
}
