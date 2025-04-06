import { Metadata } from 'next';

import PageHeadline from '@/root/apps/web/src/components/atoms/PageHeadline';
import config from '@/root/apps/web/src/config';
import { getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/root/apps/web/src/i18n/routing';
export const revalidate = 1800;

export async function generateMetadata({ params }: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <main role="main">
      <PageHeadline>{t('navigation.contact')}</PageHeadline>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
};
