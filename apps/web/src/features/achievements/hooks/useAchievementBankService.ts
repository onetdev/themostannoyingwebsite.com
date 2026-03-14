'use client';

import { useDiContext } from '@/core/react';
import type { AchievementBankService } from '../services';
import { DI } from '../types';

export const useAchievementBankService = () => {
  const { container } = useDiContext();
  return container.get<AchievementBankService>(DI.AchievementBankService);
};
