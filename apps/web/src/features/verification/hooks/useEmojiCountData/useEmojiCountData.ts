'use client';

import { random } from '@maw/utils/math';
import { useMemo } from 'react';
import type { EmojiCountChallengeEntryMeta } from '../../types';
import { CAPTCHA_EMOJI_DEFAULT_POOL } from './data';

export interface UseEmojiEmojiDataProps {
  count?: number;
  pool?: string[];
}

export function useEmojiCountData({
  count = 100,
  pool = CAPTCHA_EMOJI_DEFAULT_POOL,
}: UseEmojiEmojiDataProps) {
  const data = useMemo(() => {
    const counts = new Map<string, number>();
    const items: EmojiCountChallengeEntryMeta[] = [];
    for (let i = 0; i < count; i++) {
      const x = random(0, 1);
      const y = random(0, 1);
      const content = pool[Math.floor(Math.random() * pool.length)];

      items.push({ content, coords: { x, y } });
      counts.set(content, (counts.get(content) ?? 0) + 1);
    }

    const maxOccurance = Math.max(...counts.values());
    const solutions = Object.entries(Object.fromEntries(counts))
      .filter(([, count]) => count === maxOccurance)
      .map(([content]) => content);

    return { items, solutions };
  }, [count, pool]);

  return data;
}
