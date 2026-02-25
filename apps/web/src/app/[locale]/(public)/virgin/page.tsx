import { PageHeadline } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import DisableAllOnMount from './disable-all-on-mount';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
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
    <PageLayout activeItem="virgin" role="main">
      <DisableAllOnMount />
      <PageHeadline className="mx-auto w-full max-w-screen-md">
        {t('app.virgin.title')}
      </PageHeadline>
      <div className={styles['content']}>
        <p>{t('app.virgin.description')}</p>
      </div>
    </PageLayout>
  );
}
export default Page;
