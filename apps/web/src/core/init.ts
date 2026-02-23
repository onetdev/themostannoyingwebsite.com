import { Container } from 'inversify';

import { StaticCountryRepository } from '@/repositories';
import { KernelService } from '@/services';
import { DI } from '@/types';

export const init = (di: Container) => {
  di.bind(DI.CountryRepository).to(StaticCountryRepository).inSingletonScope();
  di.bind(DI.KernelService).to(KernelService).inSingletonScope();
};
