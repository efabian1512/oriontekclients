export interface ClientTableColumn {
    title: string;
    value: string;
};

export interface Client {
    id: string;
    name: string;
    telephone: string;
    email: string;
    addressesInfo: ClientAddress[];
};

export interface UpdateClientAction {
    client: Client;
    idToUpdate: string;
}

export interface DeleteClientAction {
    clientId: string;
}

export interface ClientAddress {
    addressLine1: string;
    addressLine2?: string;
    city: string;   
    state: string;
    postalCode: string;
    country: string;
    addressId: string;
}

 export interface DynamicFormControl {
      controlName: string;
      controlType: string;
      inputType: string;
      label: string;
      hasFormLevelValidator?: boolean;
      validators?: DynamicConfigValidator[];
      selectOptions?: SelectOption[];
      optionsFromBackend?: boolean;
      optionsApiUrl?: string;
 }

 interface DynamicConfigValidator {
     name: string;
     formLevelValidator?: boolean;
     errorMessage: string;
 }

 interface SelectOption {
    label: string;
    value: string;
 }

 export interface DynamicConfig {
    mainTitle: string;
    buttons: ActionsButtons;
    controls: DynamicFormControl[];
 }

  export interface ActionsButtons {
    cancelLabel: string;
    proceedLabel: string;
    proceedUpdateLabel?: string;
    isUpdating?: IsUpdating;
 }

 export interface Country {
        name: {common: string},
        fifa: string
 }

 interface IsUpdating {
     true: boolean;
     false: boolean;
 }