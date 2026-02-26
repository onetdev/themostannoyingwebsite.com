'use client';

import { toast } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEventBridgeListener } from '@/contexts/EventBridgeContext';
import { useAudio } from '@/hooks';
import { useUserPreferencesStore } from '@/stores';
import { getAchievementById } from '../providers/data/registry';

export const AchievementToastManager = () => {
  const t = useTranslations();
  const enableSound = useUserPreferencesStore((state) => state.enableSound);
  const achievementSfx = useAudio('/assets/sfx/achivement.mp3');

  useEventBridgeListener('ACHIEVEMENT_UNLOCKED', (event) => {
    const { achievementId } = event.payload || {};
    if (!achievementId) return;

    const definition = getAchievementById(achievementId);
    if (!definition) return;

    if (enableSound) {
      achievementSfx.play();
    }

    toast(
      t('achievements.unlocked', {
        name: t(definition.nameKey),
      }),
      {
        icon: '🏆',
      },
    );
  });

  return null;
};
