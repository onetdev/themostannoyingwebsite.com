import { Metadata } from 'next';

import PageHeadline from '@/components/atoms/PageHeadline';
import {
  ExperienceSettings,
  MandatoryExperienceSettings,
  PreferencesSettings,
  RuntimeSettings,
  UserGrantsSettings,
} from '@/features/settings';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('navigation.settings'),
  };
}

export default async function Settings() {
  const t = await getTranslations();

  return (
    <main>
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
