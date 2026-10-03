import { PageHeadline } from '@maw/ui-lib';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { buildSimpleItemList, JsonLd, WebPageStructuredData } from '@/core/seo';
import { AchievementList } from '@/features/achievements/components';
import { getAchievementBankService } from '@/features/achievements/services';
import { PageLayout } from '../_components/PageLayout';

export const revalidate = 1800;

export { generateStaticParams } from '@/core/i18n/routing';

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
  const tApp = await getTranslations();
  const locale = (await getLocale()) as AppLocale;

  const achievementBank = getAchievementBankService(getDependencyContainer());
  const itemListSchema = buildSimpleItemList({
    baseUrl: config.deploymentMeta.publicUrl,
    locale,
    path: 'achievements',
    name: t('title'),
    description: t('description'),
    items: achievementBank
      .getAchievements()
      .filter((achievement) => !achievement.secret)
      .map((achievement) => ({ name: tApp(achievement.nameKey) })),
  });

  return (
    <PageLayout route="achievements" role="main">
      <WebPageStructuredData
        locale={locale}
        path="achievements"
        namespace="metadata.achievements"
      />
      <JsonLd data={itemListSchema} />
      <PageHeadline>{t('title')}</PageHeadline>
      <p className="text-muted-foreground mb-10 max-w-4xl text-lg">
        {t('description')}
      </p>

      <AchievementList />
    </PageLayout>
  );
}
