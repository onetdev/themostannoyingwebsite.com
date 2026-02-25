import { AppService } from '../services/AppService';

import { useDependencyContainer } from '@/contexts/DependencyContainer';
import { DI } from '@/types';

export const useAppService = () => {
  const { container } = useDependencyContainer();
  return container.get<AppService>(DI.KernelService);
};
