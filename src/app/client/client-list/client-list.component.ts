import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Client, ClientTableColumn } from '../../models/types';
import { AppState } from '../../states/app.state';
import { ClientState } from '../client-state-management/client.reducer';
import { selectClientsState } from '../client-state-management/client.selector';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  constructor(private store: Store<AppState>, ){}

tableColumns: ClientTableColumn[]= [{title:'Name', value: 'name'},{title:'Telephone', value: 'phone'}, {title: 'Address Info', value: 'addressInfo' }];

clients$!: Observable<ClientState>;
filteredClients: Client[]=[];
allClients: Client[] = [];


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

}