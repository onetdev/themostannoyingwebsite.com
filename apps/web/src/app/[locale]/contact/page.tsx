import { PageHeadline } from '@maw/ui-lib';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PageLayout } from '@/components/PageLayout';
import { getAppConfigService } from '@/kernel';
export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;
const config = getAppConfigService().getDeploymentMeta();

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <PageLayout activeItem="contact" role="main">
      <PageHeadline>{t('navigation.contact')}</PageHeadline>
      <p>
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </PageLayout>
  );
}
