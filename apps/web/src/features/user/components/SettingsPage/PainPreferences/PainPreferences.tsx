'use client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { usePainPreferencesStore } from '@/stores';
import { BrowserHijacking } from './BrowserHijacking';
import { Interruptions } from './Interruptions';
import { UiSabotage } from './UiSabotage';
import { VisualChaos } from './VisualChaos';

type PainPreferencesProps = {
  className?: string;
  listClassName?: string;
};

export function PainPreferences({
  className = '',
  listClassName = '',
}: PainPreferencesProps) {
  const painPreferences = usePainPreferencesStore();
  const t = useTranslations();

  return (
    <Card
      className={className}
      data-testid="pain-preferences"
      data-track-section="settings:pain-preferences"
    >
      <CardHeader>
        <CardTitle>{t('user.optionalPainPoints.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn('flex flex-col gap-4', listClassName)}>
          <VisualChaos />
          <UiSabotage />
          <Interruptions />
          <BrowserHijacking />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-3 border-t">
        <Button
          data-track="settings:pain-preferences:enable-all"
          onClick={painPreferences.allEnable}
        >
          {t('common.action.enableAll')}
        </Button>
        <Button
          variant="secondary"
          data-track="settings:pain-preferences:disable-all"
          onClick={painPreferences.allDisable}
        >
          {t('common.action.disableAll')}
        </Button>
      </CardFooter>
    </Card>
  );
}
