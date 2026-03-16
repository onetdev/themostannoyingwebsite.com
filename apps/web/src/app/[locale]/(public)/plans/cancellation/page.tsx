import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CancellationPage } from '@/features/subscription/components';
import { PageLayout } from '../../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.planCancellation',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  return (
    <PageLayout route="plans.cancellation" role="main">
      <CancellationPage />
    </PageLayout>
  );
}
