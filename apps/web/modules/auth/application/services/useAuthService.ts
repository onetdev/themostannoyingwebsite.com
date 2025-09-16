import { AuthService } from './AuthService';
import { DI } from '../../types';

import { useDependencyContainer } from '@/kernel';

export const useAuthService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.AuthService) as AuthService;
};
