import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppError } from '../../commons/app-error';
import { BadInput } from '../../commons/bad-input';
import { FormModalComponent } from '../../form-modal/form-modal.component';
import { CLIENT_ADDRESSES_FORM_CONFIG } from '../../form/form-configs';
import { ClientAddress, DynamicConfig } from '../../models/types';
import { CLIENT_ADDRESSES_TABLE_CONFIG, TableConfig } from '../../table/table-configs';
import { TableComponent } from '../../table/table.component';
import { AddressService } from './address-service/address.service';

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
  tableConfig: TableConfig = CLIENT_ADDRESSES_TABLE_CONFIG;
  data: any = [];

  isUpdatingInput: boolean = false;

  countriesSubscription!: Subscription;

  form = new FormGroup({
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    addressId: new FormControl('')
  });

  @Input() addressInfoData?: any;
  @Output() addressData: EventEmitter<ClientAddress[]> = new EventEmitter<ClientAddress[]>();

  constructor(private addressService: AddressService){}

  ngOnInit() {
    if(this.addressInfoData) {
      this.data = this.addressInfoData;
    }
    this.getCountries();
  }

  toggleModal(value: boolean){
    this.isUpdatingInput = false;
    this.isModalOpen = value;
  }

  getCountries() {
    this.countriesSubscription = this.addressService.getCountries().subscribe((countries: any) => {
      const countriesformatted = this.addressService.setCountryFirst(countries?.sort(this.addressService.sortCountries)!);
      const countryControl = this.modalFormConfig.controls.find(control => control.controlName === 'country');
      countryControl!.selectOptions = countriesformatted.map((country: any) => ({value: country.fifa , label: country.name.common}));
  }, (error: AppError) =>{
      if(error instanceof BadInput){
        this.form.setErrors(error.originalError);
      }
      else throw error;
    })!;
  }

  onSubmit(formValue: any) {

    if(formValue.addressId) {
      this.data = this.data.map((address: ClientAddress) => address.addressId === formValue.addressId? {...formValue, addressLine1: `${formValue.addressLine1}, ${formValue.addressLine2}`} : address);
    } else {
      this.data = [...this.data,{ ...formValue, addressLine1: `${formValue.addressLine1}, ${formValue.addressLine2}`, addressId: this.generateId()}];
    }
    
    this.isModalOpen = false;
    this.form.reset();
    this.addressData.emit(this.data);
  }

  openFormModalOnEdition(info: any) {

    const addressToEdit = info.tableData.find((addressInfo: ClientAddress) => addressInfo.addressId === info.addressId);

    if(addressToEdit) {
      this.form.get('addressLine1')?.setValue(this.extractAddressLine1(addressToEdit.addressLine1, addressToEdit.addressLine2));
      this.form.get('addressLine2')?.setValue(addressToEdit.addressLine2);
      this.form.get('country')?.setValue(addressToEdit.country);
      this.form.get('city')?.setValue(addressToEdit.city);
      this.form.get('state')?.setValue(addressToEdit.state);
      this.form.get('state')?.setValue(addressToEdit.state);
      this.form.get('state')?.setValue(addressToEdit.state);
      this.form.get('postalCode')?.setValue(addressToEdit.postalCode);
      this.form.get('addressId')?.setValue(addressToEdit.addressId);
    }

    this.isUpdatingInput = true;
    this.addressData.emit(info.tableData);
    this.isModalOpen = true;
  }

   generateId() {
     return Math.floor(Math.random() * 1000).toString();
   }

   extractAddressLine1(addressLine1: string, addressLine2: string) {
      const addressLine2Index = addressLine1.indexOf(addressLine2);
      return addressLine1.slice(0, addressLine2Index-2);
   }

   onDeleteAddress(addressData: any) {
    this.data = addressData;
    this.addressData.emit(this.data);
   }

  ngOnDestroy() {
    this.countriesSubscription?.unsubscribe();
  }
}
