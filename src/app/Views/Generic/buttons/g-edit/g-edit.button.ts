import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-g-edit',
  templateUrl: './g-edit.button.html',
  styleUrl: './g-edit.button.css'
})
export class GEditButtonComponent implements OnInit {
  @Input() url = '';
  @Input() id = 0;

  ngOnInit(): void {
    console.log(this.url + this.id);
  }
}
