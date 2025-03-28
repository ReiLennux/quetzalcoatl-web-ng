import { DeleteUseCase } from './../../../Domain/UseCases/Assets/delete.use-case';
import { GetUseCase } from './../../../Domain/UseCases/Assets/get.use-case';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../../../Domain/Models/asset.model';
import { AssetsColumns } from '../../../Data/dto/assets.dto';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.view.html',
})
export class AssetsViewComponent implements OnInit {
  columnsName = AssetsColumns;
  assets: Asset[] = [];

  constructor(
    private getUseCase: GetUseCase,
    private deleteUseCase: DeleteUseCase
  ) {}

  ngOnInit() {
    // Obtener los activos y manejar posibles errores
    this.getUseCase.execute().pipe(
      catchError((error) => {
        console.error('Error al obtener los activos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los activos.',
          icon: 'error',
        });
        return of([]); // En caso de error, retornar un array vacío
      })
    ).subscribe((assets: Asset[]) => {
      this.assets = assets;
    });
  }

  deleteAsset(id: number) {
    // Proceder con la eliminación directamente, sin confirmación aquí
    this.deleteUseCase.execute(id).pipe(
      catchError((error) => {
        console.error('Error al eliminar activo:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el activo.',
          icon: 'error',
        });
        return of(null); // En caso de error, no modificar la lista
      })
    ).subscribe(() => {
      // Actualizar la lista de activos eliminando el activo
      this.assets = this.assets.filter((asset) => asset.activoFijoID !== id);
      Swal.fire({
        title: 'Eliminado',
        text: 'El activo ha sido eliminado con éxito.',
        icon: 'success',
      });
    });
  }
}
