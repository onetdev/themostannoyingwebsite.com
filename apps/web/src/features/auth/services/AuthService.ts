import { PromiseResult } from '@maw/utils/result';
import { inject, injectable } from 'inversify';

import {
  login as loginUseCase,
  passwordReminder as passwordReminderUseCase,
  register as registerUseCase,
} from './use-cases';
import { AuthError, User } from '../schemas';
import {
  type AuthRepository,
  DI,
  type AuthService as IAuthService,
  LoginUseCaseParams,
  PasswordReminderUseCaseParams,
  RegisterUseCaseParams,
} from '../types';

@injectable()
export class AuthService implements IAuthService {
  @inject(DI.AuthRepository)
  private authRepo!: AuthRepository;

  login(data: LoginUseCaseParams): PromiseResult<User, AuthError> {
    return loginUseCase(this.authRepo, data);
  }

  passwordReminder(
    data: PasswordReminderUseCaseParams,
  ): PromiseResult<void, AuthError> {
    return passwordReminderUseCase(this.authRepo, data);
  }

  register(data: RegisterUseCaseParams): PromiseResult<User, AuthError> {
    return registerUseCase(this.authRepo, data);
  }
}
