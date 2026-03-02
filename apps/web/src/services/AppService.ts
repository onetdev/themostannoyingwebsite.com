import { inject } from 'inversify';
import { Symbols } from '@/core/di/symbols';
import type { CountryRepository } from '@/repositories';

export class AppService {
  @inject(Symbols.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }
}
