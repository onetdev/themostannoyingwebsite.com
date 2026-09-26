import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { WebPageStructuredData } from '@/core/seo';
import { DilfPage } from '@/features/marketing/components';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.dilf' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const locale = (await getLocale()) as AppLocale;

  return (
    <PageLayout route="dilf" role="main">
      <WebPageStructuredData
        locale={locale}
        path="dilf"
        namespace="metadata.dilf"
      />
      <DilfPage />
    </PageLayout>
  );
}
