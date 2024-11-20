import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientTableColumn, ClientAddress } from '../models/types';
import {take} from 'rxjs/operators';
import { BadInput } from '../commons/bad-input';
import { AppError } from '../commons/app-error';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { addClient, updateClient } from './client-state-management/client.action';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { ClientAddressComponent } from './client-address/client-address.component';
import { selectClientsState } from './client-state-management/client.selector';
import { Observable } from 'rxjs';
import { ClientState } from './client-state-management/client.reducer';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ClientAddressComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  client!: Client;
  id: string | null | undefined;
  clients$!: Observable<ClientState>;

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    telephone: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
  });
  addressData: ClientAddress[] = [];

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id) {
      this.getClient();
    }
  }

  
  save(client: any){

    if(this.id) {
      this.store.dispatch(updateClient({payload: {client: {...client, id: this.id, addressesInfo: [...this.addressData]}, idToUpdate: this.id}}));
    } else {
        this.store.dispatch(addClient({payload: {...client, id: this.generateId(), addressesInfo: [...this.addressData]}}));
    }
     this.router.navigate(['/']);
   }


   generateId() {
     return Math.floor(Math.random() * 1000).toString();
   }

   getAddesssData(addressData: any) {
    this.addressData = [...addressData];
   }

   getClient() {
     this.clients$ = this.store.select(selectClientsState);

     this.clients$.subscribe((clientState: ClientState) => {
      const client = clientState.clients.find((client: Client) => client.id === this.id);
      if(client) {
         this.name?.setValue(client.name);
          this.telephone?.setValue(client.telephone);
          this.email?.setValue(client.email); 
          this.addressData = [...client.addressesInfo];
      }
     });
   }

   delete() {

   }

   onCancel() {
     this.router.navigate(['/']);
   }
  

  get name (){
    return this.form.get('name');
  }

  get telephone(){
    return this.form.get('telephone');
  }

  get email(){
    return this.form.get('email');
  }
}
