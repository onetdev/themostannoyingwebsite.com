'use client';

import { isPoint2d, type Point2d } from '@maw/utils/math';
import { useMemo } from 'react';
import type { TilePuzzleEntryMeta } from '../../types';
import { TileView, type TileViewData } from './TileView';

interface TilePuzzleProps {
  className?: string;
  cols: number;
  imageSrc: string;
  items: TilePuzzleEntryMeta[];
  rows: number;
  size?: number;
  onMove: (coords: Point2d) => void;
}

export function TilePuzzle({
  className,
  cols,
  imageSrc,
  items,
  rows,
  size = 50,
  onMove,
}: TilePuzzleProps) {
  const viewData = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    const mapped = items.map(
      (cell) =>
        ({
          ...cell,
          key: genKey(cell.resolution),
          content: cell.resolution ? genKey(cell.resolution) : 'empty',
        }) satisfies TileViewData,
    );
    return mapped;
  }, [items]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: cols * size,
        height: rows * size,
        perspective: cols * size,
      }}
    >
      {viewData.map((tile) => (
        <button
          type="button"
          key={tile.key}
          data-is-empty={tile.isEmpty.toString()}
          data-is-correct={tile.isCorrect.toString()}
          className="group absolute p-1 transition-all duration-200"
          style={{
            left: (tile.current.x - 1) * size,
            top: (tile.current.y - 1) * size,
            width: size,
            height: size,
          }}
          onClick={() => onMove(tile.current)}
        >
          {<TileView data={tile} imageSrc={imageSrc} size={size} />}
        </button>
      ))}
    </div>
  );
}

const genKey: {
  (x: number, y: number): string;
  (coords: Point2d, _unused?: unknown): string;
} = (arg1, arg2) => {
  return isPoint2d(arg1) ? `${arg1.x}:${arg1.y}` : `${arg1}:${arg2}`;
};
