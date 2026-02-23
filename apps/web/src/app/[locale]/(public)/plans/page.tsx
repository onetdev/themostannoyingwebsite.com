import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
export { generateStaticParams } from '@/i18n/routing';
import config from '@/config';
import {
  createSubscriptionPlansService,
  PlansPage,
} from '@/features/subscription';

export const revalidate = 1800;

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
        urgencyConfig={config.subscription.urgency}
        socialProofConfig={config.subscription.socialProof}
      />
    </PageLayout>
  );
}
