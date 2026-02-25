import { inject } from 'inversify';

import { type CountryRepository } from '@/repositories';
import { DI } from '@/types';

export class AppService {
  @inject(DI.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }
}
