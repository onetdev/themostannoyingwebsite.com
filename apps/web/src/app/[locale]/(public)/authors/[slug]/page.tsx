import type { LanguageCode } from '@maw/content-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import config from '@/core/config';
import { getDependencyContainer } from '@/core/di';
import { buildAuthor, buildBreadcrumbList, JsonLd } from '@/core/seo';
import { AuthorPage } from '@/features/content/components';
import {
  getArticleService,
  getAuthorService,
} from '@/features/content/services';
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
  const authorService = getAuthorService(container);
  const author = await authorService.getBySlug(slug, locale as LanguageCode);

  if (!author) {
    return {};
  }

  // Author slugs are locale-independent, so every configured locale exposes the
  // same profile path with localized byline/persona/biography content.
  const languages = Object.fromEntries(
    i18nConfig.locales.map((lang) => [
      lang,
      `/${lang}/authors/${author.slug}/`,
    ]),
  );

  return {
    title: author.name,
    description: author.about,
    alternates: {
      canonical: `/${locale}/authors/${author.slug}/`,
      languages: {
        ...languages,
        'x-default': `/${i18nConfig.defaultLocale}/authors/${author.slug}/`,
      },
    },
    openGraph: {
      title: author.name,
      description: author.about,
      type: 'profile',
    },
  };
}

export const generateStaticParams = async () => {
  const locales = i18nConfig.locales;
  const paths: PageParams[] = [];

  const container = getDependencyContainer();
  const authorService = getAuthorService(container);
  const authors = await authorService.listAll();

  for (const locale of locales) {
    for (const author of authors) {
      paths.push({ slug: author.slug, locale });
    }
  }

  return paths;
};

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;

  const container = getDependencyContainer();
  const authorService = getAuthorService(container);
  const articleService = getArticleService(container);

  const author = await authorService.getBySlug(slug, locale as LanguageCode);

  if (!author) {
    return notFound();
  }

  const articles = await articleService.listAll({
    author: slug,
    lang: locale as LanguageCode,
    order: 'desc',
  });

  const appLocale = locale as AppLocale;
  const navigation = await getTranslations({
    locale,
    namespace: 'common.navigation',
  });
  const authorPath = `authors/${author.slug}`;

  const authorSchema = buildAuthor({
    baseUrl: config.deploymentMeta.publicUrl,
    locale: appLocale,
    path: authorPath,
    name: author.name,
    persona: author.persona,
    about: author.about,
    articles: articles.map((article) => ({
      path: `articles/${article.slug}`,
      headline: article.title,
      description: article.summary,
      datePublished: article.published_at,
    })),
  });

  const breadcrumbSchema = buildBreadcrumbList(
    config.deploymentMeta.publicUrl,
    appLocale,
    [
      { name: navigation('home'), path: '' },
      { name: author.name, path: authorPath },
    ],
  );

  return (
    <PageLayout route="author.single" role="main" data-testid="author-item">
      <JsonLd data={[authorSchema, breadcrumbSchema]} />
      <AuthorPage author={author} articles={articles} />
    </PageLayout>
  );
}
