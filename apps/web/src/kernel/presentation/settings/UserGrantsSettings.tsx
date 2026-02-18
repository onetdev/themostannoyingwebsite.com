'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { SettingsField } from './SettingsField';

import { useUserGrantsStore } from '@/kernel';

export function UserGrantsSettings() {
  const grant = useUserGrantsStore();
  const t = useTranslations();

  return (
    <Card data-testid="user-grants-settings">
      <CardHeader>
        <CardTitle>{t('settings.userGrants.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <SettingsField label={t('settings.userGrants.essentialCookies')}>
          <FormCheckbox
            name="essential_cookies"
            checked={grant.cookies.essential}
            disabled
          />
        </SettingsField>
        <small className="text-muted-foreground py-5">
          <i>{t('settings.userGrants.permissionDisclaimer')}</i>
        </small>
        <SettingsField
          label={t('settings.userGrants.notificationPermission')}
          reverse>
          {`${grant.permission.notification || t('common.notSet')}`}
        </SettingsField>
        <SettingsField
          label={t('settings.userGrants.locationPermission')}
          reverse>
          {`${grant.permission.location || t('common.notSet')}`}
        </SettingsField>
      </CardContent>
    </Card>
  );
}
