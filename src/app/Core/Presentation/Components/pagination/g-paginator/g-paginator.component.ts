import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-g-paginator',
  templateUrl: './g-paginator.component.html',
  styleUrl: './g-paginator.component.css'
})
export class GPaginatorComponent {
  @Output() page = 1;
  @Output() pageSize = 10;

  @Output() totalSize = 100;
  @Output() totalPage: number = this.totalSize / this.pageSize;

  nextpage() {
    if (this.page < this.totalPage) this.page ++;

    console.log(this.page);
  }

  navto(page: number){
    if(page >= 1 && page <= this.totalPage) this.page = page;
  }

  navtolast(){
    if(this.totalPage > 0) this.page = this.totalPage;
  }

  navtofirst(){
    this.page = 1;
  }

  prevpage() {
    if (this.page > 1) this.page --;
    console.log(this.page);
  }

  getPages(totalPage: number): number[] {
    return Array.from({ length: totalPage }, (_, i) => i++);
  }
  
}
