import { type Container, injectable } from 'inversify';

import {
  type AchievementDefinition,
  DI,
  type AchievementBankService as IAchievementBankService,
} from '../types';
import * as useCases from './use-cases';

@injectable()
export class AchievementBankService implements IAchievementBankService {
  getAchievements(): AchievementDefinition[] {
    return useCases.getAchievementsRegistry();
  }

  getAchievementById(id: string): AchievementDefinition | undefined {
    return useCases.getAchievementsRegistry().find((a) => a.id === id);
  }
}

export function getAchievementBankService(container: Container) {
  return container.get<IAchievementBankService>(DI.AchievementBankService);
}
