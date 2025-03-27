import { Provider } from './../../../Domain/Models/provider.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../../Data/Services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubsidiariesService } from '../../../Data/Services/subsidiaries.service';
import { GetUseCase } from '../../../Domain/UseCases/Providers/get.use-case';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.manager.html',
})
export class AssetsManagerComponent implements OnInit {
    assetForm: FormGroup;
    id = 0;
    providers: any[] = [];
    subsidiaries: any[] = [];

    constructor(
      private fb: FormBuilder,
      private assetService: AssetsService,
      private router: Router,
      private route: ActivatedRoute,
      private providerGetUseCase: GetUseCase,
      private subsidiaryService: SubsidiariesService
      
    ){
      this.assetForm = this.fb.group({
        Id: [],
        Name: ['', Validators.required],
        Description: [''],
        Serial: ['', Validators.required],
        purchaseDate: ['', Validators.required],
        providerId: ['', Validators.required],
        subsidiaryId: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['']
      });
    }


    async ngOnInit() {
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
            this.id = +id;
            this.assetService.getById(this.id).subscribe((data: any) => {
              this.assetForm.patchValue(data);
            });
          }
        });
        await this.getCatalogs();
    }

    private  async getCatalogs(){
      this.providerGetUseCase.execute().subscribe((data: Provider[]) => {
        this.providers = data.map((provider: Provider) => ({ value: provider.ProveedorID, label: provider.Nombre }));
      });
      this.subsidiaryService.getData().subscribe((data: any) => {
        this.subsidiaries = data.map((subsidiary: any) => ({ value: subsidiary.id, label: subsidiary.key }));
      });
    }

    getErrorMessage(controlName: string): string {
      const control = this.assetForm.get(controlName);

      if (control?.invalid && control?.touched) {
        if (control.hasError('required')) {
          return 'Este campo es obligatorio';
        }
      }
      return '';
    }


    onSubmit() {
      if (this.assetForm.invalid) return;
      if (this.id > 0) {
        this.assetForm.patchValue({ id: this.id });
        this.assetService.putData(this.assetForm.value).subscribe(() => {
          this.router.navigate(['/assets']);
        });
      } else {
        this.assetService.postData(this.assetForm.value).subscribe(() => {
          this.router.navigate(['/assets']);
        });
      }
      Swal.fire({
        title: 'Guardado correctamente!',
        icon:'success',
        confirmButtonText: 'Aceptar'
      })
    }
    
}
