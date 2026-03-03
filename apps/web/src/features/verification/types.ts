import type { Point2d } from '@maw/utils/math';

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
