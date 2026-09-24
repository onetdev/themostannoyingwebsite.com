import type { ContentApiClient, LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/core/i18n/routing';

import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { getVariantPool } from '@/features/content/services';
import { DI as DIContent } from '@/features/content/types';
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
  const contentClient = container.get<ContentApiClient>(
    DIContent.ContentApiClient,
  );
  const [namesPool, locationsPool] = await Promise.all([
    getVariantPool<string>(contentClient, locale, 'social-proof-names'),
    getVariantPool<string>(contentClient, locale, 'social-proof-locations'),
  ]);

  return (
    <PageLayout route="plans" role="main">
      <PlansPage
        plans={plansResult.success ? plansResult.data : []}
        features={featuresResult.success ? featuresResult.data : []}
        urgencyConfig={config.subscription.urgency}
        socialProofConfig={config.subscription.socialProof}
        socialProofPool={{
          ...(namesPool?.items.length ? { names: namesPool.items } : {}),
          ...(locationsPool?.items.length
            ? { locations: locationsPool.items }
            : {}),
        }}
      />
    </PageLayout>
  );
}
