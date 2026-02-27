'use client';

import { useDependencyContainer } from '@/contexts/DependencyContainer';
import { type ArticleService, DI } from '../types';

export const useAppArticleService = (): ArticleService => {
  const { container } = useDependencyContainer();
  return container.get<ArticleService>(DI.AppArticleService);
};
