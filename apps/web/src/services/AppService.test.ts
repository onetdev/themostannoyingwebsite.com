import 'reflect-metadata';
import { Container } from 'inversify';
import type { CountryRepository } from '@/repositories';
import { DI } from '@/types';
import { AppService } from './AppService';

describe('AppService', () => {
  let container: Container;
  let appService: AppService;
  let mockCountryRepository: jest.Mocked<CountryRepository>;

  beforeEach(() => {
    container = new Container();
    mockCountryRepository = {
      findAll: jest.fn(),
    };
    container
      .bind<CountryRepository>(DI.CountryRepository)
      .toConstantValue(mockCountryRepository);
    container.bind<AppService>(AppService).toSelf();
    appService = container.get<AppService>(AppService);
  });

  it('should get all countries', async () => {
    const mockCountries = [{ name: 'Test Country', code: 'TC' }];
    mockCountryRepository.findAll.mockResolvedValue(mockCountries as any);

    const countries = await appService.getAllCountries();
    expect(countries).toEqual(mockCountries);
    expect(mockCountryRepository.findAll).toHaveBeenCalled();
  });
});
