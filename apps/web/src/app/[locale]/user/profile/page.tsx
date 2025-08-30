import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
import { ProfilePage } from '@/root/modules/auth';

export { generateStaticParams } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.userProfile',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  return (
    <PageLayout
      activeItem="login"
      className="mx-auto max-w-md py-0 md:py-14"
      role="main">
      <ProfilePage />
    </PageLayout>
  );
}
