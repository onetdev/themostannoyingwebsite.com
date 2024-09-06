import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import config from '@/config';
import { makeI18nStaticProps } from '@/utils/i18n';
import SiteTitle from '@/components/atoms/SiteTitle';

const Contact: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <main>
      <SiteTitle>{t('navigation.contact')}</SiteTitle>
      <h1>{t('navigation.contact')}</h1>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Contact;
