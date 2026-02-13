'use client';

import { BorderedBox, Checkbox as FormCheckbox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { SettingsField } from './SettingsField';

import { useUserGrantsStore } from '@/kernel';

export function UserGrantsSettings() {
  const grant = useUserGrantsStore();
  const t = useTranslations();

  return (
    <BorderedBox
      title={t('settings.userGrants.title')}
      data-testid="user-grants-settings">
      <SettingsField label={t('settings.userGrants.essentialCookies')}>
        <FormCheckbox
          name="essential_cookies"
          checked={grant.cookies.essential}
          disabled
        />
      </SettingsField>
      <p className="py-5 text-sm">
        <i>{t('settings.userGrants.permissionDisclaimer')}</i>
      </p>
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
    </BorderedBox>
  );
}
