import { injectable } from 'inversify';
import { getAllCountries } from './use-cases/get-all-countries';

@injectable()
export class AppService {
  async getAllCountries() {
    return getAllCountries();
  }
}
