import { injectable } from 'inversify';

import { CountryRepository } from './types';

import { countryList } from '@/core/infrastructure/data/countries';
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
