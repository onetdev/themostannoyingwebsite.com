'use client';

import { toast } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEventBridgeListener } from '@/contexts/EventBridgeContext';
import { useAudio } from '@/hooks';
import { getAchievementById } from '../providers/data/registry';

export const AchievementToastManager = () => {
  const t = useTranslations();
  const { play, audio } = useAudio('/assets/sfx/achivement.mp3');

  useEventBridgeListener('ACHIEVEMENT_UNLOCKED', (event) => {
    const { achievementId } = event.payload || {};
    if (!achievementId) return;

    const definition = getAchievementById(achievementId);
    if (!definition) return;

    play();

    toast(
      t('achievements.unlocked', {
        name: t(definition.nameKey),
      }),
      {
        icon: '🏆',
      },
    );
  });

  return audio;
};
