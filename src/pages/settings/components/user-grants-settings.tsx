import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import SettingsBlock from './settings-block';
import SettingsBlockRow from './settings-block-row';

import FormCheckbox from '@/components/atoms/form/Checkbox';
import { useUserGrantsStore } from '@/state/user_grants';

const UserGrantSettings: FunctionComponent = () => {
  const { t } = useTranslation(['settings', 'common']);
  const grant = useUserGrantsStore();

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
      <i>{t('settings:section.userGrants.permissionDisclaimer')}</i>
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
