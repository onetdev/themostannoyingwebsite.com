import { AuthService } from './AuthService';
import { DI } from '../../types';

import { useDependencyContainer } from '@/providers/DependencyContainer';

export const useAuthService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.AuthService) as AuthService;
};
