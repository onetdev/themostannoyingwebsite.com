import {
  ArticleSearchQeurySchema,
  type ArticleSearchQuery,
} from '@maw/content-api/schemas';
import { deepmerge } from 'deepmerge-ts';
import { NextResponse } from 'next/server';
import { getDependencyContainer } from '@/core/di';
import { getAppArticleService } from '@/features/content/services';

const defaultParams: ArticleSearchQuery = {
  params: {
    query: '',
    locale: 'en',
  },
  paginate: {
    take: 10,
    skip: 0,
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedParams = ArticleSearchQeurySchema.parse(
    Object.fromEntries(searchParams),
  );
  const params = deepmerge(defaultParams, parsedParams);

  const container = getDependencyContainer();
  const articleService = getAppArticleService(container);

  const results = await articleService.search(params);

  return NextResponse.json(results);
}
