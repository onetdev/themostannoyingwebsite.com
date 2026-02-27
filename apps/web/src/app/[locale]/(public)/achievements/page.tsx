import { PageHeadline } from '@maw/ui-lib';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AchievementList } from '@/features/achievements/components';
import { PageLayout } from '../_components/PageLayout';

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: NextPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata.achievements',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AchievementsPage() {
  const t = await getTranslations('achievements');

  return (
    <PageLayout activeItem="achievements" role="main">
      <PageHeadline>{t('title')}</PageHeadline>
      <p className="text-muted-foreground mb-10 max-w-4xl text-lg">
        {t('description')}
      </p>

      <AchievementList />
    </PageLayout>
  );
}
