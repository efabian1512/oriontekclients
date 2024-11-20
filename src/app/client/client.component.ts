import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientTableColumn } from '../models/types';
import {take} from 'rxjs/operators';
import { BadInput } from '../commons/bad-input';
import { AppError } from '../commons/app-error';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { addClient } from './client-state-management/client.action';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  client!: Client;
  id!: string;
  addAddress = false;
    form = new FormGroup({
    name: new FormControl('',Validators.required),
    telephone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
  });



  constructor(
    private store: Store<AppState>, 
    private router: Router) { }

  ngOnInit(): void {}

  
  save(client: any){

    this.store.dispatch(addClient({payload: {...client, id: this.generateId()}}));
    this.router.navigate(['/']);
   }


   generateId() {
     return Math.floor(Math.random() * 1000)
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
