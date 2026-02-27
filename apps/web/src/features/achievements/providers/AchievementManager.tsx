'use client';

import { useCallback } from 'react';
import { useEventBus, useEventBusListener } from '@/contexts/EventBusContext';

import type { ContentEvent } from '@/features/content/types';
import type { InterferrerEvent } from '@/features/interferrer/types';
import type { ObstructorEvent } from '@/features/obstructor/types';
import type { PromotionEvent } from '@/features/promotion/types';
import type { SubscriptionEvent } from '@/features/subscription/types';
import type { UserEvent } from '@/features/user/types';
import type { AppEvent, EventPayload } from '@/types';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { useAchievementsStore } from '../stores';
import { getAchievementMetaById } from './data/registry';

export const AchievementManager = () => {
  const { incrementAchievementProgress, completeAchievement } =
    useAchievementsStore();
  const { dispatch } = useEventBus();

  const handleProgression = useCallback(
    (achievementId: string, amount = 1) => {
      const definition = getAchievementMetaById(achievementId);
      if (!definition?.targetProgress) {
        return;
      }

      const result = incrementAchievementProgress(
        achievementId,
        amount,
        definition.targetProgress,
      );

      if (result.newlyAchieved) {
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
      } else {
        dispatch('ACHIEVEMENT_PROGRESS_UPDATED', {
          achievementId,
          progress: result.progress,
          lastNotifiedAt: result.lastNotifiedAt,
        });
      }
    },
    [dispatch, incrementAchievementProgress],
  );

  const handleSingleUnlock = useCallback(
    (achievementId: string) => {
      const newlyAchieved = completeAchievement(achievementId);
      if (!newlyAchieved) {
        return;
      }

      dispatch('ACHIEVEMENT_UNLOCKED', { achievementId });
    },
    [completeAchievement, dispatch],
  );

  useEventBusListener<EventPayload<ObstructorEvent, 'MAZE_STEP'>>(
    'MAZE_STEP',
    (event) => {
      if (event.payload?.passedSpecialCell) {
        const newlyAchieved = completeAchievement('maze-special-cell');
        if (newlyAchieved)
          dispatch('ACHIEVEMENT_UNLOCKED', {
            achievementId: 'maze-special-cell',
          });
      }

      handleProgression('maze-explorer');
    },
  );

  useEventBusListener<EventPayload<ObstructorEvent, 'BOUNCY_LOGO_BOUNCE'>>(
    'BOUNCY_LOGO_BOUNCE',
    (event) => {
      if (event.payload?.isPerfectCorner) {
        const newlyAchieved = completeAchievement('bouncing-logo-corner-hit');
        if (newlyAchieved)
          dispatch('ACHIEVEMENT_UNLOCKED', {
            achievementId: 'bouncing-logo-corner-hit',
          });
      }

      handleProgression('bouncing-logo-fanatic');
    },
  );

  useEventBusListener<
    EventPayload<SubscriptionEvent, 'SUBSCRIPTION_PACKAGE_SELECTED'>
  >('SUBSCRIPTION_PACKAGE_SELECTED', () =>
    handleSingleUnlock('first-package-selection'),
  );

  useEventBusListener<EventPayload<ContentEvent, 'SEARCH'>>('SEARCH', () =>
    handleSingleUnlock('first-search'),
  );

  useEventBusListener<EventPayload<InterferrerEvent, 'CONTEXT_MENU_ATTEMPT'>>(
    'CONTEXT_MENU_ATTEMPT',
    () => {
      handleProgression('right-click-rebel');
    },
  );

  useEventBusListener<EventPayload<AppEvent, 'TEXT_COPIED'>>(
    'TEXT_COPIED',
    () => {
      handleProgression('copy-paste-criminal');
    },
  );

  useEventBusListener<EventPayload<AppEvent, 'EXIT_PROMPT_TRIGGERED'>>(
    'EXIT_PROMPT_TRIGGERED',
    () => handleSingleUnlock('escape-artist'),
  );

  useEventBusListener<
    EventPayload<ObstructorEvent, 'DEAD_PIXEL_CLICK_ATTEMPT'>
  >('DEAD_PIXEL_CLICK_ATTEMPT', () => handleSingleUnlock('dead-pixel-hunter'));

  useEventBusListener<EventPayload<AppEvent, 'NAVIGATION'>>('NAVIGATION', () =>
    handleSingleUnlock('first-visit'),
  );

  useEventBusListener<
    EventPayload<PromotionEvent, 'WHEEL_OF_FORTUNE_SPIN_COMPLETE'>
  >('WHEEL_OF_FORTUNE_SPIN_COMPLETE', () =>
    handleSingleUnlock('wheel-of-fortune-spin'),
  );

  useEventBusListener<EventPayload<UserEvent, 'ADMIN_LOGIN_SUCCESS'>>(
    'ADMIN_LOGIN_SUCCESS',
    () => handleSingleUnlock('admin-login'),
  );

  return <AchievementToastManager />;
};
