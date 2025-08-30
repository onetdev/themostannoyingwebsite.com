import { Country, CountryRepository } from '../domain';
import countryList from './static/countries.json';

export class StaticCountryRepository implements CountryRepository {
  private countries: Country[];

  constructor() {
    this.countries = countryList;
  }

  async findAll(): Promise<Country[]> {
    return this.countries;
  }
}
