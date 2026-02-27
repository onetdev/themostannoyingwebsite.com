'use client';

import { useCallback } from 'react';
import { useEventBus, useEventBusListener } from '@/contexts/EventBusContext';
import type { ContentEvent } from '@/features/content/types';
import type { InterferrerEvent } from '@/features/interferrer/types';
import type { ObstructorEvent } from '@/features/obstructor/types';
import type { PromotionEvent } from '@/features/promotion/types';
import type { SubscriptionEvent } from '@/features/subscription/types';
import type { UserEvent } from '@/features/user/types';
import { useAchievementsStore } from '@/stores';
import type { AchievementUpdateResult } from '@/stores/achievements';
import type { AppEvent } from '@/types';
import { AchievementToastManager } from '../components/AchievementToastManager';
import { getAchievementMetaById } from './data/registry';

type EventPayload<
  T1 extends { type: string; payload?: unknown },
  T2 extends string,
> = Extract<T1, { type: T2 }>['payload'];

export const AchievementManager = () => {
  const { incrementAchievementProgress, completeAchievement } =
    useAchievementsStore();
  const { dispatch } = useEventBus();

  const handleProgressiveUpdate = useCallback(
    (achievementId: string, result: AchievementUpdateResult) => {
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
    [dispatch],
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

      const definition = getAchievementMetaById('maze-explorer');
      if (definition?.targetProgress) {
        const result = incrementAchievementProgress(
          'maze-explorer',
          1,
          definition.targetProgress,
        );
        handleProgressiveUpdate('maze-explorer', result);
      }
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

      const definition = getAchievementMetaById('bouncing-logo-fanatic');
      if (definition?.targetProgress) {
        const result = incrementAchievementProgress(
          'bouncing-logo-fanatic',
          1,
          definition.targetProgress,
        );
        handleProgressiveUpdate('bouncing-logo-fanatic', result);
      }
    },
  );

  useEventBusListener<
    EventPayload<SubscriptionEvent, 'SUBSCRIPTION_PACKAGE_SELECTED'>
  >('SUBSCRIPTION_PACKAGE_SELECTED', () => {
    const newlyAchieved = completeAchievement('first-package-selection');
    if (newlyAchieved)
      dispatch('ACHIEVEMENT_UNLOCKED', {
        achievementId: 'first-package-selection',
      });
  });

  useEventBusListener<EventPayload<ContentEvent, 'SEARCH'>>('SEARCH', () => {
    const newlyAchieved = completeAchievement('first-search');
    if (newlyAchieved)
      dispatch('ACHIEVEMENT_UNLOCKED', { achievementId: 'first-search' });
  });

  useEventBusListener<EventPayload<InterferrerEvent, 'CONTEXT_MENU_ATTEMPT'>>(
    'CONTEXT_MENU_ATTEMPT',
    () => {
      const definition = getAchievementMetaById('right-click-rebel');
      if (definition?.targetProgress) {
        const result = incrementAchievementProgress(
          'right-click-rebel',
          1,
          definition.targetProgress,
        );
        handleProgressiveUpdate('right-click-rebel', result);
      }
    },
  );

  useEventBusListener<EventPayload<AppEvent, 'TEXT_COPIED'>>(
    'TEXT_COPIED',
    () => {
      const definition = getAchievementMetaById('copy-paste-criminal');
      if (definition?.targetProgress) {
        const result = incrementAchievementProgress(
          'copy-paste-criminal',
          1,
          definition.targetProgress,
        );
        handleProgressiveUpdate('copy-paste-criminal', result);
      }
    },
  );

  useEventBusListener<EventPayload<AppEvent, 'EXIT_PROMPT_TRIGGERED'>>(
    'EXIT_PROMPT_TRIGGERED',
    () => {
      const newlyAchieved = completeAchievement('escape-artist');
      if (newlyAchieved)
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId: 'escape-artist' });
    },
  );

  useEventBusListener<
    EventPayload<ObstructorEvent, 'DEAD_PIXEL_CLICK_ATTEMPT'>
  >('DEAD_PIXEL_CLICK_ATTEMPT', () => {
    const newlyAchieved = completeAchievement('dead-pixel-hunter');
    if (newlyAchieved)
      dispatch('ACHIEVEMENT_UNLOCKED', { achievementId: 'dead-pixel-hunter' });
  });

  useEventBusListener<EventPayload<AppEvent, 'NAVIGATION'>>(
    'NAVIGATION',
    () => {
      const newlyAchieved = completeAchievement('first-visit');
      if (newlyAchieved)
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId: 'first-visit' });
    },
  );

  useEventBusListener<
    EventPayload<PromotionEvent, 'WHEEL_OF_FORTUNE_SPIN_COMPLETE'>
  >('WHEEL_OF_FORTUNE_SPIN_COMPLETE', () => {
    const newlyAchieved = completeAchievement('wheel-of-fortune-spin');
    if (newlyAchieved)
      dispatch('ACHIEVEMENT_UNLOCKED', {
        achievementId: 'wheel-of-fortune-spin',
      });
  });

  useEventBusListener<EventPayload<UserEvent, 'ADMIN_LOGIN_SUCCESS'>>(
    'ADMIN_LOGIN_SUCCESS',
    () => {
      const newlyAchieved = completeAchievement('admin-login');
      if (newlyAchieved)
        dispatch('ACHIEVEMENT_UNLOCKED', { achievementId: 'admin-login' });
    },
  );

  return <AchievementToastManager />;
};
