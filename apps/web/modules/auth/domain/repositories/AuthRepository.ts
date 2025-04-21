import { RegisterUserType } from '../entities/RegisterUser';
import { UserType } from '../entities/User';

export interface AuthRepository {
  login(data: { email: string; password: string }): Promise<UserType>;
  register(user: RegisterUserType): Promise<UserType>;
  passwordReminder(data: { email: string }): Promise<void>;
}
