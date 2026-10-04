import type { LanguageCode } from '@maw/content-sdk';
import { getDependencyContainer } from '@/core/di';
import { buildBlog, getSeoContext, JsonLd } from '@/core/seo';
import { getArticleService } from '@/features/content/services';
import { HomePage } from './_components/HomePage';
import { PageLayout } from './_components/PageLayout';

export { generateStaticParams } from '@/core/i18n/routing';

export const revalidate = 1800;

export default async function Page({ params }: NextPageProps) {
  const { locale } = await params;
  const container = getDependencyContainer();
  const articleService = await getArticleService(container);

  const [coverResponse, articlePool] = await Promise.all([
    articleService.list({
      is_featured: true,
      lang: locale as LanguageCode,
      limit: 1,
    }),
    articleService.list({
      is_featured: false,
      lang: locale as LanguageCode,
      limit: 14,
    }),
  ]);

  const coverArticle = coverResponse.items[0];
  const denseArticleList = articlePool.items.slice(0, 2);
  const smallCoverArticleList = articlePool.items.slice(2, 14);

  const appLocale = locale as AppLocale;
  const seoContext = await getSeoContext(appLocale);
  const blogSchema = buildBlog({
    ...seoContext,
    name: seoContext.siteName,
    description: seoContext.description,
    posts: [
      ...(coverArticle ? [coverArticle] : []),
      ...denseArticleList,
      ...smallCoverArticleList,
    ].map((article) => ({
      path: `articles/${article.slug}`,
      headline: article.title,
      description: article.summary,
      datePublished: article.published_at,
    })),
  });

  return (
    <PageLayout
      route="home"
      className="grid grid-cols-1 gap-x-5 gap-y-5 px-5 lg:grid-cols-4 lg:gap-y-0 xl:px-8"
      autoPadding={false}
      role="main"
    >
      <JsonLd data={blogSchema} />
      <HomePage
        coverArticle={coverArticle}
        denseArticleList={denseArticleList}
        smallCoverArticleList={smallCoverArticleList}
      />
    </PageLayout>
  );
}
