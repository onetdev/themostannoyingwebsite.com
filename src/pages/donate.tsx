import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { makeI18nStaticProps } from '@/utils/i18n';

const Donate: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t('navigation.donate')}</h1>
      <p className="my-5 max-w-screen-md">{t('donate.description')}</p>
      <Link href="https://onet.dev/donate" target="_blank">
        {t('donate.donateLink')} 👈
      </Link>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Donate;
