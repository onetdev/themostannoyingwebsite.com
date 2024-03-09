import { Article } from '@/types';

import DummyArticle from './articles/dummy-article';
import InusLikely from './articles/inus-likely';
import MonkeyAttack from './articles/monkey-attack';
import SmellyFootBreakout from './articles/smelly-foot-breakout';

// This is not a scalable solution but works perfecly fine for this basic
// website. No API, no database, no server, no backend.

// TODO: Add more actual articles.
export const articles: Article[] = [
  MonkeyAttack,
  SmellyFootBreakout,
  DummyArticle,
  DummyArticle,
  DummyArticle,
  InusLikely,
  DummyArticle,
  DummyArticle,
  DummyArticle,
];
