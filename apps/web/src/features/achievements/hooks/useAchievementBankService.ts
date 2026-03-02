import { useDiContext } from '@/core/di/react-di';
import type { AchievementBankService } from '../services';
import { DI } from '../types';

export const useAchievementBankService = () => {
  const { container } = useDiContext();
  return container.get<AchievementBankService>(DI.AchievementBankService);
};
