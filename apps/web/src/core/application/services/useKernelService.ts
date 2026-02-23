import { KernelService } from './KernelService';
import { DI } from '../../types';

import { useDependencyContainer } from '@/providers/DependencyContainer';

export const useKernelService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.KernelService) as KernelService;
};
