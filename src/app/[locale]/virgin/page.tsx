import initTranslations from '@/lib/utils/i18n';
import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import styles from '@/styles/content.module.css';
import { Metadata } from 'next';
import DisableAllOnMount from './disable-all-on-mount';
import TranslationsProvider from '@/lib/providers/TranslationProviders';

const i18nNamespaces = ['common'];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t('app.virgin.title'),
  };
}

async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <main>
        <DisableAllOnMount />
        <SiteTitle>{t('app.virgin.title')}</SiteTitle>
        <PageHeadline className="mx-auto w-full max-w-screen-md">
          {t('app.virgin.title')}
        </PageHeadline>
        <div className={styles['content']}>
          <p>{t('app.virgin.description')}</p>
        </div>
      </main>
    </TranslationsProvider>
  );
};
export default Page;
