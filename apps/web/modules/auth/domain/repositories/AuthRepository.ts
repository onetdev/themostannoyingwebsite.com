import { User } from '../entities/User';
import { AuthError } from '../errors';

import { PromiseResult } from '@/root/modules/kernel';

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
