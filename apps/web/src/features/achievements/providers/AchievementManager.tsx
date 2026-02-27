'use client';

import { useCallback } from 'react';
import { useEventBus, useEventBusListener } from '@/contexts/EventBusContext';
import type { ObstructorEvent } from '@/features/obstructor/types';
import { useAchievementsStore } from '@/stores';
import { AchievementToastManager } from '../components/AchievementToastManager';

export const AchievementManager = () => {
  const { incrementAchievementProgress, completeAchievement } =
    useAchievementsStore();
  const { dispatch } = useEventBus();

  const handleUnlock = useCallback(
    (achievementId: string, newlyAchieved: boolean) => {
      if (newlyAchieved) {
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
      }
    },
    [dispatch],
  );

  // Specific achievement triggers
  useEventBusListener<
    Extract<ObstructorEvent, { type: 'MAZE_STEP' }>['payload']
  >('MAZE_STEP', (event) => {
    if (event.payload?.passedSpecialCell) {
      const newlyAchieved = completeAchievement('maze-special-cell');
      handleUnlock('maze-special-cell', newlyAchieved);
    }

    const newlyAchievedProgress = incrementAchievementProgress(
      'maze-explorer',
      1,
      500,
    );
    handleUnlock('maze-explorer', newlyAchievedProgress);
  });

  useEventBusListener<
    Extract<ObstructorEvent, { type: 'BOUNCY_LOGO_BOUNCE' }>['payload']
  >('BOUNCY_LOGO_BOUNCE', (event) => {
    if (event.payload?.isPerfectCorner) {
      const newlyAchieved = completeAchievement('bouncing-logo-corner-hit');
      handleUnlock('bouncing-logo-corner-hit', newlyAchieved);
    }

    const newlyAchievedProgress = incrementAchievementProgress(
      'bouncing-logo-fanatic',
      1,
      420,
    );
    handleUnlock('bouncing-logo-fanatic', newlyAchievedProgress);
  });

  useEventBusListener('SUBSCRIPTION_PACKAGE_SELECTED', () => {
    const newlyAchieved = completeAchievement('first-package-selection');
    handleUnlock('first-package-selection', newlyAchieved);
  });

  useEventBusListener('SEARCH', () => {
    const newlyAchieved = completeAchievement('first-search');
    handleUnlock('first-search', newlyAchieved);
  });

  useEventBusListener('CONTEXT_MENU_ATTEMPT', () => {
    const newlyAchieved = incrementAchievementProgress(
      'right-click-rebel',
      1,
      20,
    );
    handleUnlock('right-click-rebel', newlyAchieved);
  });

  useEventBusListener('TEXT_COPIED', () => {
    const newlyAchieved = incrementAchievementProgress(
      'copy-paste-criminal',
      1,
      5,
    );
    handleUnlock('copy-paste-criminal', newlyAchieved);
  });

  useEventBusListener('EXIT_PROMPT_TRIGGERED', () => {
    const newlyAchieved = completeAchievement('escape-artist');
    handleUnlock('escape-artist', newlyAchieved);
  });

  useEventBusListener('DEAD_PIXEL_CLICK_ATTEMPT', () => {
    const newlyAchieved = completeAchievement('dead-pixel-hunter');
    handleUnlock('dead-pixel-hunter', newlyAchieved);
  });

  useEventBusListener('NAVIGATION', () => {
    const newlyAchieved = completeAchievement('first-visit');
    handleUnlock('first-visit', newlyAchieved);
  });

  useEventBusListener('WHEEL_OF_FORTUNE_SPIN_COMPLETE', () => {
    const newlyAchieved = completeAchievement('wheel-of-fortune-spin');
    handleUnlock('wheel-of-fortune-spin', newlyAchieved);
  });

  useEventBusListener('ADMIN_LOGIN_SUCCESS', () => {
    const newlyAchieved = completeAchievement('admin-login');
    handleUnlock('admin-login', newlyAchieved);
  });

  return <AchievementToastManager />;
};
