export interface Auth {
    correo: string;
    pwd: string;
  }
  
  export interface AuthResponse {
    token: string;
    rol: string;
    nombre: string;
  }
  