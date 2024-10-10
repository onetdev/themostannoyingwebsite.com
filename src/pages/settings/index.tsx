import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import ExperienceSettings from './components/experience-settings';
import PreferencesSettings from './components/preferences-settings';
import RuntimeSettings from './components/runtime-settings';
import UserGrantSettings from './components/user-grants-settings';

import SiteTitle from '@/components/atoms/SiteTitle';
import { makeI18nStaticProps } from '@/utils/i18n';

const Settings: NextPage = () => {
  const { t } = useTranslation(['settings', 'common']);

  return (
    <main>
      <SiteTitle>{t('common:navigation.settings')}</SiteTitle>
      <h1>{t('settings:title')}</h1>

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
