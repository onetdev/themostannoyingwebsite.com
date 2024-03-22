import { NextPage } from 'next';

import { makeI18nStaticProps } from '@/utils/i18n';

const Error404: NextPage = () => {
  return (
    <main>
      <h1>Error 404</h1>
      <p>The page could not be loaded :((((</p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps(['common']);
export default Error404;
