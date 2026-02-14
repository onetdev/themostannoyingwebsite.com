'use client';

import { Point2d } from '@maw/utils/math';
import { useMemo } from 'react';

export type TileData = {
  current: Point2d;
  resolution: Point2d;
  isEmpty: boolean;
};

export type TileViewData = TileData & {
  key: string;
  content: string;
  isCorrect: boolean;
};

export type TileViewProps = {
  data: TileViewData;
  imageSrc?: string;
  size: number;
};

export function TileView({ data, imageSrc, size }: TileViewProps) {
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
      className="border-border group-data-[is-correct=true]:bg-success group-data-[is-correct=true]:text-success-foreground flex size-full items-center justify-center rounded-sm border transition-all duration-200 ease-in-out select-none group-data-[is-correct=false]:cursor-pointer group-data-[is-empty=true]:hidden data-[has-image=true]:border-none">
      {!imageSrc && <span>{data.key}</span>}
    </div>
  );
}
