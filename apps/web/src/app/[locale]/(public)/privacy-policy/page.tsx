import { getLogger } from '@maw/logger';
import { PageHeadline } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageLayout } from '../_components/PageLayout';

export { generateStaticParams } from '@/i18n/routing';

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
    const Content = (await import(`./${locale}.mdx`)).default;

    return (
      <PageLayout activeItem="privacy-policy" role="main">
        <PageHeadline className="mx-auto w-full max-w-screen-md">
          {t('navigation.privacyPolicy')}
        </PageHeadline>
        <div className={styles.content}>
          {locale !== 'en' && (
            <p className="border-border bg-muted/30 mb-8 border-l-4 py-4 pl-4 text-sm italic">
              {t.rich('app.privacyPolicyDisclaimer', {
                linkTag: (chunks) => (
                  <Link
                    href="/privacy-policy"
                    locale="en"
                    className="hover:underline font-bold"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          )}
          <Content />
        </div>
      </PageLayout>
    );
  } catch (_err) {
    logger.debug(_err, 'Privacy policy not found, redirecting to 404');
    notFound();
  }
}
