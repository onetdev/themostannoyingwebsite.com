'use client';

import { useDiContext } from '@/core/di/react-di';
import { type ArticleService, DI } from '../types';

export const useAppArticleService = (): ArticleService => {
  const { container } = useDiContext();
  return container.get<ArticleService>(DI.AppArticleService);
};
