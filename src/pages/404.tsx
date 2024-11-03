import { NextPage } from 'next';

import { makeI18nStaticProps } from '@/lib/utils/i18n';

const Error404: NextPage = () => {
  return (
    <main>
      <h1>Error 404</h1>
      <p>The page could not be loaded :((((</p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Error404;
