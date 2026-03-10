import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDependencyContainer } from '@/core/di';
import { CommentService } from '@/features/comments/services';
import { ArticleItemPage } from '@/features/content/components';
import { getArticleService } from '@/features/content/services';
import i18nConfig from '@/root/i18n.config';
import { PageLayout } from '../../_components/PageLayout';

type PageParams = {
  slug: string;
  locale: string;
};

type PageProps = NextPageProps<PageParams>;

export const revalidate = 1800;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const lookup = { slug, locale };
  const container = getDependencyContainer();
  const articleService = await getArticleService(container);
  const data = await articleService.getByLookup(lookup);

  if (!data) {
    return {};
  }

  const allTranslations = (
    await articleService.getMany({
      params: { id: data.id },
      paginate: { take: -1 },
    })
  ).items;

  const canonicalTranslation =
    allTranslations.find((t) => t.locale === i18nConfig.defaultLocale) ||
    allTranslations[0];

  const languages = Object.fromEntries(
    allTranslations.map((t) => [t.locale, `/${t.locale}/articles/${t.slug}`]),
  );

  return {
    title: data.title,
    alternates: {
      canonical: `/${canonicalTranslation.locale}/articles/${canonicalTranslation.slug}`,
      languages,
    },
    openGraph: {
      title: data.title,
      description: data.intro,
      images: data.coverImages?.original,
    },
  };
}

export const generateStaticParams = async () => {
  const locales = i18nConfig.locales;
  const paths: PageParams[] = [];

  const container = getDependencyContainer();
  const articleService = await getArticleService(container);
  for (const locale of locales) {
    const articles = await articleService.getMany({
      params: { locale },
      paginate: { take: -1 },
    });

    articles.items.forEach((article) => {
      paths.push({ slug: article.slug, locale });
    });
  }

  return paths;
};

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  const lookup = { slug, locale };

  const container = getDependencyContainer();
  const articleService = await getArticleService(container);
  const datum = await articleService.getByLookup(lookup);

  if (!datum) {
    return notFound();
  }

  const comments = await new CommentService().getByArticle(datum);

  return (
    <PageLayout
      activeItem="article-item"
      role="main"
      data-testid="article-item"
    >
      <ArticleItemPage article={datum} comments={comments} />
    </PageLayout>
  );
}
