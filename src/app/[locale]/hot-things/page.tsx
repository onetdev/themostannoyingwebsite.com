import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HotThingsPage from './hot-things-page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('navigation.hotThings'),
  };
}

export default function Page() {
  return (
    <HotThingsPage />
  );
};
