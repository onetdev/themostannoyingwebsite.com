import { PageHeadline } from '@maw/ui-lib';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
import {
  ExperienceSettings,
  MandatoryExperienceSettings,
  PreferencesSettings,
  RuntimeSettings,
  UserGrantsSettings,
} from '@/features/settings';
export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.settings' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Settings() {
  const t = await getTranslations();

  return (
    <PageLayout activeItem="settings" role="main">
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
    </PageLayout>
  );
}
