import { countryList } from './data/country-list';

export interface Country {
  code: string;
  name: string;
  localName: string;
  phone: string;
}

export function getAllCountries() {
  return countryList;
}
