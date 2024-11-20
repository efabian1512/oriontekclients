import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Client, ClientTableColumn, ClientAddress } from '../../models/types';
import { AppState } from '../../states/app.state';
import { TableModalComponent } from '../../table-modal/table-modal.component';
import { ClientState } from '../client-state-management/client.reducer';
import { selectClientsState } from '../client-state-management/client.selector';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModalComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  constructor(private store: Store<AppState>, ){}

tableColumns: ClientTableColumn[]= [{title:'Name', value: 'name'},{title:'Telephone', value: 'phone'},{title: 'Email', value: 'email' }, {title: 'Address Info', value: 'addressInfo' }];

clients$!: Observable<ClientState>;
filteredClients: Client[]=[];
allClients: Client[] = [];
client: Client | undefined;

isModalOpen: boolean = false;
addressCatalogData: ClientAddress[] = [];


ngOnInit(): void {
 this.getAllClients();
}

 private getAllClients(){
    this.clients$ = this.store.select(selectClientsState);
   this.clients$.subscribe((clientsState: ClientState) => this.filteredClients = this.allClients = clientsState.clients)
}

filter(query: string | undefined){
    this.filteredClients = (query) ?
     this.filteredClients = this.filteredClients.filter((client: Client)=> client.name.toLowerCase().includes(query?.toLowerCase())||
     client.telephone.toLowerCase().includes(query?.toLowerCase()) || client.email.toLowerCase().includes(query?.toLowerCase()))  :
     this.allClients;
  }

  openAddressModal(clientId: string | undefined) {
    this.addressCatalogData = [];
    this.client = undefined;

    const client = this.filteredClients.find(client => client.id === clientId);
    if(client) {
      this.client = client;
      this.addressCatalogData = client.addressesInfo;
    }

     this.isModalOpen = true;
  }

  closeModal(value: boolean) {
    this.isModalOpen = value;
  }

}