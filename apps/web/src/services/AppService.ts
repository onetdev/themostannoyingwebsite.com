import { inject } from 'inversify';
import { CoreSymbols } from '@/core/di/symbols';
import type { CountryRepository } from '@/repositories';

export class AppService {
  @inject(CoreSymbols.CountryRepository)
  private countryRepository!: CountryRepository;

  getAllCountries() {
    return this.countryRepository.findAll();
  }
}
