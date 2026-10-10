'use client';

import { Separator } from '@maw/ui-lib';
import { useAchievementBankService } from '../hooks';
import { useAchievementsStore } from '../stores';
import { AchievementCard } from './AchievementCard';
import { ResetAchievements } from './ResetAchievements';

export function AchievementList() {
  const { achievements } = useAchievementsStore();
  const achievementBank = useAchievementBankService();
  const achievementRegistry = achievementBank.getAchievements();

  const hasAnyAchievements = Object.keys(achievements).length > 0;

  return (
    <div className="space-y-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievementRegistry.map((definition) => {
          const state = achievements[definition.id] || {
            id: definition.id,
            achieved: false,
            progress: 0,
          };

          return (
            <AchievementCard
              key={definition.id}
              definition={definition}
              state={state}
            />
          );
        })}
      </div>

      {hasAnyAchievements && (
        <div className="flex flex-col gap-8">
          <Separator />
          <div className="flex justify-center">
            <ResetAchievements />
          </div>
        </div>
      )}
    </div>
  );
}
