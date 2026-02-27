import { useDependencyContainer } from '@/contexts/DependencyContainer';
import type { AchievementBankService } from '../services';
import { DI } from '../types';

export const useAchievementBankService = () => {
  const { container } = useDependencyContainer();
  return container.get<AchievementBankService>(DI.AchievementBankService);
};
