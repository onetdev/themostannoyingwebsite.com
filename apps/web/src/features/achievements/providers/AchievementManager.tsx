'use client';

import { useCallback } from 'react';
import {
  type EventBusListener,
  type EventPayload,
  useEventBus,
  useEventBusListener,
} from '@/contexts/EventBusContext';
import { useAchievementsStore, usePainPreferencesStore } from '@/stores';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { getAchievementById } from './data/registry';

/**
 * Custom hook to listen to events specifically for achievements.
 * It automatically checks if achievements are enabled and provides
 * a stale-free listener environment.
 */
function useAchievementListener<T = EventPayload>(
  type: string,
  listener: EventBusListener<T>,
) {
  const painPreferences = usePainPreferencesStore();

  const wrappedListener: EventBusListener<T> = useCallback(
    (event) => {
      if (!painPreferences.flags.achievements) return;
      listener(event);
    },
    [listener, painPreferences.flags.achievements],
  );

  useEventBusListener(type, wrappedListener);
}

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
  useAchievementListener('ACHIEVEMENT_TRIGGERED', (event) => {
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
  useAchievementListener('SUBSCRIPTION_PACKAGE_SELECTED', () => {
    const newlyAchieved = completeAchievement('first-package-selection');
    handleUnlock('first-package-selection', newlyAchieved);
  });

  useAchievementListener('SEARCH', () => {
    const newlyAchieved = completeAchievement('first-search');
    handleUnlock('first-search', newlyAchieved);
  });

  return <AchievementToastManager />;
};
