import { RegisterUserType } from '../entities/RegisterUser';
import { UserType } from '../entities/User';

export interface AuthRepository {
  login(data: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: UserType }>;
  register(
    user: RegisterUserType,
  ): Promise<{ success: boolean; user?: UserType }>;
  passwordReminder(data: { email: string }): Promise<void>;
}
