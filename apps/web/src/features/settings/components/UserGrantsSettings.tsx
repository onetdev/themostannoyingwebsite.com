'use client';

import { BorderedBox, Checkbox as FormCheckbox, LabeledChild } from '@maw/ui';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { useUserGrantsStore } from '@/lib/state/user_grants';

const UserGrantsSettings: FunctionComponent = () => {
  const grant = useUserGrantsStore();
  const t = useTranslations();

  return (
    <BorderedBox title={t('settings.userGrants.title')}>
      <LabeledChild label={t('settings.userGrants.essentialCookies')}>
        <FormCheckbox
          name="essential_cookies"
          checked={grant.cookies.essential}
          disabled
        />
      </LabeledChild>
      <br />
      <small>
        <i>{t('settings.userGrants.permissionDisclaimer')}</i>
      </small>
      <br />
      <LabeledChild
        label={t('settings.userGrants.notificationPermission')}
        reverse>
        {`${grant.permission.notification || t('common.notSet')}`}
      </LabeledChild>
      <LabeledChild label={t('settings.userGrants.locationPermission')} reverse>
        {`${grant.permission.location || t('common.notSet')}`}
      </LabeledChild>
    </BorderedBox>
  );
};

export default UserGrantsSettings;
