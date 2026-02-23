import { Container } from 'inversify';

import { KernelService } from './application';
import { DI } from './types';

import { StaticCountryRepository } from '@/repositories';

export const init = (di: Container) => {
  di.bind(DI.CountryRepository).to(StaticCountryRepository).inSingletonScope();
  di.bind(DI.KernelService).to(KernelService).inSingletonScope();
};
