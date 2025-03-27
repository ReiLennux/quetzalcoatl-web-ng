import { Component, OnInit } from '@angular/core';
import { SubsidiaryColumn } from '../../../Data/dto/subsidiary.dto';
import { SubsidiariesService } from '../../../Data/Services/subsidiaries.service';
import { Subsidiary } from '../../../Domain/Models/subsidiary.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.view.html',
})
export class SubsidiariesViewComponent implements OnInit {
  columnsName = SubsidiaryColumn;
  subsidiaries: Subsidiary[] | undefined;
  
  constructor(private subsidiaryService: SubsidiariesService) {}

  ngOnInit() {
    this.subsidiaryService.getData().subscribe((data: Subsidiary[]) => {
      this.subsidiaries = data;
    });
  }

  deleteSubsidiary(subsidiary: Subsidiary) {
    this.subsidiaries = this.subsidiaries?.filter(s => s.SucursalId!== subsidiary.SucursalId);
    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true
    });
  }
}
