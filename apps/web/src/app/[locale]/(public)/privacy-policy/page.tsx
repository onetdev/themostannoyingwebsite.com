import { getLogger } from '@maw/logger';
import { PageHeadline } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { loadLocaleMdx } from '@/core/i18n/load-locale-mdx';
import { PageLayout } from '../_components/PageLayout';
import { TranslationDisclaimer } from '../_components/TranslationDisclaimer';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.privacyPolicy',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// Privacy policy inspired by https://matomo.org/privacy-policy/
export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const logger = getLogger();

  try {
    const Content = await loadLocaleMdx(
      locale,
      (l) => import(`./_i18n/${l}.mdx`),
    );

    return (
      <PageLayout activeItem="privacy-policy" role="main">
        <PageHeadline className="mx-auto w-full max-w-screen-md">
          {t('navigation.privacyPolicy')}
        </PageHeadline>
        <div className={styles.content}>
          <TranslationDisclaimer
            currentLocale={locale}
            href="/privacy-policy"
          />
          <Content />
        </div>
      </PageLayout>
    );
  } catch (_err) {
    logger.debug(_err, 'Privacy policy not found, redirecting to 404');
    notFound();
  }
}
