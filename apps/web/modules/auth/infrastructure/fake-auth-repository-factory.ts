import { injectable } from 'inversify';

import { createErrorResult, PromiseResult } from '../../shared';
import { AuthError, AuthRepository, User } from '../domain';

@injectable()
export class FakeAuthRepositoryFactory implements AuthRepository {
  private fakeResponse = <T>(
    message: string,
    code: AuthError,
  ): PromiseResult<T, AuthError> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          createErrorResult({
            message,
            code,
          }),
        );
      }, 2000);
    });

  async authenticate() {
    return this.fakeResponse<User>('Authentication failed', 'UNKNOWN_ERROR');
  }

  async createUser() {
    return this.fakeResponse<User>('User creation failed', 'UNKNOWN_ERROR');
  }

  async passwordReminder() {
    return this.fakeResponse<void>('Password reminder failed', 'UNKNOWN_ERROR');
  }
}
