import {
  type ArticleSearchQuery,
  ArticleSearchQuerySchema,
} from '@maw/content-api/schemas';
import { err, ok } from '@maw/utils/result';
import { deepmerge } from 'deepmerge-ts';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { getDependencyContainer } from '@/core/di';
import { getArticleService } from '@/features/content/services';

const defaultParams: ArticleSearchQuery = {
  params: {
    query: '',
    locale: 'en',
  },
  paginate: {
    take: 20,
    skip: 0,
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsedParams = ArticleSearchQuerySchema.safeParse({
    params: {
      query: searchParams.get('query') || undefined,
      locale: searchParams.get('locale') || undefined,
    },
    paginate: {
      take: searchParams.get('take') || undefined,
      skip: searchParams.get('skip') || undefined,
    },
  });

  if (!parsedParams.success) {
    return NextResponse.json(
      err({
        message: 'Invalid query parameters',
        details: {
          error: z.flattenError(parsedParams.error),
        },
      }),
      {
        status: 422,
      },
    );
  }

  const params = deepmerge(
    defaultParams,
    parsedParams.success ? parsedParams.data : {},
  );

  const container = getDependencyContainer();
  const articleService = await getArticleService(container);

  const results = await articleService.search(params);

  return NextResponse.json(ok(results));
}
