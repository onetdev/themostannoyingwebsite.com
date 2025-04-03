import { Metadata, NextPage } from 'next';

import { FlaimSurvery } from '@/features/gifts';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('gifts.wanPhone.title'),
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
