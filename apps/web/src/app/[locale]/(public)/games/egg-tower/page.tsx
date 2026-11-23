import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { NOINDEX_ROBOTS } from '@/core/seo/robots';
import { EggTowerPage } from '@/features/marketing/components';
import { PageLayout } from '../../_components/PageLayout';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.eggTower' });

  return {
    title: t('title'),
    description: t('description'),
    robots: NOINDEX_ROBOTS,
  };
}

export default function Page() {
  return (
    <PageLayout route="games.egg-tower" role="main">
      <EggTowerPage />
    </PageLayout>
  );
}
