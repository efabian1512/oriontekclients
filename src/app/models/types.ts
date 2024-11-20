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

export interface ClientAddress {
    addressLine1: string;
    addressLine2?: string;
    city: string;   
    state: string;
    postalCode: string;
    country: string;
}