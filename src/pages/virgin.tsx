import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { makeI18nStaticProps } from '@/lib/utils/i18n';
import styles from '@/styles/content.module.css';

const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation('common');
  const allDisabled = useExperienceFlagsStore((state) => state.allDisabled);

  useEffect(() => {
    allDisabled();
  }, [allDisabled]);

  return (
    <main>
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

export const getStaticProps = makeI18nStaticProps();
export default PrivacyPolicy;
