import { GetUseCase } from './../../../Domain/UseCases/Subsidiaries/get.use-case';
import { Component, OnInit } from '@angular/core';
import { SubsidiaryColumn } from '../../../Data/dto/subsidiary.dto';
import { Subsidiary } from '../../../Domain/Models/subsidiary.model';
import Swal from 'sweetalert2';
import { DeleteUseCase } from '../../../Domain/UseCases/Subsidiaries/delete.use-case';
@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.view.html',
})
export class SubsidiariesViewComponent implements OnInit {
  columnsName = SubsidiaryColumn;
  subsidiaries: Subsidiary[] | undefined;
  
  constructor(
    private getUseCase: GetUseCase,
    private deleteUseCase: DeleteUseCase
  ) {}

  ngOnInit() {
    this.getUseCase.execute().subscribe((data: Object) => {
      this.subsidiaries = data as unknown as Subsidiary[];
    });
  }

  deleteSubsidiary(subsidiary: Subsidiary) {
    this.deleteUseCase.execute(subsidiary.SucursalId).subscribe(() => {
      this.subsidiaries = this.subsidiaries?.filter(
        (subsidiaryItem) => subsidiaryItem.SucursalId !== subsidiary.SucursalId
      );
    });
    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true
    });
  }
}
