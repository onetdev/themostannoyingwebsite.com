import { Metadata, NextPage } from 'next';

import { FlaimSurvery } from '@/features/gifts';
import { getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/i18n/routing';
export const revalidate = 1800;

export async function generateMetadata({ params }: NextPageProps): Promise<Metadata> {
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
    <main className="mx-auto max-w-screen-lg py-0 md:py-14">
      <h1>{t('gifts.wanPhone.title')}</h1>
      <FlaimSurvery className="my-5 w-full" />
    </main>
  );
};
