import { PageHeadline } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const t = await getTranslations();

  try {
    const Content = (await import(`./${locale}.mdx`)).default;
    return (
      <PageLayout activeItem="about" role="main">
        <PageHeadline className="mx-auto w-full max-w-screen-md">
          {t('navigation.about')}
        </PageHeadline>
        <div className={styles['content']}>
          <Content />
        </div>
      </PageLayout>
    );
  } catch (_err) {
    return notFound();
  }
}
