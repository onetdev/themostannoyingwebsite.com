import { Country } from '../entities/country';

export interface CountryRepository {
  findAll: () => Promise<Country[]>;
}
