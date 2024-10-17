import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import {
  ExperienceSettings,
  PreferencesSettings,
  RuntimeSettings,
  UserGrantSettings,
} from '@/features/settings';
import { makeI18nStaticProps } from '@/utils/i18n';

const Settings: NextPage = () => {
  const { t } = useTranslation(['settings', 'common']);

  return (
    <main>
      <SiteTitle>{t('common:navigation.settings')}</SiteTitle>
      <PageHeadline>{t('settings:title')}</PageHeadline>

      <div className="grid gap-3 md:grid-cols-2">
        <PreferencesSettings />
        <UserGrantSettings />
        <ExperienceSettings />
        <RuntimeSettings />
      </div>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps(['settings']);
export default Settings;
