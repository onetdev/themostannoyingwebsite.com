'use client';

import {
  useEventBridge,
  useEventBridgeListener,
} from '@/contexts/EventBridgeContext';
import { useAchievementsStore, usePainPreferencesStore } from '@/stores';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { getAchievementById } from './data/registry';

export const AchievementManager = () => {
  const {
    setAchievementProgress,
    incrementAchievementProgress,
    completeAchievement,
  } = useAchievementsStore();
  const { dispatch } = useEventBridge();
  const painPreferences = usePainPreferencesStore();

  const handleUnlock = (achievementId: string, newlyAchieved: boolean) => {
    if (newlyAchieved) {
      dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
    }
  };

  // This is where we will listen to events and update achievements
  // For now, we'll just have a placeholder for how it will look in phase 2

  // Example listener for a generic event
  useEventBridgeListener('ACHIEVEMENT_TRIGGERED', (event) => {
    // If achievements are disabled in settings, we don't process triggers
    if (!painPreferences.flags.achievements) return;

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

  useEventBridgeListener('SUBSCRIPTION_PACKAGE_SELECTED', () => {
    if (!painPreferences.flags.achievements) return;

    const newlyAchieved = completeAchievement('first-package-selection');
    handleUnlock('first-package-selection', newlyAchieved);
  });

  return <AchievementToastManager />;
};
