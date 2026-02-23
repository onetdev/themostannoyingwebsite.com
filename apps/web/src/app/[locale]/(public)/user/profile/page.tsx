import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/app/_components/PageLayout';
import { ProfilePage } from '@/features/auth/components';

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
      autoPadding={false}
      activeItem="login"
      className="mx-auto max-w-md px-5 py-0 md:py-14"
      role="main">
      <ProfilePage />
    </PageLayout>
  );
}
