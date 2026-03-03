'use client';

import { arrayShuffle } from '@maw/utils/array';
import type { Point2d } from '@maw/utils/math';
import { useEffect, useMemo, useState } from 'react';
import type { TilePuzzleEntryMeta } from '../types';

interface UseTilePuzzleDataProps {
  cols: number;
  rows: number;
  onResolved: () => void;
}

export function useTilePuzzleData({
  cols,
  rows,
  onResolved,
}: UseTilePuzzleDataProps) {
  const [items, setItems] = useState<TilePuzzleEntryMeta[]>([]);

  // Generating the puzzle
  useEffect(() => {
    const coordSeries: Point2d[] = [];
    const resolutionSeries: Point2d[] = [];

    for (let x = 1; x <= cols; x++) {
      for (let y = 1; y <= rows; y++) {
        coordSeries.push({ x, y });
        resolutionSeries.push({ x, y });
      }
    }

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
            (coord.x === resolution.y && coord.y === resolution.x),
        } satisfies TilePuzzleEntryMeta;
      },
      {} as Record<string, TilePuzzleEntryMeta>,
    );

    setItems(puzzle);
  }, [cols, rows]);

  // Handling slides
  const moveCell = (coords: Point2d) => {
    const emptyCellIndex = items.findIndex((cell) => cell.isEmpty);
    const cellIndex = items.findIndex(
      (cell) => cell.current.x === coords.x && cell.current.y === coords.y,
    );
    const cell = items[cellIndex];

    if (!emptyCellIndex || !cell) {
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

  const hasInvalid = useMemo(() => {
    return items.filter((cell) => !cell.isCorrect).length;
  }, [items]);

  useEffect(() => {
    if (hasInvalid) {
      return;
    }
    onResolved();
  }, [hasInvalid, onResolved]);

  return {
    items,
    hasInvalid,
    moveCell,
  };
}
