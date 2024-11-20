import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {

   @Input() isModalOpen!: boolean;

   @Output() confirmationResponse: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  onSubmit() {
    this.confirmationResponse.emit(true);
  }

  onClose() {
    this.confirmationResponse.emit(false);
  }
}
