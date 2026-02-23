import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/app/_components/PageLayout';
import { FlaimSurvey } from '@/features/promotion/components/FlaimSurvey';
export { generateStaticParams } from '@/i18n/routing';

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

  return (
    <PageLayout
      role="main"
      className="mx-auto max-w-screen-lg py-0 md:py-14"
      autoPadding={false}>
      <h1>{t('gifts.wanPhone.title')}</h1>
      <FlaimSurvey
        className="my-5 w-full"
        settings={{ timeLimitInSeconds: 8 }}
      />
    </PageLayout>
  );
}
