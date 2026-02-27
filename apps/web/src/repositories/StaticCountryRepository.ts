import { injectable } from 'inversify';
import type { Country } from '@/schemas/country';
import { countryList } from './data/countries';
import type { CountryRepository } from './types';

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
