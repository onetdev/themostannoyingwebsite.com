import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DilfFinder } from '@/features/gifts';

export { generateStaticParams } from '@/i18n/routing';
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
  const t = await getTranslations();

  return (
    <main role="main">
      <h1>{t('gifts.dilf.fullTitle')}</h1>
      <p className="my-5 max-w-screen-md">{t('gifts.dilf.description')}</p>
      <DilfFinder />
    </main>
  );
}
