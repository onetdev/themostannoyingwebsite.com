import {
  type LanguageCode,
  renderMarkdown,
  toCoverImages,
} from '@maw/content-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { buildArticle, buildBreadcrumbList, JsonLd } from '@/core/seo';
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
  const xDefaultTranslation = allTranslations.find(
    (t) => t.lang === i18nConfig.defaultLocale,
  ) ?? {
    lang: locale,
    slug: data.slug,
  };

  const languages = Object.fromEntries(
    allTranslations.map((t) => [t.lang, `/${t.lang}/articles/${t.slug}/`]),
  );

  const coverImages = toCoverImages(data.featured_image);

  return {
    title: data.title,
    alternates: {
      // Self-canonical per locale: the localized URL is the canonical version,
      // and `hreflang` (incl. x-default) links it to its siblings. This keeps
      // the canonical aligned with the JSON-LD `@id`/`url`, which is also the
      // localized URL.
      canonical: `/${locale}/articles/${data.slug}/`,
      languages: {
        ...languages,
        'x-default': `/${xDefaultTranslation.lang}/articles/${xDefaultTranslation.slug}/`,
      },
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
  const appLocale = locale as AppLocale;
  const navigation = await getTranslations({ locale, namespace: 'navigation' });
  const coverImages = toCoverImages(datum.featured_image);
  const articlePath = `articles/${datum.slug}`;

  const articleSchema = buildArticle({
    baseUrl: config.deploymentMeta.publicUrl,
    locale: appLocale,
    path: articlePath,
    headline: datum.title,
    description: datum.summary,
    image: coverImages?.original,
    datePublished: datum.published_at,
    authorName: datum.author,
    keywords: datum.keywords,
    articleSection: datum.tags?.[0],
  });

  const breadcrumbSchema = buildBreadcrumbList(
    config.deploymentMeta.publicUrl,
    appLocale,
    [
      { name: navigation('home'), path: '' },
      { name: datum.title, path: articlePath },
    ],
  );

  return (
    <PageLayout route="article.single" role="main" data-testid="article-item">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <ArticleItemPage
        article={datum}
        comments={comments}
        renderedContent={renderedContent}
      />
    </PageLayout>
  );
}
