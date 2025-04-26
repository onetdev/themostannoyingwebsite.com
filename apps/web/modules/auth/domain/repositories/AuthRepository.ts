import { UserType } from '../entities/User';
import { UserCreationType } from '../entities/UserCreation';
import { AuthErrorType } from '../value-object/AuthError';

export interface BaseAuthMethodResponse {
  errorCode?: AuthErrorType;
  success: boolean;
}

export interface AuthRepository {
  login(data: {
    email: string;
    password: string;
  }): Promise<BaseAuthMethodResponse & { user?: UserType }>;
  register(
    user: UserCreationType,
  ): Promise<BaseAuthMethodResponse & { user?: UserType }>;
  passwordReminder(data: { email: string }): Promise<void>;
}
