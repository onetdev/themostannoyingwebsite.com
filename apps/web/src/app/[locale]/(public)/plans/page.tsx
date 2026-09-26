import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/core/i18n/routing';

import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { VariantPoolsBoundary } from '@/features/content/components/VariantPoolsBoundary';
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

  const locale = (await getLocale()) as LanguageCode;

  return (
    <PageLayout route="plans" role="main">
      <VariantPoolsBoundary
        lang={locale}
        types={['social-proof-names', 'social-proof-locations']}
      >
        <PlansPage
          plans={plansResult.success ? plansResult.data : []}
          features={featuresResult.success ? featuresResult.data : []}
          urgencyConfig={config.subscription.urgency}
          socialProofConfig={config.subscription.socialProof}
        />
      </VariantPoolsBoundary>
    </PageLayout>
  );
}
