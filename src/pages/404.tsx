import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Error404() {
  return (
    <main>
      <h1>Error 404</h1>
      <p>The page could not be loaded :((((</p>
    </main>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
