import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { WebPageStructuredData } from '@/core/seo';
import { ContentPoolsBoundary } from '@/features/content/components/ContentPoolsBoundary';
import { FlaimSurveyPage } from '@/features/marketing/components';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.wanPhone' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations();
  const locale = (await getLocale()) as LanguageCode;

  return (
    <PageLayout
      role="main"
      className="mx-auto max-w-screen-lg py-0 md:py-14"
      autoPadding={false}
    >
      <WebPageStructuredData
        locale={locale as AppLocale}
        path="flaim-a-phone"
        namespace="metadata.wanPhone"
      />
      <h1>{t('marketing.wanPhone.title')}</h1>
      <ContentPoolsBoundary lang={locale} types={['survey']}>
        <FlaimSurveyPage
          className="my-5 w-full"
          settings={{ timeLimitInSeconds: 8 }}
        />
      </ContentPoolsBoundary>
    </PageLayout>
  );
}
