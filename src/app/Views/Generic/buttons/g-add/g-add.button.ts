import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-g-add',
  templateUrl: './g-add.button.html',
  styleUrl: './g-add.button.css'
})
export class GAddButton {
  @Input() url = '';
    @Input() name = '';
}
