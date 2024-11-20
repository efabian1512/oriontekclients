import { DynamicConfig } from "../models/types";

export const CLIENT_ADDRESSES_FORM_CONFIG: DynamicConfig = { 
    mainTitle: 'Add Address',
    buttons: {cancelLabel: 'Cancel', proceedLabel: 'Add'}, 
    controls: [
    {
      controlName: 'addressLine1', controlType: 'textbox',
      inputType: 'text', validators: [{name: 'required', errorMessage: 'This field is required.'}], label: 'Address Line 1',
    },
    {
      controlName: 'addressLine2', controlType: 'textbox',
      inputType: 'text',  label: 'Address Line 2',
    },
    {
      controlName: 'country', inputType: 'text', controlType: 'select', validators: [{name: 'required', errorMessage: 'Country is required.'}], label: 'Country',
      optionsFromBackend: true, optionsApiUrl: 'https://restcountries.com/v3.1/all?fields=name,fifa'
    },
    {
      controlName: 'city', inputType: 'text', controlType: 'textbox', validators: [{name: 'required', errorMessage: 'The City is required.'}], label: 'City',
    },
    {
      controlName: 'state', controlType: 'textbox',
      inputType: 'text', validators: [{name: 'required', errorMessage: 'The State is required.'}], label: 'State',
    },
      {
      controlName: 'postalCode', controlType: 'textbox',
      inputType: 'text', validators: [{name: 'required', errorMessage: 'The postal code is required.'}], label: 'Postal Code',
    }
]
};
 
