import { AuthService } from '../services/AuthService';
import { DI } from '../types';

import { useDependencyContainer } from '@/contexts/DependencyContainer';

export const useAuthService = () => {
  const { container } = useDependencyContainer();
  return container.get<AuthService>(DI.AuthService);
};
