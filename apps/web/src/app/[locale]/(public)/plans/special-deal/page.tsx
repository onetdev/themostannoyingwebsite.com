import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SpecialUnsubscriptionDeal } from '@/features/subscription/components';
import { PageLayout } from '../../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.planSpecialDeal',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function SpecialDealPage() {
  return (
    <PageLayout route="plans" role="main">
      <SpecialUnsubscriptionDeal />
    </PageLayout>
  );
}
