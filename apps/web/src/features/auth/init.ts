import { Container } from 'inversify';

import { FakeAuthRepository } from './repositories';
import { AuthService } from './services';
import { DI } from './types';

export const init = (di: Container) => {
  di.bind(DI.AuthRepository).to(FakeAuthRepository).inSingletonScope();
  di.bind(DI.AuthService).to(AuthService).inSingletonScope();
};
