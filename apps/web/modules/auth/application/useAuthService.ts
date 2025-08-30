import { AuthService } from './AuthService';
import { useDependencyContainer } from '../../shared/presentation/dependency-container';
import { DI } from '../types';

export const useAuthService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.AuthService) as AuthService;
};
