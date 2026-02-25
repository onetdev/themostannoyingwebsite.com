import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/app/_components/PageLayout';
import { SettingsPage } from '@/features/user/components/Settings';

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
  return (
    <PageLayout activeItem="settings" role="main">
      <SettingsPage />
    </PageLayout>
  );
}
