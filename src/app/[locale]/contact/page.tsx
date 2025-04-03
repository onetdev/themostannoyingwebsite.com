import { Metadata } from 'next';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import config from '@/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('navigation.contact'),
  };
}


export default async function Page() {
  const t = await getTranslations();

  return (
    <main>
      <SiteTitle>{t('navigation.contact')}</SiteTitle>
      <PageHeadline>{t('navigation.contact')}</PageHeadline>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
};
