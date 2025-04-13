import { PageHeadline } from '@maw/ui';
import styles from '@maw/ui/content.module.css';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export { generateStaticParams } from '@/i18n/routing';
export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.donate' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <main role="main">
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
}
