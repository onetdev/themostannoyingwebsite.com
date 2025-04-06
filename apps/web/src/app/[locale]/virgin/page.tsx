import PageHeadline from '@/root/apps/web/src/components/atoms/PageHeadline';
import styles from '@/styles/content.module.css';
import { Metadata } from 'next';
import DisableAllOnMount from './disable-all-on-mount';
import { getTranslations } from 'next-intl/server';

export { generateStaticParams } from '@/root/apps/web/src/i18n/routing';
export const revalidate = 1800;

export async function generateMetadata({ params }: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.virgin' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

async function Page() {
  const t = await getTranslations();

  return (
    <main role="main">
      <DisableAllOnMount />
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
