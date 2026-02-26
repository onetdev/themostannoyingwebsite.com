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
import { useAchievementsStore } from '@/stores';
import { ACHIEVEMENT_REGISTRY } from '../providers/data/registry';

export function AchievementList() {
  const t = useTranslations();
  const { achievements } = useAchievementsStore();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ACHIEVEMENT_REGISTRY.map((definition) => {
        const state = achievements[definition.id] || {
          id: definition.id,
          achieved: false,
          progress: 0,
        };

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
              'relative overflow-hidden transition-all',
              state.achieved
                ? 'border-primary bg-primary/5'
                : 'opacity-70 grayscale',
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {t(definition.nameKey)}
                </CardTitle>
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
      })}
    </div>
  );
}
