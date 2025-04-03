import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import styles from '@/styles/content.module.css';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('navigation.donate'),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <main>
      <PageHeadline className="mx-auto w-full max-w-screen-md">
        {t('navigation.donate')}
      </PageHeadline>
      <div className={styles['content']}>
        <div className="my-5 max-w-screen-md">
          {t('app.donate.description')}
        </div>
        <p>
          <Link href="https://onet.dev/donate" target="_blank">
            {t('app.donate.donateLinkText')} 👈
          </Link>
        </p>
      </div>
    </main>
  );
};

