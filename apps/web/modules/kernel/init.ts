import { Container } from 'inversify';

import { KernelService } from './application';
import { StaticCountryRepository } from './infrastructure';
import { DI } from './types';

export const init = (di: Container) => {
  di.bind(DI.CountryRepository).to(StaticCountryRepository).inSingletonScope();
  di.bind(DI.KernelService).to(KernelService).inSingletonScope();
};
