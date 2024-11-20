import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { FormModalComponent } from '../../form-modal/form-modal.component';
import { CLIENT_ADDRESSES_FORM_CONFIG } from '../../form/form-configs';
import { DynamicConfig, ClientAddress } from '../../models/types';
import { CLIENT_ADDRESSES_TABLE_CONFIG, TableColumnConfig } from '../../table/table-configs';
import { TableComponent } from '../../table/table.component';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { AddressService } from './address-service/address.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-client-address',
  standalone: true,
  imports: [FormModalComponent, TableComponent, CommonModule, FormsModule],
  templateUrl: './client-address.component.html',
  styleUrl: './client-address.component.css'
})
export class ClientAddressComponent implements OnInit, OnDestroy {
  isModalOpen: boolean = false;
  modalFormConfig: DynamicConfig = CLIENT_ADDRESSES_FORM_CONFIG;
  tableConfig: TableColumnConfig[] = CLIENT_ADDRESSES_TABLE_CONFIG;
  data: any = [];

  countriesSubscription!: Subscription;

  form = new FormGroup({
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
  });

  @Output() addressData: EventEmitter<ClientAddress[]> = new EventEmitter<ClientAddress[]>();

  constructor(private addressService: AddressService){}

  ngOnInit() {
    this.getCountries();
  }

  toggleModal(value: boolean){
    this.isModalOpen = value;
  }

  getCountries() {
    this.countriesSubscription = this.addressService.getCountries().subscribe((countries: any) => {
      const countriesformatted = this.addressService.setCountryFirst(countries?.sort(this.addressService.sortCountries)!);
      const countryControl = this.modalFormConfig.controls.find(control => control.controlName === 'country');
      countryControl!.selectOptions = countriesformatted.map((country: any) => ({value: country.fifa , label: country.name.common}));
  })!;
  }

  onSubmit(formValue: any) {
    this.data = [...this.data,{ ...formValue, addressLine1: `${formValue.addressLine1}, ${formValue.addressLine2}` }];
    this.isModalOpen = false;
    this.form.reset();
    this.addressData.emit(this.data);
  }

  ngOnDestroy() {
    this.countriesSubscription?.unsubscribe();
  }
}
