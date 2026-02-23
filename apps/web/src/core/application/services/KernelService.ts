import { inject } from 'inversify';

import { DI } from '../../types';

import { type CountryRepository } from '@/repositories';

export class KernelService {
  @inject(DI.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }
}
