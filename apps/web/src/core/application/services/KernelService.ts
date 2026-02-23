import { inject } from 'inversify';

import { type CountryRepository } from '../..';
import { DI } from '../../types';

export class KernelService {
  @inject(DI.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }
}
