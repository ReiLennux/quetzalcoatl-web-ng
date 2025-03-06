import { Component, OnInit } from '@angular/core';
import { SubsidiaryColumn } from '../../Models/dto/subsidiary.dto';
import { SubsidiariesService } from '../../Services/subsidiaries.service';
import { Subsidiary } from '../../Models/subsidiary.model';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.view.html',
  styleUrl: './subsidiaries.view.css'
})
export class SubsidiariesView implements OnInit {
  columnsName = SubsidiaryColumn;
  subsidiaries: Subsidiary[] | undefined;
  
  constructor(private subsidiaryService: SubsidiariesService) {}

  ngOnInit() {
    this.subsidiaryService.getData().subscribe((data: any) => {
      this.subsidiaries = data;
    });
  }
}
