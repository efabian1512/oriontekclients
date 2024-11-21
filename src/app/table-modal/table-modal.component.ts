import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../models/types';
import { CLIENT_ADDRESSES_TABLE_CONFIG, TableConfig } from '../table/table-configs';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-table-modal',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './table-modal.component.html',
  styleUrl: './table-modal.component.css'
})
export class TableModalComponent {

  tableConfig: TableConfig = CLIENT_ADDRESSES_TABLE_CONFIG;

  @Input() data: any = [];
  @Input() isModalOpen!: boolean;
  @Input() client: Client | undefined;

  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>(false);


  onClose() {
    this.toggleModal.emit(false);
  }
}
