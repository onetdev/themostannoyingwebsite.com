import DummyArticle from './dummy-article';
import InusLikely from './inus-likely';
import MonkeyAttack from './monkey-attack';
import SmellyFootBreakout from './smelly-foot-breakout';

import { Article } from '@/types';

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
