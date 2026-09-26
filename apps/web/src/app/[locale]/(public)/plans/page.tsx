import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/core/i18n/routing';

import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { buildPlanList, JsonLd } from '@/core/seo';
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
  const t = await getTranslations();
  const plans = plansResult.success ? plansResult.data : [];

  const planListSchema = buildPlanList({
    baseUrl: config.deploymentMeta.publicUrl,
    locale: locale as AppLocale,
    path: 'plans',
    name: t('metadata.plans.title'),
    description: t('metadata.plans.description'),
    plans: plans.map((plan) => ({
      key: plan.key,
      name: t(plan.titleKey),
      description: t(plan.descriptionKey),
      offers: Object.entries(plan.monthlyPriceByCycle).map(
        ([billingCycle, price]) => ({
          billingCycle,
          price,
          currency: 'EUR',
        }),
      ),
    })),
  });

  return (
    <PageLayout route="plans" role="main">
      <JsonLd data={planListSchema} />
      <VariantPoolsBoundary
        lang={locale}
        types={['social-proof-names', 'social-proof-locations']}
      >
        <PlansPage
          plans={plans}
          features={featuresResult.success ? featuresResult.data : []}
          urgencyConfig={config.subscription.urgency}
          socialProofConfig={config.subscription.socialProof}
        />
      </VariantPoolsBoundary>
    </PageLayout>
  );
}
