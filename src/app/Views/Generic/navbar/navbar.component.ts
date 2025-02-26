import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  email = localStorage.getItem('name');
   constructor(private authService: AuthService) { }
  
    logOut() {
      this.authService.logOut();
    }
}
