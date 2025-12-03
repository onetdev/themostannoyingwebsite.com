'use client';

import {
  BorderedBox,
  CompactFormRow,
  Checkbox as FormCheckbox,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { useUserGrantsStore } from '@/kernel';

const UserGrantsSettings: FunctionComponent = () => {
  const grant = useUserGrantsStore();
  const t = useTranslations();

  return (
    <BorderedBox title={t('settings.userGrants.title')}>
      <CompactFormRow label={t('settings.userGrants.essentialCookies')}>
        <FormCheckbox
          name="essential_cookies"
          checked={grant.cookies.essential}
          disabled
        />
      </CompactFormRow>
      <br />
      <small>
        <i>{t('settings.userGrants.permissionDisclaimer')}</i>
      </small>
      <br />
      <CompactFormRow
        label={t('settings.userGrants.notificationPermission')}
        reverse>
        {`${grant.permission.notification || t('common.notSet')}`}
      </CompactFormRow>
      <CompactFormRow
        label={t('settings.userGrants.locationPermission')}
        reverse>
        {`${grant.permission.location || t('common.notSet')}`}
      </CompactFormRow>
    </BorderedBox>
  );
};

export default UserGrantsSettings;
