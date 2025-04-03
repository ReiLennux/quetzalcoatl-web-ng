import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth, AuthResponse } from '../../../Core/Domain/Models/auth.model';
import { environment } from '../../../../environments/environments';
import { AuthRepository } from './auth.repository';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let httpTestingController: HttpTestingController;

  const mockAuthData: Auth = {
    correo: 'testuser',
    pwd: 'testpassword'
  };

  const mockAuthResponse: AuthResponse = {
    token: 'fake-jwt-token',
    rol: 'rol-prueba',
    nombre: 'testuser'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos el módulo de pruebas HTTP
      providers: [AuthRepository]
    });

    authRepository = TestBed.inject(AuthRepository);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authRepository).toBeTruthy();
  });

  it('should send a POST request to login and return auth response', () => {
    authRepository.login(mockAuthData).subscribe(response => {
      expect(response).toEqual(mockAuthResponse);
    });

    // Verifica que se haya realizado una solicitud POST al endpoint esperado
    const req = httpTestingController.expectOne(`${environment.API_URL}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAuthData); // Asegúrate de que los datos enviados sean correctos

    // Simula la respuesta de la API
    req.flush(mockAuthResponse);
  });

  it('should handle error response correctly', () => {
    const errorMessage = 'Something went wrong';
    
    authRepository.login(mockAuthData).subscribe(
      () => fail('expected an error, not auth response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    // Verifica que se haya realizado la solicitud y responde con un error
    const req = httpTestingController.expectOne(`${environment.API_URL}/login`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpTestingController.verify();
  });
});
