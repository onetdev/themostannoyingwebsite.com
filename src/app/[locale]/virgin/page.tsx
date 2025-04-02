import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import styles from '@/styles/content.module.css';
import { Metadata } from 'next';
import DisableAllOnMount from './disable-all-on-mount';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('app.virgin.title'),
  };
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main>
      <DisableAllOnMount />
      <SiteTitle>{t('app.virgin.title')}</SiteTitle>
      <PageHeadline className="mx-auto w-full max-w-screen-md">
        {t('app.virgin.title')}
      </PageHeadline>
      <div className={styles['content']}>
        <p>{t('app.virgin.description')}</p>
      </div>
    </main>
  );
};
export default Page;
