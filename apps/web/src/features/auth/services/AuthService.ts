import type { PromiseResult } from '@maw/utils/result';
import { inject, injectable } from 'inversify';
import type { AuthError, User } from '../schemas';
import {
  type AuthRepository,
  DI,
  type AuthService as IAuthService,
  type LoginUseCaseParams,
  type PasswordReminderUseCaseParams,
  type RegisterUseCaseParams,
} from '../types';
import {
  login as loginUseCase,
  passwordReminder as passwordReminderUseCase,
  register as registerUseCase,
} from './use-cases';

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
