'use client';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import type { AchievementState } from '@/stores/achievements';
import type { AchievementDefinition } from '../types';

export type AchievementCardProps = {
  definition: AchievementDefinition;
  state: AchievementState;
};

export function AchievementCard({ definition, state }: AchievementCardProps) {
  const t = useTranslations();

  const isProgression = definition.type === 'progression';
  const progressValue = isProgression
    ? (state.progress / (definition.targetProgress || 1)) * 100
    : state.achieved
      ? 100
      : 0;

  return (
    <Card
      key={definition.id}
      className={cn(
        'relative overflow-hidden transition-all gap-2',
        state.achieved ? 'border-primary bg-primary/5' : 'opacity-70 grayscale',
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t(definition.nameKey)}</CardTitle>
          {state.achieved ? (
            <Badge
              variant="default"
              className="bg-primary text-primary-foreground"
            >
              {t('common.completed')}
            </Badge>
          ) : (
            <Badge variant="outline">{t('common.pending')}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm">
          {t(definition.descriptionKey)}
        </p>

        {isProgression && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>
                {state.progress} / {definition.targetProgress}
              </span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}

        {state.completedAt && (
          <div className="mt-4 text-[10px] text-muted-foreground opacity-50">
            {t('common.done')}:{' '}
            {new Date(state.completedAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
