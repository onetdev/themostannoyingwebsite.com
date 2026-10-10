'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FieldDescription,
  FieldGroup,
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
      <CardContent className="flex flex-col gap-3">
        <FieldGroup className="gap-3">
          <SettingsField label={t('user.userGrants.essentialCookies')} disabled>
            {(id) => (
              <FormCheckbox
                id={id}
                name="essential_cookies"
                checked={grant.cookies.essential}
                disabled
              />
            )}
          </SettingsField>
        </FieldGroup>
        <FieldDescription className="py-2">
          <i>{t('user.userGrants.permissionDisclaimer')}</i>
        </FieldDescription>
        <FieldGroup className="gap-3">
          <SettingsField
            label={t('user.userGrants.notificationPermission')}
            value={
              grant.permission.notification
                ? t(`common.state.${grant.permission.notification}`)
                : t('common.state.notSet')
            }
          />
          <SettingsField
            label={t('user.userGrants.locationPermission')}
            value={
              grant.permission.location
                ? t(`common.state.${grant.permission.location}`)
                : t('common.state.notSet')
            }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
