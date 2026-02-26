'use client';

import { useCallback } from 'react';
import { useEventBus, useEventBusListener } from '@/contexts/EventBusContext';
import { useAchievementsStore } from '@/stores';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { getAchievementById } from './data/registry';

export const AchievementManager = () => {
  const {
    setAchievementProgress,
    incrementAchievementProgress,
    completeAchievement,
  } = useAchievementsStore();
  const { dispatch } = useEventBus();

  const handleUnlock = useCallback(
    (achievementId: string, newlyAchieved: boolean) => {
      if (newlyAchieved) {
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
      }
    },
    [dispatch],
  );

  // Generic achievement trigger
  useEventBusListener('ACHIEVEMENT_TRIGGERED', (event) => {
    const { achievementId, progress, increment } = event.payload || {};
    if (!achievementId) return;

    const definition = getAchievementById(achievementId);
    if (!definition) return;

    if (definition.type === 'progression') {
      const target = definition.targetProgress || 1;
      if (typeof increment === 'number') {
        const newlyAchieved = incrementAchievementProgress(
          achievementId,
          increment,
          target,
        );
        handleUnlock(achievementId, newlyAchieved);
      } else if (typeof progress === 'number') {
        const newlyAchieved = setAchievementProgress(
          achievementId,
          progress,
          target,
        );
        handleUnlock(achievementId, newlyAchieved);
      }
    } else {
      const newlyAchieved = completeAchievement(achievementId);
      handleUnlock(achievementId, newlyAchieved);
    }
  });

  // Specific achievement triggers
  useEventBusListener('SUBSCRIPTION_PACKAGE_SELECTED', () => {
    const newlyAchieved = completeAchievement('first-package-selection');
    handleUnlock('first-package-selection', newlyAchieved);
  });

  useEventBusListener('SEARCH', () => {
    const newlyAchieved = completeAchievement('first-search');
    handleUnlock('first-search', newlyAchieved);
  });

  return <AchievementToastManager />;
};
