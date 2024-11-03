import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlockRow from './SettingsBlockRow';

import FormCheckbox from '@/components/atoms/Checkbox';
import BorderedBox from '@/components/templates/BorderedBox';
import { useUserGrantsStore } from '@/state/user_grants';

const UserGrantsSettings: FunctionComponent = () => {
  const grant = useUserGrantsStore();
  const { t } = useTranslation();

  return (
    <BorderedBox title={t('settings.userGrants.title')}>
      <SettingsBlockRow label={t('settings.userGrants.essentialCookies')}>
        <FormCheckbox
          name="essential_cookies"
          checked={grant.cookies.essential}
          disabled
        />
      </SettingsBlockRow>
      <br />
      <small>
        <i>{t('settings.userGrants.permissionDisclaimer')}</i>
      </small>
      <br />
      <SettingsBlockRow
        label={t('settings.userGrants.notificationPermission')}
        reverse>
        {`${grant.permission.notification || t('common.notSet')}`}
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings.userGrants.locationPermission')}
        reverse>
        {`${grant.permission.location || t('common.notSet')}`}
      </SettingsBlockRow>
    </BorderedBox>
  );
};

export default UserGrantsSettings;
