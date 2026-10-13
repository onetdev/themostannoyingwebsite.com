'use client';

import { arrayShuffle } from '@maw/utils/array';
import type { Point2d } from '@maw/utils/math';
import { useEffect, useMemo, useState } from 'react';
import type { TilePuzzleEntryMeta } from '../types';

interface UseTilePuzzleChallengeDataProps {
  cols: number;
  rows: number;
  onProgress: (score: number) => void;
}

/**
 * Builds the coordinate and resolution series for a `cols × rows` grid, both
 * starting at (1, 1). Extracted so the grid iteration is independently testable.
 */
export function buildGridSeries(
  cols: number,
  rows: number,
): { coords: Point2d[]; resolutions: Point2d[] } {
  const coords: Point2d[] = [];
  const resolutions: Point2d[] = [];

  for (let x = 1; x <= cols; x++) {
    for (let y = 1; y <= rows; y++) {
      coords.push({ x, y });
      resolutions.push({ x, y });
    }
  }

  return { coords, resolutions };
}

export function useTilePuzzleChallengeData({
  cols,
  rows,
  onProgress,
}: UseTilePuzzleChallengeDataProps) {
  const [items, setItems] = useState<TilePuzzleEntryMeta[]>([]);

  // Generating the puzzle
  useEffect(() => {
    const { coords: coordSeries, resolutions: resolutionSeries } =
      buildGridSeries(cols, rows);

    const coordShuffle = arrayShuffle(coordSeries);
    const valueShuffle = arrayShuffle(resolutionSeries);
    const empty = valueShuffle[valueShuffle.length - 1];

    const puzzle = coordShuffle.map(
      (coord, index) => {
        const resolution = valueShuffle[index];
        return {
          current: coord,
          resolution: resolution,
          isEmpty: resolution.x === empty.x && resolution.y === empty.y,
          isCorrect:
            (resolution.x === empty.y && resolution.y === empty.x) ||
            (coord.x === resolution.x && coord.y === resolution.y),
        } satisfies TilePuzzleEntryMeta;
      },
      {} as Record<string, TilePuzzleEntryMeta>,
    );

    setItems(puzzle);
  }, [cols, rows]);

  // Handling slides
  const handleMove = (coords: Point2d) => {
    const emptyCellIndex = items.findIndex((cell) => cell.isEmpty);
    const cellIndex = items.findIndex(
      (cell) => cell.current.x === coords.x && cell.current.y === coords.y,
    );
    const cell = items[cellIndex];

    if (emptyCellIndex === -1 || !cell) {
      return;
    }

    const emptyCell = items[emptyCellIndex];
    const diffX = Math.abs(cell.current.x - emptyCell.current.x);
    const diffY = Math.abs(cell.current.y - emptyCell.current.y);
    if (diffX > 1 || diffY > 1 || diffX + diffY > 1) {
      return;
    }

    const updated = [...items];
    updated[cellIndex] = {
      ...cell,
      current: emptyCell.current,
    };
    updated[emptyCellIndex] = {
      ...emptyCell,
      current: cell.current,
    };

    setItems(updated);
  };

  const invalidCount = useMemo(() => {
    return items.filter((cell) => !cell.isCorrect).length;
  }, [items]);

  useEffect(
    () => onProgress(invalidCount === 0 ? 1 : 0),
    [invalidCount, onProgress],
  );

  return {
    items,
    invalidCount,
    handleMove,
  };
}
