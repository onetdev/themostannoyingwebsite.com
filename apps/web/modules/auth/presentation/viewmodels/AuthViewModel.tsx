import { UserType } from '../../domain';

export interface AuthViewModel {
  user: UserType | null;
  isAuthenticated: boolean;
}
