
export interface TableConfig {
  tableSetup: TableColumnConfig[];
  actionsProperty?: string;
}

export interface TableColumnConfig {
     columnName: string;
     property: string;
 }

export const CLIENT_ADDRESSES_TABLE_CONFIG: TableConfig  =  {
  tableSetup: [
    {columnName: 'Address' , property: 'addressLine1' },
    {columnName: 'State' , property: 'state' },
    {columnName: 'City' , property: 'city' },
    {columnName: 'Postal Code' , property: 'postalCode' },
    {columnName: 'Country' , property: 'country' },
  ],
  actionsProperty: 'addressId'
}

export const CLIENT_ADDRESSES_CATALOG_TABLE_CONFIG: TableConfig  =  {
  tableSetup: [
    {columnName: 'Address' , property: 'addressLine1' },
    {columnName: 'State' , property: 'state' },
    {columnName: 'City' , property: 'city' },
    {columnName: 'Postal Code' , property: 'postalCode' },
    {columnName: 'Country' , property: 'country' },
  ]
}
