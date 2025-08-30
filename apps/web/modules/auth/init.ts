import { Container } from 'inversify';

import { AuthService } from './application/AuthService';
import { FakeAuthRepositoryFactory } from './infrastructure';
import { DI } from './types';

export const init = (di: Container) => {
  di.bind(DI.AuthRepository).to(FakeAuthRepositoryFactory).inSingletonScope();
  di.bind(DI.AuthService).to(AuthService).inSingletonScope();
};
