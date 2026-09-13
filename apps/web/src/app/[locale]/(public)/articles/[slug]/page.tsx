import {
  type LanguageCode,
  renderMarkdown,
  toCoverImages,
} from '@maw/content-sdk';
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
  const container = getDependencyContainer();
  const articleService = await getArticleService(container);
  const data = await articleService.getBySlug(slug, locale as LanguageCode);

  if (!data) {
    return {};
  }

  const allTranslations = data.translations ?? [];
  const canonicalTranslation = allTranslations.find(
    (t) => t.lang === i18nConfig.defaultLocale,
  ) ||
    allTranslations[0] || { lang: locale, slug };

  const languages = Object.fromEntries(
    allTranslations.map((t) => [t.lang, `/${t.lang}/articles/${t.slug}`]),
  );

  const coverImages = toCoverImages(data.featured_image);

  return {
    title: data.title,
    alternates: {
      canonical: `/${canonicalTranslation.lang}/articles/${canonicalTranslation.slug}`,
      languages,
    },
    openGraph: {
      title: data.title,
      description: data.summary,
      images: coverImages?.original,
    },
  };
}

export const generateStaticParams = async () => {
  const locales = i18nConfig.locales;
  const paths: PageParams[] = [];

  const container = getDependencyContainer();
  const articleService = await getArticleService(container);
  for (const locale of locales) {
    const articles = await articleService.listAll({
      lang: locale as LanguageCode,
    });

    articles.forEach((article) => {
      paths.push({ slug: article.slug, locale });
    });
  }

  return paths;
};

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;

  const container = getDependencyContainer();
  const articleService = await getArticleService(container);
  const datum = await articleService.getBySlug(slug, locale as LanguageCode);

  if (!datum) {
    return notFound();
  }

  const comments = await new CommentService().getByArticle(datum);
  const renderedContent = renderMarkdown(datum.content);

  return (
    <PageLayout route="article.single" role="main" data-testid="article-item">
      <ArticleItemPage
        article={datum}
        comments={comments}
        renderedContent={renderedContent}
      />
    </PageLayout>
  );
}
