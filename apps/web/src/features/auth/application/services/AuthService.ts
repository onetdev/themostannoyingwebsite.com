import { PromiseResult } from '@maw/utils/result';
import { inject, injectable } from 'inversify';

import { AuthError, type AuthRepository, User } from '../../domain';
import { DI } from '../../types';
import {
  login as loginUseCase,
  LoginUseCaseParams,
  passwordReminder as passwordReminderUseCase,
  PasswordReminderUseCaseParams,
  register as registerUseCase,
  RegisterUseCaseParams,
} from '../use-cases';

@injectable()
export class AuthService {
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
