import 'reflect-metadata';
import { countryList } from './data/countries';
import { StaticCountryRepository } from './StaticCountryRepository';

describe('StaticCountryRepository', () => {
  let repository: StaticCountryRepository;

  beforeEach(() => {
    repository = new StaticCountryRepository();
  });

  it('should return all countries', async () => {
    const countries = await repository.findAll();
    expect(countries).toEqual(countryList);
  });
});
