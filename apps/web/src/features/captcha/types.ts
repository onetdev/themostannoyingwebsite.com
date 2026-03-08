import type { Point2d } from '@maw/utils/math';
import type captchaEnLocale from './i18n/en';
import type { SpriteConfig } from './schemas';

export type ChallengeStatus =
  | 'idle'
  | 'loading'
  | 'challenge'
  | 'failed'
  | 'resolved';

export type CaptchaI18nShape = typeof captchaEnLocale;

export interface EmojiCountChallengeEntryMeta {
  content: string;
  coords: Point2d;
}

export interface TilePuzzleEntryMeta {
  current: Point2d;
  resolution: Point2d;
  isEmpty: boolean;
  isCorrect: boolean;
}

export interface TaxonomyEntryMeta {
  asset: SpriteConfig;
  col: number;
  isValid: boolean;
  isSelected: boolean;
  row: number;
}
