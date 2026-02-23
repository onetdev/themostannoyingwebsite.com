import { injectable } from 'inversify';

import { countryList } from './data/countries';
import { CountryRepository } from './types';

import { Country } from '@/schemas/country';

@injectable()
export class StaticCountryRepository implements CountryRepository {
  private countries: Country[];

  constructor() {
    this.countries = countryList;
  }

  async findAll(): Promise<Country[]> {
    return this.countries;
  }
}
