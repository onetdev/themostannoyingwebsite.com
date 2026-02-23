import { createErrorResult, PromiseResult } from '@maw/utils/result';
import { injectable } from 'inversify';

import { AuthError, AuthRepository, User } from '../domain';

/**
 * Fake implementation of the AuthRepository interface for testing purposes.
 * IMPORTANT: This repository never intended to be working.
 */
@injectable()
export class FakeAuthRepository implements AuthRepository {
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
