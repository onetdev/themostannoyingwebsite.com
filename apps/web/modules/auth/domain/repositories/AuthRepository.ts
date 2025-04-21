import { UserType } from '../entities/User';
import { UserCreationType } from '../entities/UserCreation';

export interface AuthRepository {
  login(data: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: UserType }>;
  register(
    user: UserCreationType,
  ): Promise<{ success: boolean; user?: UserType }>;
  passwordReminder(data: { email: string }): Promise<void>;
}
