'use client';

import { Icon, Progress } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useNavigationProvider } from '@/contexts/NavigationContext';

export type AchievementToastProps = {
  name: string;
  type: 'unlocked' | 'progress';
  progress?: number;
  target?: number;
};

export function AchievementToast({
  name,
  type,
  progress,
  target,
}: AchievementToastProps) {
  const t = useTranslations('achievements');
  const { navigatePush } = useNavigationProvider();

  const isProgress =
    type === 'progress' && progress !== undefined && target !== undefined;
  const progressPercent = isProgress ? (progress / target) * 100 : 100;

  return (
    <button
      type="button"
      onClick={() => navigatePush('achievements')}
      className="w-full bg-background p-3 rounded-lg border border-border cursor-pointer sm:w-[364px]"
    >
      <div className="flex items-center gap-4 f-full">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary-foreground/20 text-primary-foreground shadow-2xl border-white/10">
          <Icon icon="trophy" className="text-2xl drop-shadow-md" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            {type === 'unlocked' ? t('unlockedTitle') : t('progressTitle')}
          </p>
          <p className="truncate text-base font-extrabold leading-tight tracking-tight text-foreground">
            {name}
          </p>
        </div>
      </div>
      {isProgress && (
        <div className="pt-2">
          <div className="space-y-2 px-0.5">
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <span className="opacity-70">{t('progressBarLabel')}</span>
              <span className="text-primary">
                {progress} / {target}
              </span>
            </div>
            <div className="relative pt-1">
              <Progress value={progressPercent} />
              <div
                className="absolute top-1 left-0 h-2 bg-primary/10 blur-sm rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </button>
  );
}
