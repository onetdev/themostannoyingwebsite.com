import { Container } from 'inversify';

import { AuthService } from './application';
import { FakeAuthRepository } from './infrastructure';
import { DI } from './types';

export const init = (di: Container) => {
  di.bind(DI.AuthRepository).to(FakeAuthRepository).inSingletonScope();
  di.bind(DI.AuthService).to(AuthService).inSingletonScope();
};
