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
  isLoading = true;

  constructor(
    private readonly getUseCase: GetUseCase,
    private readonly deleteUseCase: DeleteUseCase
  ) { }

  ngOnInit() {
    this.getSubsidiaries()
  }

  getSubsidiaries() {
    this.getUseCase.execute().pipe(
      catchError(error => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las sucursales.',
          icon: 'error',
        });
        console.error('Error al obtener las sucursales:', error);
        return of([] as Subsidiary[]);
      })
    ).subscribe((data: Object | Subsidiary[]) => {
      this.subsidiaries = (data as Subsidiary[]) ?? [];
      this.totalItems = this.subsidiaries.length
    });
    this.isLoading = false;
  }

  getEstado(estatus: string): string {
    if (estatus === '1') {
      return "Activo";
    } else if (estatus === '2') {
      return "Inactivo";
    } else {
      return "Dado de Baja"; // Or handle other statuses as needed
    }
  }

  deleteSubsidiary(subsidiary: Subsidiary) {
    this.deleteUseCase.execute(subsidiary.sucursalId).pipe(
      catchError(error => {
        this.showAlert('Error', 'No se pudo eliminar la sucursal.', 'error');
        console.error('Error al eliminar sucursal:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.subsidiaries = this.subsidiaries.filter(s => s.sucursalId !== subsidiary.sucursalId);
      this.getSubsidiaries()
      this.showAlert('Eliminado', 'Sucursal eliminada correctamente.', 'success');
    });
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title,
      text,
      icon,
      background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2b2b2b' : '#ffffff',
      color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000'
    });
  }




  //#region Paginator Helpers
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  get paginatedSubsidiaries(): Subsidiary[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.subsidiaries.slice(startIndex, startIndex + this.itemsPerPage);
  }
  //#endregion


  //#region Modal Helpers
  openModals: { [key: number]: boolean } = {};

  toggleModal(dbId: number): void {
    this.openModals[dbId] = !this.openModals[dbId];
  }
  isModalOpen(dbId: number): boolean {
    return !!this.openModals[dbId];
  }
  //#endregion
}
