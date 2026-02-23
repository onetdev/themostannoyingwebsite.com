import { KernelService } from './KernelService';

import { useDependencyContainer } from '@/providers/DependencyContainer';
import { DI } from '@/types';

export const useKernelService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.KernelService) as KernelService;
};
