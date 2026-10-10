import { PageHeadline } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import { cn } from '@maw/ui-lib/utils';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { WebPageStructuredData } from '@/core/seo';
import { ShareButton } from '@/features/share/components';
import { NarrowPageLayout } from '../_components/NarrowPageLayout';
import DisableAllOnMount from './disable-all-on-mount';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.virgin' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

async function Page() {
  const t = await getTranslations();
  const locale = (await getLocale()) as AppLocale;

  return (
    <NarrowPageLayout
      route="virgin"
      role="main"
      maxWidthClassName="max-w-screen-md"
    >
      <WebPageStructuredData
        locale={locale}
        path="virgin"
        namespace="metadata.virgin"
      />
      <DisableAllOnMount />
      <PageHeadline className="w-full" actions={<ShareButton />}>
        {t('common.app.virgin.title')}
      </PageHeadline>
      <div className={cn(styles.content, styles.contentFlush)}>
        <p>{t('common.app.virgin.description')}</p>
      </div>
    </NarrowPageLayout>
  );
}
export default Page;
