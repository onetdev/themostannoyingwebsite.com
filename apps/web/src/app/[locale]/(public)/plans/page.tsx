import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
export { generateStaticParams } from '@/i18n/routing';
import {
  createSubscriptionPlansService,
  PlansPage,
} from '@/modules/subscription';

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.plans' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const subscriptionPlansService = createSubscriptionPlansService();
  const [plansResult, featuresResult] = await Promise.all([
    subscriptionPlansService.getPlans(),
    subscriptionPlansService.getFeatures(),
  ]);

  return (
    <PageLayout activeItem="plans" role="main">
      <PlansPage
        plans={plansResult.data ?? []}
        features={featuresResult.data ?? []}
      />
    </PageLayout>
  );
}
