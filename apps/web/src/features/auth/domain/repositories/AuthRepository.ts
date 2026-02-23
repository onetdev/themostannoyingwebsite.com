import { User } from '../entities';
import { AuthError } from '../errors';

import { PromiseResult } from '@/core';

export type AuthenticationData = {
  email: string;
  password: string;
  remember: boolean;
};

export type CreateUserData = Omit<User, 'id'> & {
  password: string;
  passwordConfirmation: string;
};

export type PasswordReminderData = {
  email: string;
};

export interface AuthRepository {
  authenticate(data: AuthenticationData): PromiseResult<User, AuthError>;
  createUser(user: CreateUserData): PromiseResult<User, AuthError>;
  passwordReminder(data: PasswordReminderData): PromiseResult<void, AuthError>;
}
