import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-g-add',
  templateUrl: './g-add.button.html',
})
export class GAddButtonComponent {
  @Input() url = '';
    @Input() name = '';
}
