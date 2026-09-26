import { PageHeadline } from '@maw/ui-lib';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import config from '@/core/config';
import { buildDonateAction, JsonLd, WebPageStructuredData } from '@/core/seo';
import { DonationPage } from '@/features/funding/components';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.donate' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations();
  const locale = (await getLocale()) as AppLocale;

  const donateActionSchema = buildDonateAction({
    baseUrl: config.deploymentMeta.publicUrl,
    locale,
    path: 'donate',
    name: t('metadata.donate.title'),
    description: t('metadata.donate.description'),
    targets: [
      config.funding.buyMeACoffeeUrl,
      config.funding.paypalUrl,
      config.funding.alternativeOptionsUrl,
    ],
  });

  return (
    <PageLayout route="donate" role="main">
      <WebPageStructuredData
        locale={locale}
        path="donate"
        namespace="metadata.donate"
      />
      <JsonLd data={donateActionSchema} />
      <PageHeadline className="mx-auto w-full">
        {t('navigation.donate')}
      </PageHeadline>
      <DonationPage />
    </PageLayout>
  );
}
