import { PageHeadline } from '@maw/ui-lib';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/app/_components/PageLayout';
import { DonationPage } from '@/features/donation/components/DonationPage';
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
