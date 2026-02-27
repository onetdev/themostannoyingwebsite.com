import { useDependencyContainer } from '@/contexts/DependencyContainer';
import { DI } from '@/types';
import type { AppService } from '../services/AppService';

export const useAppService = () => {
  const { container } = useDependencyContainer();
  return container.get<AppService>(DI.KernelService);
};
