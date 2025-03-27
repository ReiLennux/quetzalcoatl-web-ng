import { Component, OnInit } from '@angular/core';
import { SubsidiaryColumn } from '../../../Data/dto/subsidiary.dto';
import { Subsidiary } from '../../../Domain/Models/subsidiary.model';
import Swal from 'sweetalert2';
import { GetUseCase } from '../../../Domain/UseCases/Subsidiaries/get.use-case';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeleteUseCase } from '../../../Domain/UseCases/Subsidiaries/delete.use-case';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.view.html',
})
export class SubsidiariesViewComponent implements OnInit {
  columnsName = SubsidiaryColumn;
  subsidiaries: Subsidiary[] = [];

  constructor(
    private getUseCase: GetUseCase,
    private deleteUseCase: DeleteUseCase
  ) {}

  ngOnInit() {
    this.getUseCase.execute().pipe(
      catchError(error => {
        this.showAlert('Error', 'No se pudieron obtener las sucursales.', 'error');
        console.error('Error al obtener las sucursales:', error);
        return of([] as Subsidiary[]);
      })
    ).subscribe((data: Object | Subsidiary[]) => {
      this.subsidiaries = (data as Subsidiary[]) || [];
    });
  }

  deleteSubsidiary(subsidiary: Subsidiary) {
    this.deleteUseCase.execute(subsidiary.SucursalId).pipe(
      catchError(error => {
        this.showAlert('Error', 'No se pudo eliminar la sucursal.', 'error');
        console.error('Error al eliminar sucursal:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.subsidiaries = this.subsidiaries.filter(s => s.SucursalId !== subsidiary.SucursalId);
      this.showAlert('Eliminado', 'Sucursal eliminada correctamente.', 'success');
    });
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title,
      text,
      icon,
      // Aquí usamos las clases dark de Flowbite
      customClass: {
        popup: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white', // Fondo claro o oscuro según el tema
        title: 'text-xl font-semibold',
        htmlContainer: 'text-base',
        icon: icon === 'error' ? 'text-red-500' : 'text-green-500',
      },
      // Mantén el fondo del pop-up según el tema oscuro
      background: 'transparent',
      showConfirmButton: true,
    });
  }
}
