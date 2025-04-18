import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { LoginPage } from './login-page';

import { PageLayout } from '@/components/PageLayout';
export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.userLogin' });

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
      <LoginPage />
    </PageLayout>
  );
}
