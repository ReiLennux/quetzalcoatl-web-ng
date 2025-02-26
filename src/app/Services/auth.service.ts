import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://api-gateway-production-9080.up.railway.app';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getData() {
    return this.http.get(this.apiUrl + '/data');
  }

//   postData(userData: any): Observable<any> {

//      localStorage.setItem('token', "00000000000000000000");

//       const mockResponse = {
//         success: true,
//    message: 'Login exitoso',
//   user: {
//   name: userData.strName,
//    email: userData.strPassword,
//  },
// };

// this.router.navigate(['/']);
// return of(mockResponse).pipe(delay(200000)); 
//   }

   postData(userData: any): Observable<any> {
    const {strName, strPassword} = userData;
     return this.http.post<any>(this.apiUrl + '/login', {pwd : strPassword, correo: strName  }).pipe(
       tap((response: { token: string; }) => {
         if (response && response.token) {
           localStorage.setItem('token', response.token);
         }
         localStorage.setItem('name', userData.strName);
         localStorage.setItem('email', userData.strEmail);
        
         this.router.navigate(['/']);
       })
     );
   }
  

  logOut() {
    localStorage.removeItem('token');
  }
}

