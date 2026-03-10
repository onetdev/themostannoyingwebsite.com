import type { Result } from '@maw/utils/result';
import type authEnLocale from './i18n/en';

import type { AuthError, User } from './schemas';

export const DI = {
  AuthService: Symbol.for('AuthService'),
  AuthRepository: Symbol.for('AuthRepository'),
};

export type AuthI18nShape = typeof authEnLocale;

export type AuthenticationData = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginUseCaseParams = AuthenticationData;

export type CreateUserData = Omit<User, 'id'> & {
  password: string;
  passwordConfirmation: string;
};

export type RegisterUseCaseParams = CreateUserData;

export type PasswordReminderData = {
  email: string;
};

export type PasswordReminderUseCaseParams = PasswordReminderData & {
  captcha: string;
};

export interface AuthRepository {
  authenticate(data: AuthenticationData): Promise<Result<User, AuthError>>;
  createUser(user: CreateUserData): Promise<Result<User, AuthError>>;
  passwordReminder(
    data: PasswordReminderData,
  ): Promise<Result<void, AuthError>>;
}

export interface AuthService {
  login(data: LoginUseCaseParams): Promise<Result<User, AuthError>>;
  passwordReminder(
    data: PasswordReminderUseCaseParams,
  ): Promise<Result<void, AuthError>>;
  register(data: RegisterUseCaseParams): Promise<Result<User, AuthError>>;
}
