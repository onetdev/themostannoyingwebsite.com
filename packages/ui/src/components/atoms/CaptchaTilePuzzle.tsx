'use client';

import { arrayShuffle } from '@maw/utils/array';
import { isPoint2d, Point2d } from '@maw/utils/math';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

interface CaptchaTilePuzzleProps {
  className?: string;
  cols?: number;
  imageUrl?: string;
  rows?: number;
  size?: number;
  imageSrc?: string;
  onResolved?: () => void;
}

type TileData = {
  current: Point2d;
  resolution: Point2d;
  isEmpty: boolean;
};

export type TileViewData = TileData & {
  key: string;
  content: string;
  isCorrect: boolean;
};

export const CaptchaTilePuzzle: FunctionComponent<CaptchaTilePuzzleProps> = ({
  className,
  cols = 8,
  rows = 3,
  size = 50,
  imageSrc,
  onResolved,
}) => {
  const [puzzle, setPuzzle] = useState<TileData[]>([]);

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
          isEmpty: resolution === empty,
        } satisfies TileData;
      },
      {} as Record<string, TileData>,
    );

    setPuzzle(puzzle);
  }, [cols, rows]);

  // Handling slides
  const onCellClick = (cellIndex: number) => {
    const emptyCellIndex = puzzle.findIndex((cell) => cell.isEmpty);
    if (!emptyCellIndex) {
      return;
    }

    const cell = puzzle[cellIndex];
    const emptyCell = puzzle[emptyCellIndex];
    const diffX = Math.abs(cell.current.x - emptyCell.current.x);
    const diffY = Math.abs(cell.current.y - emptyCell.current.y);
    if (diffX > 1 || diffY > 1 || diffX + diffY > 1) {
      return;
    }

    const updated = [...puzzle];
    updated[cellIndex] = {
      ...cell,
      current: emptyCell.current,
    };
    updated[emptyCellIndex] = {
      ...emptyCell,
      current: cell.current,
    };

    setPuzzle(updated);
  };

  const viewData = useMemo(() => {
    if (puzzle.length === 0) {
      return [];
    }

    const mapped = puzzle.map(
      (cell) =>
        ({
          ...cell,
          key: genKey(cell.resolution),
          content: cell.resolution ? genKey(cell.resolution) : 'empty',
          isCorrect:
            cell.resolution && genKey(cell.current) === genKey(cell.resolution),
        }) satisfies TileViewData,
    );

    const hasInvalid = mapped.some((cell) => !cell.isCorrect);
    if (!hasInvalid) {
      onResolved?.();
    }

    return mapped;
  }, [onResolved, puzzle]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: cols * size,
        height: rows * size,
        perspective: cols * size,
      }}>
      {viewData.map((tile, index) => (
        <div
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
          onClick={() => onCellClick(index)}>
          {<TileView data={tile} imageSrc={imageSrc} size={size} />}
        </div>
      ))}
    </div>
  );
};

type TileViewProps = {
  data: TileViewData;
  imageSrc?: string;
  size: number;
};

const TileView: FunctionComponent<TileViewProps> = ({
  data,
  imageSrc,
  size,
}) => {
  const style = useMemo(
    () => ({
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: `-${data.resolution.x * size}px -${data.resolution.y * size}px`,
    }),
    [data, imageSrc, size],
  );

  return (
    <div
      style={style}
      data-has-image={Boolean(imageSrc).toString()}
      className="border-on-surface group-data-[is-correct=true]:bg-success group-data-[is-correct=true]:text-on-success flex size-full items-center justify-center rounded-sm border transition-all duration-200 ease-in-out select-none group-data-[is-correct=false]:cursor-pointer group-data-[is-empty=true]:hidden data-[has-image=true]:border-none">
      {!imageSrc && <span>{data.key}</span>}
    </div>
  );
};

const genKey: {
  (x: number, y: number): string;
  (coords: Point2d, _unused?: unknown): string;
} = (arg1, arg2) => {
  return isPoint2d(arg1) ? `${arg1.x}:${arg1.y}` : `${arg1}:${arg2}`;
};
