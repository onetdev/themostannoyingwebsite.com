import { DI } from '../../types';
import { useDependencyContainer } from '../providers';
import { KernelService } from './KernelService';

export const useKernelService = () => {
  const container = useDependencyContainer();
  return container.container.get(DI.KernelService) as KernelService;
};
