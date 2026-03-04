'use client';

import { clsx } from '@maw/ui-lib/utils';
import type { ComponentProps } from 'react';
import type { TaxonomyEntryMeta } from '../../types';

interface TaxonomySelectorProps {
  className?: string;
  cols: number;
  rows: number;
  items: TaxonomyEntryMeta[];
  onSelect: (index: number) => void;
}

export function TaxonomySelector({
  items,
  cols,
  className,
  onSelect,
}: TaxonomySelectorProps) {
  return (
    <div
      className={clsx('grid gap-1', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {items.map((tile, index) => (
        <TaxonomySelectorCell
          key={index}
          data={tile}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

interface TaxonomySelectorCell
  extends Pick<ComponentProps<'button'>, 'className'> {
  data: TaxonomyEntryMeta;
  onSelect: () => void;
}

function TaxonomySelectorCell({
  className,
  data,
  onSelect,
}: TaxonomySelectorCell) {
  const colFrag = 100 / (data.asset.columns - 1);
  const rowFrag = 100 / (data.asset.rows - 1);
  const backgroundSize = `${data.asset.columns * 100}% ${data.asset.rows * 100}%`;
  const backgroundPosition = `${colFrag * data.col}% ${rowFrag * data.row}%`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        'relative aspect-square overflow-hidden rounded-md bg-muted transition-transform duration-200',
        data.isSelected && 'ring-3 ring-primary',
        className,
      )}
      style={{
        transform: data.isSelected ? 'scale(0.9)' : 'scale(1)',
      }}
    >
      <div
        className="absolute inset-0 bg-no-repeat transition-transform duration-300"
        style={{
          backgroundImage: `url(${data.asset.uri})`,
          backgroundSize,
          backgroundPosition,
        }}
      />
    </button>
  );
}
