'use client';

import { randomArrayEntry, randomBool } from '@maw/utils/random';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppConfigContext } from '@/core/config/react/AppConfig';
import type { SpriteConfig } from '../schemas';
import type { TaxonomyEntryMeta } from '../types';

export interface TaxonomyChallengeProps {
  cols: number;
  rows: number;
}

export interface TileCoordinates {
  asset: SpriteConfig;
  row: number;
  col: number;
}

/**
 * Precomputes the full pool of cell coordinates across all sprite sheets.
 */
export function buildTilePool(sprites: SpriteConfig[]): TileCoordinates[] {
  return sprites.flatMap((sprite) =>
    Array.from({ length: sprite.rows * sprite.columns }, (_, i) => ({
      asset: sprite,
      row: Math.floor(i / sprite.columns),
      col: i % sprite.columns,
    })),
  );
}

export function useTaxonomyChallengeData({
  cols,
  rows,
}: TaxonomyChallengeProps) {
  const [validCount, setValidCount] = useState(0);
  const [items, setItems] = useState<TaxonomyEntryMeta[]>([]);
  const {
    captcha: {
      assets: { taxonomyChallengeSprites },
    },
  } = useAppConfigContext();

  const tilePool = useMemo(
    () => buildTilePool(taxonomyChallengeSprites),
    [taxonomyChallengeSprites],
  );

  const getRandomItem = useCallback((): TaxonomyEntryMeta | null => {
    const tile = randomArrayEntry(tilePool);
    if (!tile) {
      return null;
    }

    return {
      asset: tile.asset,
      row: tile.row,
      col: tile.col,
      isValid: randomBool(),
      isSelected: false,
    };
  }, [tilePool]);

  useEffect(() => {
    if (tilePool.length === 0) {
      return;
    }

    const initialTiles: TaxonomyEntryMeta[] = [];
    const itemsLimit = cols * rows;
    for (let i = 0; i < itemsLimit; i++) {
      const item = getRandomItem();
      if (item) {
        initialTiles.push(item);
      }
    }
    setItems(initialTiles);
  }, [cols, rows, tilePool.length, getRandomItem]);

  const handleSelect = (index: number) => {
    const item = items[index];
    if (!item) {
      return;
    }

    const newSelected = !item.isSelected;
    const newTiles = [...items];

    if (item.isValid && newSelected) {
      const nextItem = getRandomItem();
      if (nextItem) {
        newTiles[index] = nextItem;
      }
      setValidCount((prev) => prev + 1);
    } else {
      newTiles[index] = { ...item, isSelected: newSelected };
    }
    setItems(newTiles);
  };

  return {
    cols,
    rows,
    items,
    validCount,
    handleSelect,
  };
}
