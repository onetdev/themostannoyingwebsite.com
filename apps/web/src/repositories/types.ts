import type { Country } from '@/schemas/country';

export interface CountryRepository {
  findAll: () => Promise<Country[]>;
}
