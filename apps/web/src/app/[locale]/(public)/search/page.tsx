import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { SearchPage } from '@/features/content/components';
import { VariantPoolsBoundary } from '@/features/content/components/VariantPoolsBoundary';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.search' });

  return {
    title: t('title'),
    description: t('description'),
    robots: NOINDEX_ROBOTS,
  };
}

export default async function Page() {
  const locale = (await getLocale()) as LanguageCode;

  return (
    <PageLayout route="search" role="main">
      <VariantPoolsBoundary lang={locale} types={['top-searches']}>
        <SearchPage />
      </VariantPoolsBoundary>
    </PageLayout>
  );
}
