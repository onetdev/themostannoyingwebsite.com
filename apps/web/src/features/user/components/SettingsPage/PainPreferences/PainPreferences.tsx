'use client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
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
    <Card className={className} data-testid="pain-preferences">
      <CardHeader>
        <CardTitle>{t('user.optionalPainPoints.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className={cn('flex flex-col gap-4', listClassName)}>
          <VisualChaos />
          <UiSabotage />
          <Interruptions />
          <BrowserHijacking />
        </div>
        <CardFooter className="flex gap-3 flex-wrap">
          <Button onClick={painPreferences.allEnable}>
            {t('common.action.enableAll')}
          </Button>
          <Button variant="secondary" onClick={painPreferences.allDisable}>
            {t('common.action.disableAll')}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
