import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../../../models/types';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

    getCountries() {
      return this.http.get('https://restcountries.com/v3.1/all?fields=name,fifa');
    }

   setCountryFirst = (countries: Country[], countryCode: string = 'USA') => {
            const formattedCountries: Country[] = [];

            countries?.map(country => {
                if(country.fifa === countryCode)
                    formattedCountries.unshift(country);
                else if (country.fifa === 'USA' && countryCode !== 'USA')
                    formattedCountries.splice(1,0,country);
                else 
                    formattedCountries.push(country);
            });

            return formattedCountries;
    }

    sortCountries = (a: Country, b: Country) => {
                if(a.name.common > b.name.common ) return 1;
                if(a.name.common < b.name.common ) return -1;
                return 0;
    }

}
