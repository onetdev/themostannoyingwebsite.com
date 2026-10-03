import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { ContentPoolsBoundary } from '@/features/content/components/ContentPoolsBoundary';
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
    robots: NOINDEX_ROBOTS,
  };
}

export default async function Page() {
  const locale = (await getLocale()) as LanguageCode;

  return (
    <PageLayout route="plans.cancellation" role="main">
      <ContentPoolsBoundary lang={locale} types={['cancellation-reasons']}>
        <CancellationPage />
      </ContentPoolsBoundary>
    </PageLayout>
  );
}
