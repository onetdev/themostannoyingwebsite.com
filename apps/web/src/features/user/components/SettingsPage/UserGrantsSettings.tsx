'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useUserGrantsStore } from '@/stores';
import { SettingsField } from './SettingsField';

export function UserGrantsSettings() {
  const grant = useUserGrantsStore();
  const t = useTranslations();

  return (
    <Card data-testid="user-grants-settings">
      <CardHeader>
        <CardTitle>{t('user.userGrants.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <SettingsField label={t('user.userGrants.essentialCookies')}>
          <FormCheckbox
            name="essential_cookies"
            checked={grant.cookies.essential}
            disabled
          />
        </SettingsField>
        <small className="text-muted-foreground py-5">
          <i>{t('user.userGrants.permissionDisclaimer')}</i>
        </small>
        <SettingsField
          label={t('user.userGrants.notificationPermission')}
          reverse
        >
          {`${grant.permission.notification || t('common.notSet')}`}
        </SettingsField>
        <SettingsField label={t('user.userGrants.locationPermission')} reverse>
          {`${grant.permission.location || t('common.notSet')}`}
        </SettingsField>
      </CardContent>
    </Card>
  );
}
