import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import {
  ExperienceSettings,
  MandatoryExperienceSettings,
  PreferencesSettings,
  RuntimeSettings,
  UserGrantsSettings,
} from '@/features/settings';
import { makeI18nStaticProps } from '@/lib/utils/i18n';

const Settings: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <SiteTitle>{t('navigation.settings')}</SiteTitle>
      <PageHeadline>{t('navigation.settings')}</PageHeadline>

      <div className="grid gap-3 md:grid-cols-2">
        <PreferencesSettings />
        <UserGrantsSettings />
        <ExperienceSettings
          className="md:col-span-2"
          listClassName="grid gap-3 grid-cols-1 md:gap-x-10 md:grid-cols-2 lg:grid-cols-3"
        />
        <MandatoryExperienceSettings />
        <RuntimeSettings />
      </div>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Settings;
