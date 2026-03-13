import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/core/i18n/routing';

import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { PlansPage } from '@/features/subscription/components';
import { getSubscriptionPlansService } from '@/features/subscription/services';
import { PageLayout } from '../_components/PageLayout';

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
  const container = getDependencyContainer();
  const subscriptionPlansService = getSubscriptionPlansService(container);
  const [plansResult, featuresResult] = await Promise.all([
    subscriptionPlansService.getPlans(),
    subscriptionPlansService.getFeatures(),
  ]);

  return (
    <PageLayout activeItem="plans" role="main">
      <PlansPage
        plans={plansResult.success ? plansResult.data : []}
        features={featuresResult.success ? featuresResult.data : []}
        urgencyConfig={config.subscription.urgency}
        socialProofConfig={config.subscription.socialProof}
      />
    </PageLayout>
  );
}
