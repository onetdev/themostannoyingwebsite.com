import type { Point2d } from '@maw/utils/math';
import type { SpriteConfig } from './schemas';

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
