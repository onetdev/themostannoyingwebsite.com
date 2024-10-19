import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import { shuffleArray } from '@/utils/array';
import { isPoint2d, Point2d } from '@/utils/math';

interface CaptchaSlidingPuzzleProps {
  className?: string;
  cols?: number;
  imageUrl?: string;
  rows?: number;
  size?: number;
  tileMode?: 'key' | 'image';
}

type TileData = {
  current: Point2d;
  resolution: Point2d;
  isEmpty: boolean;
};

type TileViewData = TileData & {
  key: string;
  content: string;
  isCorrect: boolean;
};

const CaptchaSlidingPuzzle: FunctionComponent<CaptchaSlidingPuzzleProps> = ({
  className,
  cols = 8,
  rows = 3,
  size = 50,
  tileMode = 'key',
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

    const coordShuffle = shuffleArray(coordSeries);
    const valueShuffle = shuffleArray(resolutionSeries);
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
    return puzzle.map(
      (cell) =>
        ({
          ...cell,
          key: genKey(cell.resolution),
          content: cell.resolution ? genKey(cell.resolution) : 'empty',
          isCorrect:
            cell.resolution && genKey(cell.current) === genKey(cell.resolution),
        }) satisfies TileViewData,
    );
  }, [puzzle]);

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
          className="group absolute p-1"
          style={{
            left: (tile.current.x - 1) * size,
            top: (tile.current.y - 1) * size,
            width: size,
            height: size,
          }}
          onClick={() => onCellClick(index)}>
          {tileMode === 'key' && <CellKeyTile data={tile} />}
        </div>
      ))}
    </div>
  );
};

const CellKeyTile: FunctionComponent<{ data: TileViewData }> = ({ data }) => {
  return (
    <div className="flex size-full select-none items-center justify-center rounded border border-on-surface transition-all duration-200 ease-in-out group-data-[is-empty=true]:hidden group-data-[is-correct=false]:cursor-pointer group-data-[is-correct=true]:bg-success group-data-[is-correct=true]:text-on-success">
      <span>{data.key}</span>
    </div>
  );
};

const genKey: {
  (x: number, y: number): string;
  (coords: Point2d, _unused?: unknown): string;
} = (arg1, arg2) => {
  return isPoint2d(arg1) ? `${arg1.x}:${arg1.y}` : `${arg1}:${arg2}`;
};

export default CaptchaSlidingPuzzle;
