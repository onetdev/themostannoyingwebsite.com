import type { ArticleSearchQuery } from '@maw/content-api/schemas';
import { NextResponse } from 'next/server';
import { getDependencyContainer } from '@/core/di';
import { getArticleService } from '@/features/content/services';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query') || '';
  const locale = searchParams.get('locale') || 'en';
  const take = parseInt(searchParams.get('take') || '10', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  const params: ArticleSearchQuery = {
    params: {
      query,
      locale,
    },
    paginate: {
      take,
      skip,
    },
  };

  const container = getDependencyContainer();
  const articleService = await getArticleService(container);

  const results = await articleService.search(params);

  return NextResponse.json(results);
}
