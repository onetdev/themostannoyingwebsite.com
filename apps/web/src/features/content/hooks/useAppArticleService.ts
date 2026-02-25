'use client';

import { type ArticleService, DI } from '../types';

import { useDependencyContainer } from '@/contexts/DependencyContainer';

export const useAppArticleService = (): ArticleService => {
  const { container } = useDependencyContainer();
  return container.get<ArticleService>(DI.AppArticleService);
};
