import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableColumnConfig } from './table-configs';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() data: {[key: string]: string}[] | {[key: string]: string | Date}[]  = [];

  @Input() tableConfig: TableColumnConfig[] = [];

}
