import { Component } from '@angular/core';
import { SubsidiaryColumns } from '../../Models/dto/subsidiary.dto';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.view.html',
  styleUrl: './subsidiaries.view.css'
})
export class SubsidiariesView {
  columnsName = SubsidiaryColumns;
  
}
