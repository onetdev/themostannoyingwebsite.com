import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OnlySpamsPage } from '@/features/marketing/components';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.onlySpams' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  return (
    <PageLayout activeItem="only-spams" role="main">
      <OnlySpamsPage />
    </PageLayout>
  );
}
