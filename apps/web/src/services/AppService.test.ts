import 'reflect-metadata';
import { Container } from 'inversify';
import { AppService } from './AppService';
import { getAllCountries } from './use-cases/get-all-countries';

jest.mock('./use-cases/get-all-countries');

describe('AppService', () => {
  let container: Container;
  let appService: AppService;

  beforeEach(() => {
    jest.clearAllMocks();
    container = new Container();
    container.bind<AppService>(AppService).toSelf();
    appService = container.get<AppService>(AppService);
  });

  it('should get all countries', async () => {
    const mockCountries = [
      {
        name: 'Test Country',
        code: 'TC',
        localName: 'Test Country',
        phone: '+12',
      },
    ];

    (getAllCountries as jest.Mock).mockResolvedValue(mockCountries);

    const countries = await appService.getAllCountries();
    expect(countries).toEqual(mockCountries);
  });
});
