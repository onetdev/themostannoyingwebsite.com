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
import { AdvertisingAndMonetization } from './AdvertisingAndMonetization';
import { BrowserAndTab } from './BrowserAndTab';
import { PopupAndInteractivity } from './PopupAndInteractivity';
import { VisualObstructions } from './VisualObstructions';

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
        <CardTitle>{t('settings.optionalPainPoints.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className={cn('flex flex-col gap-4', listClassName)}>
          <AdvertisingAndMonetization />
          <BrowserAndTab />
          <PopupAndInteractivity />
          <VisualObstructions />
        </div>
        <CardFooter className="flex gap-3">
          <Button onClick={painPreferences.allEnable}>
            {t('common.enableAll')}
          </Button>
          <Button variant="secondary" onClick={painPreferences.allDisable}>
            {t('common.disableAll')}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
