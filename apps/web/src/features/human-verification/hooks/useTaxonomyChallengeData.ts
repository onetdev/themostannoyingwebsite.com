'use client';

import { randomInt } from '@maw/utils/math';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import type { SpriteConfig } from '../schemas';
import type { TaxonomyEntryMeta } from '../types';

export interface TaxonomyChallengeProps {
  cols: number;
  rows: number;
}

export function useTaxonomyChallengeData({
  cols,
  rows,
}: TaxonomyChallengeProps) {
  const [validCount, setValidCount] = useState(0);
  const [items, setItems] = useState<TaxonomyEntryMeta[]>([]);
  const {
    verification: {
      assets: { taxonomyChallengeSprites },
    },
  } = useAppConfigContext();

  const poolLength = useMemo(
    () =>
      taxonomyChallengeSprites.reduce(
        (acc, item) => acc + item.columns * item.rows,
        0,
      ),
    [taxonomyChallengeSprites],
  );

  const getRandomItem = useCallback(() => {
    const globalIndex = randomInt(0, poolLength);
    const details = resolveIndex(taxonomyChallengeSprites, globalIndex);

    return {
      asset: taxonomyChallengeSprites[details.assetIndex],
      col: details.col,
      isValid: false,
      row: details.row,
      isSelected: false,
    };
  }, [poolLength, taxonomyChallengeSprites]);

  useEffect(() => {
    if (poolLength === 0) {
      return;
    }

    const initialTiles: TaxonomyEntryMeta[] = [];
    const itemsLimit = cols * rows;
    for (let i = 0; i < itemsLimit; i++) {
      initialTiles.push(getRandomItem());
    }
    setItems(initialTiles);
  }, [cols, poolLength, rows, getRandomItem]);

  const handleSelect = (index: number) => {
    const item = items[index];
    const newSelected = !item.isSelected;
    const newTiles = [...items];

    if (item.isValid && newSelected) {
      newTiles[index] = getRandomItem();
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

type IndexResult = {
  assetIndex: number;
  row: number;
  col: number;
};

function resolveIndex(files: SpriteConfig[], globalIndex: number): IndexResult {
  let accumulated = 0;

  for (let i = 0; i < files.length; i++) {
    const { rows, columns } = files[i];
    const size = rows * columns;

    if (globalIndex < accumulated + size) {
      const localIndex = globalIndex - accumulated;
      const row = Math.floor(localIndex / columns);
      const col = localIndex % columns;

      return { assetIndex: i, row, col };
    }

    accumulated += size;
  }

  throw new Error('Index out of bounds');
}
