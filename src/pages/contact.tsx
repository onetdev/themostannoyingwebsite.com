import { NextPage } from 'next';

import config from '@/config';
import { makeI18nStaticProps } from '@/utils/i18n';

const Contact: NextPage = () => {
  return (
    <main>
      <h1>Contact page</h1>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps(['common']);
export default Contact;
