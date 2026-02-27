'use client';

import { ACHIEVEMENT_REGISTRY } from '../providers/data/registry';
import { useAchievementsStore } from '../stores';
import { AchievementCard } from './AchievementCard';
import { ResetAchievementsButton } from './ResetAchievementsButton';

export function AchievementList() {
  const { achievements } = useAchievementsStore();

  const hasAnyAchievements = Object.keys(achievements).length > 0;

  return (
    <div className="space-y-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENT_REGISTRY.map((definition) => {
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
        <div className="flex justify-center border-border border-t pt-8">
          <ResetAchievementsButton />
        </div>
      )}
    </div>
  );
}
