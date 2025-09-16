import { injectable } from 'inversify';

import { Country, CountryRepository } from '../domain';
import { countryList } from './data/countries';

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
