'use client';

import { Separator, ToggleGroup, ToggleGroupItem } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useAchievementBankService } from '../hooks';
import { type AchievementState, useAchievementsStore } from '../stores';
import { AchievementCard } from './AchievementCard';
import { ResetAchievements } from './ResetAchievements';

type AchievementFilter = 'all' | 'completed' | 'inProgress' | 'notStarted';

const ACHIEVEMENT_FILTERS: AchievementFilter[] = [
  'all',
  'completed',
  'inProgress',
  'notStarted',
];

const getFilterGroup = (
  state: AchievementState,
): Exclude<AchievementFilter, 'all'> => {
  if (state.achieved) return 'completed';
  if (state.progress > 0) return 'inProgress';
  return 'notStarted';
};

export function AchievementList() {
  const t = useTranslations('achievements');
  const { achievements } = useAchievementsStore();
  const achievementBank = useAchievementBankService();
  const achievementRegistry = achievementBank.getAchievements();

  const [filter, setFilter] = useState<AchievementFilter>('all');

  const entries = useMemo(
    () =>
      achievementRegistry.map((definition) => ({
        definition,
        state: achievements[definition.id] || {
          id: definition.id,
          achieved: false,
          progress: 0,
        },
      })),
    [achievementRegistry, achievements],
  );

  const visibleEntries = useMemo(
    () =>
      filter === 'all'
        ? entries
        : entries.filter((entry) => getFilterGroup(entry.state) === filter),
    [entries, filter],
  );

  const hasAnyAchievements = Object.keys(achievements).length > 0;

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <ToggleGroup
          className="bg-muted rounded-lg p-1"
          value={[filter]}
          aria-label={t('filter.label')}
          onValueChange={(value) => {
            const next = value[0] as AchievementFilter | undefined;
            if (next) {
              setFilter(next);
            }
          }}
        >
          {ACHIEVEMENT_FILTERS.map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              size="sm"
              className="aria-pressed:bg-primary aria-pressed:text-primary-foreground"
              data-testid={`achievement-filter-${value}`}
            >
              {t(`filter.${value}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {visibleEntries.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleEntries.map(({ definition, state }) => (
            <AchievementCard
              key={definition.id}
              definition={definition}
              state={state}
            />
          ))}
        </div>
      ) : (
        <p
          className="text-muted-foreground text-center text-sm"
          data-testid="achievement-empty"
        >
          {t('filter.empty')}
        </p>
      )}

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
