import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import { makeI18nStaticProps } from '@/lib/utils/i18n';
import styles from '@/styles/content.module.css';

const Donate: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <SiteTitle>{t('navigation.donate')}</SiteTitle>
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

export const getStaticProps = makeI18nStaticProps();
export default Donate;
