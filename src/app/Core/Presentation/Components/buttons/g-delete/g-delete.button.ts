import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-g-delete',
  templateUrl: './g-delete.button.html',
})
export class GDeleteButtonComponent {
  @Input() id = -1; 
  @Output() confirmDeletion: EventEmitter<void> = new EventEmitter<void>(); // Emite cuando se confirma la eliminación

  // Abre el modal (muestra el modal)
  openModal() {
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.remove('hidden'); // Muestra el modal
    }
  }

  // Cierra el modal
  closeModal() {
    const modal = document.getElementById('popup-modal');
    if (modal) {
      modal.classList.add('hidden'); // Esconde el modal
    }
  }

  // Confirma la eliminación y emite el evento
  onConfirm() {
    this.confirmDeletion.emit(); // Emite el evento de confirmación
    this.closeModal(); // Cierra el modal después de la confirmación
  }

  // Cancela la eliminación y cierra el modal
  onCancel() {
    this.closeModal(); // Cierra el modal sin realizar acción
  }
}