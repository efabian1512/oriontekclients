import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { TableColumnConfig, TableConfig } from './table-configs';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() data: {[key: string]: string}[] | {[key: string]: string}[]  = [];
  @Input() actionControls?: boolean;

  @Input() tableConfig!: TableConfig;

  @Output() openModalOnEdition: EventEmitter<any> = new EventEmitter<any>();
  @Output() onElementDelete: EventEmitter<any> = new EventEmitter<any>();

  isDeleteModalOpen: boolean = false;

  elementId: string = '';

  openFormModalOnEdition(addressId: string) {
    this.openModalOnEdition.emit({openModal: true, addressId, tableData: this.data});
  }

  onDelete(elementId: string) {
    this.elementId = elementId;
    this.isDeleteModalOpen = true;
  }

  onConfirmDeletion(value: boolean) {
    if(value) {
      const data = this.data.filter((element: any)=> element[this.tableConfig.actionsProperty!] !== this.elementId);

      this.onElementDelete.emit(data);
    } 
      this.isDeleteModalOpen = false;
  }
}
