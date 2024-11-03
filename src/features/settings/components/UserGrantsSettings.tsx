import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import FormCheckbox from '@/components/atoms/Checkbox';
import FormRow from '@/components/molecules/FormRow';
import BorderedBox from '@/components/templates/BorderedBox';
import { useUserGrantsStore } from '@/lib/state/user_grants';

const UserGrantsSettings: FunctionComponent = () => {
  const grant = useUserGrantsStore();
  const { t } = useTranslation();

  return (
    <BorderedBox title={t('settings.userGrants.title')}>
      <FormRow label={t('settings.userGrants.essentialCookies')}>
        <FormCheckbox
          name="essential_cookies"
          checked={grant.cookies.essential}
          disabled
        />
      </FormRow>
      <br />
      <small>
        <i>{t('settings.userGrants.permissionDisclaimer')}</i>
      </small>
      <br />
      <FormRow label={t('settings.userGrants.notificationPermission')} reverse>
        {`${grant.permission.notification || t('common.notSet')}`}
      </FormRow>
      <FormRow label={t('settings.userGrants.locationPermission')} reverse>
        {`${grant.permission.location || t('common.notSet')}`}
      </FormRow>
    </BorderedBox>
  );
};

export default UserGrantsSettings;
