import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import config from '@/config';
import { makeI18nStaticProps } from '@/utils/i18n';

const Contact: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <main>
      <SiteTitle>{t('navigation.contact')}</SiteTitle>
      <PageHeadline>{t('navigation.contact')}</PageHeadline>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Contact;
