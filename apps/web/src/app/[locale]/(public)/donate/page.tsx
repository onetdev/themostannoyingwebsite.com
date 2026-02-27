import { PageHeadline } from '@maw/ui-lib';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DonationPage } from '@/features/donation/components';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/i18n/routing';

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

  return (
    <PageLayout activeItem="donate" role="main">
      <PageHeadline className="mx-auto w-full">
        {t('navigation.donate')}
      </PageHeadline>
      <DonationPage />
    </PageLayout>
  );
}
