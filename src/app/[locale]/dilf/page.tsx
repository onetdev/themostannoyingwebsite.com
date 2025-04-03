import { DilfFinder } from '@/features/gifts';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('gifts.dilf.fullTitle'),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <main>
      <h1>{t('gifts.dilf.fullTitle')}</h1>
      <p className="my-5 max-w-screen-md">{t('gifts.dilf.description')}</p>
      <DilfFinder />
    </main>
  );
};
