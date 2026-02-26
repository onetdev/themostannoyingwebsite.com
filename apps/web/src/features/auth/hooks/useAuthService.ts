import { useDependencyContainer } from '@/contexts/DependencyContainer';
import type { AuthService } from '../services/AuthService';
import { DI } from '../types';

export const useAuthService = () => {
  const { container } = useDependencyContainer();
  return container.get<AuthService>(DI.AuthService);
};
