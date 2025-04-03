import { Metadata } from 'next';
import Error from 'next/error';

import { ArticleService } from '@/features/content';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArticleItemPage } from './article-item-page';
import i18nConfig from '@/root/i18n.config';
import { notFound } from 'next/navigation';

type ArticleItemProps = {
  slug: string;
  locale: string;
};

export async function generateMetadata({ params }: { params: Promise<ArticleItemProps> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const lookup = { slug, locale };
  const data = ArticleService.getByLookup(lookup);

  return {
    title: data?.title,
    openGraph: {
      title: data?.title,
      description: data?.intro,
      images: data?.coverImages?.original,
    }
  };
}

export const generateStaticParams = async () => {
  const locales = i18nConfig.locales;
  const paths: { slug: string; locale: string }[] = [];

  for (const locale of locales) {
    const articles = ArticleService.getMany({
      params: { locale },
      paginate: { take: -1 },
    });

    articles.items.forEach((article) => {
      paths.push({ slug: article.slug, locale });
    });
  }

  return paths;
};

export default async function Page({ params }: { params: ArticleItemProps }) {
  const locale = await getLocale()
  const lookup = { slug: params.slug, locale };
  const data = ArticleService.getByLookup(lookup);

  if (!data) {
    return notFound();
  }

  return (
    <ArticleItemPage data={data} />
  );
};
