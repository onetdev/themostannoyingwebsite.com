import { Alert, AlertDescription, AlertTitle, Icon } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';

export function Disclaimer({
  className,
  ...props
}: ComponentProps<typeof Alert>) {
  const t = useTranslations();

  return (
    <Alert
      variant="default"
      className={cn('border-border', className)}
      {...props}
    >
      <Icon icon="failed" />
      <AlertTitle>{t('subscription.landing.disclaimer.title')}</AlertTitle>
      <AlertDescription>
        {t('subscription.landing.disclaimer.description')}
      </AlertDescription>
    </Alert>
  );
}
