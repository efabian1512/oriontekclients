import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { FormComponent } from "../form/form.component";
import { DynamicConfig } from "../models/types";


@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormComponent, CommonModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
   @Input() form!: FormGroup;
   @Input() modalFormConfig!:  DynamicConfig;
   @Input() isModalOpen!: boolean;
   @Input() isUpdating?: boolean;

   @Output() toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>(false);
   @Output() formData: EventEmitter<any> = new EventEmitter<any>();


    onSubmit() {
      this.formData.emit(this.form.value);
    }

  onClose() {
    this.form.reset();
    this.toggleModal.emit(false);
  }
}