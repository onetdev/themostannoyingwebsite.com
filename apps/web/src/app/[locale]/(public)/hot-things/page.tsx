import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import HotThingsPage from '../../../../pages/HotThingsPage';

import { PageLayout } from '@/components/PageLayout';
export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.hotThings' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Page() {
  return (
    <PageLayout activeItem="hot-things" role="main">
      <HotThingsPage />
    </PageLayout>
  );
}
