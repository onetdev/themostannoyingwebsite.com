'use client';

import { Icon } from '@maw/ui-lib';
import { random } from '@maw/utils/math';
import { useEffect, useState } from 'react';
import type { SpriteConfig } from '../../schemas';

interface TaxonomySelectorProps {
  onSelectionChange?: (count: number) => void;
  sprites: SpriteConfig[];
  className?: string;
}

interface TileState {
  poolIndex: number;
  x: number;
  y: number;
  selected: boolean;
  replacing: boolean;
}

export function TaxonomySelectorSelect({
  onSelectionChange,
  sprites,
  className,
}: TaxonomySelectorProps) {
  const [tiles, setTiles] = useState<TileState[]>([]);

  useEffect(() => {
    onSelectionChange?.(tiles.filter((t) => t.selected).length);
  }, [tiles, onSelectionChange]);

  useEffect(() => {
    if (sprites.length === 0) {
      return;
    }

    const initialTiles: TileState[] = [];
    for (let i = 0; i < 9; i++) {
      const poolIndex = Math.floor(Math.random() * sprites.length);
      const pool = sprites[poolIndex];
      initialTiles.push({
        poolIndex,
        x: random(0, pool.width, true),
        y: random(0, pool.height, true),
        selected: false,
        replacing: false,
      });
    }
    setTiles(initialTiles);
  }, [sprites]);

  const handleTileClick = (index: number) => {
    const tile = tiles[index];
    if (tile.replacing) {
      return;
    }

    const newSelected = !tile.selected;

    if (newSelected && Math.random() < 0.5) {
      // Start replacing
      const newTiles = [...tiles];
      newTiles[index] = { ...tile, replacing: true, selected: false };
      setTiles(newTiles);

      setTimeout(() => {
        setTiles((prev) => {
          const updated = [...prev];
          const poolIndex = Math.floor(Math.random() * sprites.length);
          const pool = sprites[poolIndex];
          updated[index] = {
            poolIndex,
            x: random(0, pool.width, true),
            y: random(0, pool.height, true),
            selected: false,
            replacing: false,
          };
          return updated;
        });
      }, 500); // 500ms for fade out/in
    } else {
      const newTiles = [...tiles];
      newTiles[index] = { ...tile, selected: newSelected };
      setTiles(newTiles);
    }
  };

  return (
    <div className={`grid grid-cols-3 gap-1 ${className || ''}`}>
      {tiles.map((tile, index) => {
        const pool = sprites[tile.poolIndex];
        return (
          <button
            key={index}
            type="button"
            className="relative aspect-square overflow-hidden bg-muted transition-opacity duration-300"
            style={{ opacity: tile.replacing ? 0.3 : 1 }}
            onClick={() => handleTileClick(index)}
          >
            <div
              className="absolute inset-0 bg-no-repeat transition-transform duration-500"
              style={{
                backgroundImage: `url(${pool.uri})`,
                backgroundSize: `${pool.width * 100}% ${pool.height * 100}%`,
                backgroundPosition: `${
                  pool.width > 1 ? (tile.x / (pool.width - 1)) * 100 : 0
                }% ${pool.height > 1 ? (tile.y / (pool.height - 1)) * 100 : 0}%`,
                transform: tile.selected ? 'scale(0.9)' : 'scale(1)',
              }}
            />
            {tile.selected && (
              <div className="absolute top-1 left-1 flex size-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Icon icon="check" className="text-[10px]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
