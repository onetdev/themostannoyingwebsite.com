import { getDependencyContainer } from '@/dependency-container';
import { getAppArticleService } from '@/features/content/services';
import { HomePage } from './_components/HomePage';
import { PageLayout } from './_components/PageLayout';

export { generateStaticParams } from '@/i18n/routing';

export const revalidate = 1800;

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const container = getDependencyContainer();
  const articleService = getAppArticleService(container);
  const coverArticle = await articleService.getFirst({
    params: { isOnCover: true, locale },
    paginate: {
      take: 1,
      skip: 0,
    },
  });
  const articlePool = await articleService.getMany({
    params: { isOnCover: false },
    paginate: { take: 12 },
  });
  const denseArticleList = articlePool.items.slice(0, 2);
  const smallCoverArticleList = articlePool.items.slice(2, 16);

  return (
    <PageLayout
      activeItem="home"
      className="grid grid-cols-1 gap-x-5 gap-y-5 px-5 lg:grid-cols-4 lg:gap-y-0 xl:px-8"
      autoPadding={false}
      role="main"
    >
      <HomePage
        coverArticle={coverArticle}
        denseArticleList={denseArticleList}
        smallCoverArticleList={smallCoverArticleList}
      />
    </PageLayout>
  );
}
