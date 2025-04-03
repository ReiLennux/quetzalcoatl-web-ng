import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subsidiary } from '../../../Domain/Models/subsidiary.model';
import Swal from 'sweetalert2';
import { GetByIdUseCase } from '../../../Domain/UseCases/Subsidiaries/get-by-id.use.case';
import { PutUseCase } from '../../../Domain/UseCases/Subsidiaries/put.use-case';
import { PostUseCase } from '../../../Domain/UseCases/Subsidiaries/post.use-case';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.manager.html',
})
export class SubsidiariesManagerComponent implements OnInit, AfterViewInit {
  subsidiaryForm: FormGroup;
  id = 0;
  map: any;
  marker: any;
  L: any;

  statuses = [
    { value: 1, label: 'Activo' },
    { value: 2, label: 'Inactivo' },
    { value: 3, label: 'Suspendido' }
  ];
  types = [
    { value: 1, label: 'Principal' },
    { value: 2, label: 'Sucursal' }
  ];
  
  constructor(
    private fb: FormBuilder, 
    private GetUseCase: GetByIdUseCase,
    private putUseCase: PutUseCase,
    private postUseCase: PostUseCase,
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.subsidiaryForm = this.fb.group({
      sucursalId: [0],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(6)]],
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      estado: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.minLength(5)]],
      latitud: [null, [Validators.required]],
      longitud: [null, [Validators.required]],
      fechaAlta: ['', [Validators.required]], 
      fechaBaja: [null],
      estatus: ['1', [Validators.required]]
    });
  }

  async ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.L = await import('leaflet');
      this.initializeMap();
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.GetUseCase.execute(this.id).subscribe((data: any) => {
          const subsidiaryData = data as Subsidiary;
          this.subsidiaryForm.patchValue(subsidiaryData);
        });
      }
    });
  }

  initializeMap() {
    const defaultCoords = this.getInitialCoordinates();
    this.map = this.L.map('map').setView(defaultCoords, 12);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    
    setTimeout(() => this.map.invalidateSize(), 0);
    
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.updateFormAndMap(lat, lng);
    });
  }

  private getInitialCoordinates(): [number, number] {
    return [
      this.subsidiaryForm.value.latitud || 19.432608,
      this.subsidiaryForm.value.longitud || -99.133209
    ];
  }

  private updateMapView(): void {
    const lat = this.subsidiaryForm.value.latitud;
    const lng = this.subsidiaryForm.value.longitud;
    
    this.map.setView([lat, lng], 12);
    if (this.marker) this.map.removeLayer(this.marker);
    this.marker = this.L.marker([lat, lng]).addTo(this.map);
  }

  private updateFormAndMap(lat: number, lng: number): void {
    this.subsidiaryForm.patchValue({ latitud: lat, longitud: lng });
    this.updateMapView();
    this.obtenerdireccion(lat, lng);
  }

  obtenerdireccion(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    
    this.http.get<any>(url).subscribe((data) => {
      this.subsidiaryForm.patchValue({
        direccion: this.decodeHTMLEntities(data.display_name || ''),
        ciudad: this.decodeHTMLEntities(data.address.city || data.address.town || ''),
        estado: this.decodeHTMLEntities(data.address.state || ''),
        pais: this.decodeHTMLEntities(data.address.country || ''),
        codigoPostal: data.address.postcode || ''
      });
    });
  }

  private decodeHTMLEntities(text: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  }
  
  onSubmit() {
    if (this.subsidiaryForm.invalid) {
            this.subsidiaryForm.markAllAsTouched();
            Swal.fire({
              title: 'Por favor, corrige los errores del formulario.',
              icon: 'error',
            });
      return
    };
    const formValue = this.subsidiaryForm.value;
    if (this.id > 0) {
      this.putUseCase.execute(formValue).subscribe(() => {
        Swal.fire({ title: 'Sucursal actualizada!', icon: 'success', confirmButtonText: 'Aceptar' });
        this.router.navigate(['/subsidiaries']);
      });
    } else {
      this.postUseCase.execute(formValue).subscribe(() => {
        Swal.fire({ title: 'Sucursal guardada!', icon: 'success', confirmButtonText: 'Aceptar' });
        this.router.navigate(['/subsidiaries']);
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.subsidiaryForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.hasError('required')) {
        return 'Este campo es obligatorio';
      }

      if (control.hasError('minlength')) {
        return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
      }
    }
    return '';  // Si no hay error
  }
}
