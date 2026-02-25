import { PromiseResult } from '@maw/utils/result';

import { AuthError, User } from './schemas';

export const DI = {
  AuthService: Symbol.for('AuthService'),
  AuthRepository: Symbol.for('AuthRepository'),
};

export type AuthenticationData = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginUseCaseParams = AuthenticationData & {
  captcha: string;
};

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
  authenticate(data: AuthenticationData): PromiseResult<User, AuthError>;
  createUser(user: CreateUserData): PromiseResult<User, AuthError>;
  passwordReminder(data: PasswordReminderData): PromiseResult<void, AuthError>;
}

export interface AuthService {
  login(data: LoginUseCaseParams): PromiseResult<User, AuthError>;
  passwordReminder(
    data: PasswordReminderUseCaseParams,
  ): PromiseResult<void, AuthError>;
  register(data: RegisterUseCaseParams): PromiseResult<User, AuthError>;
}
