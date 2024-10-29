import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './SettingsBlock';
import SettingsBlockRow from './SettingsBlockRow';

import FormCheckbox from '@/components/atoms/Checkbox';
import { useUserGrantsStore } from '@/state/user_grants';

const UserGrantSettings: FunctionComponent = () => {
  const grant = useUserGrantsStore();
  const { t } = useTranslation(['settings', 'common']);

  return (
    <SettingsBlock title={t('settings:section.userGrants.title')}>
      <SettingsBlockRow
        label={t('settings:section.userGrants.essentialCookies')}>
        <FormCheckbox
          name="essential_cookies"
          checked={grant.cookies.essential}
          disabled
        />
      </SettingsBlockRow>
      <br />
      <small>
        <i>{t('settings:section.userGrants.permissionDisclaimer')}</i>
      </small>
      <br />
      <SettingsBlockRow
        label={t('settings:section.userGrants.notificationPermission')}>
        {`${grant.permission.notification || t('common:status.notSet')}`}
      </SettingsBlockRow>
      <SettingsBlockRow
        label={t('settings:section.userGrants.locationPermission')}>
        {`${grant.permission.location || t('common:status.notSet')}`}
      </SettingsBlockRow>
    </SettingsBlock>
  );
};

export default UserGrantSettings;
