'use client';

import { Button, Icon } from '@maw/ui-lib';
import { random } from '@maw/utils/math';
import { useEffect, useState } from 'react';

interface CaptchaGridSelectProps {
  className?: string;
  imageSrc: string;
  onResolved?: () => void;
  prompt: string;
}

interface TileState {
  x: number;
  y: number;
  selected: boolean;
  replacing: boolean;
}

export function CaptchaGridSelect({
  className = '',
  imageSrc,
  onResolved,
  prompt,
}: CaptchaGridSelectProps) {
  const [tiles, setTiles] = useState<TileState[]>([]);

  useEffect(() => {
    const initialTiles: TileState[] = [];
    for (let i = 0; i < 9; i++) {
      initialTiles.push({
        x: random(0, 7),
        y: random(0, 7),
        selected: false,
        replacing: false,
      });
    }
    setTiles(initialTiles);
  }, []);

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
          updated[index] = {
            x: random(0, 7),
            y: random(0, 7),
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
    <div
      className={`bg-background w-full max-w-[350px] border p-2 shadow-sm ${className}`}
    >
      <div className="bg-primary text-primary-foreground mb-2 p-4">
        <div className="text-sm opacity-90">Select all squares with</div>
        <div className="text-xl font-bold leading-tight">{prompt}</div>
        <div className="mt-1 text-xs opacity-75">
          If there are none, click skip
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {tiles.map((tile, index) => (
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
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: '800% 800%',
                backgroundPosition: `${(tile.x / 7) * 100}% ${(tile.y / 7) * 100}%`,
                transform: tile.selected ? 'scale(0.9)' : 'scale(1)',
              }}
            />
            {tile.selected && (
              <div className="absolute top-1 left-1 flex size-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Icon icon="check" className="text-[10px]" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t pt-2">
        <div className="flex gap-2">
          {/* Icons placeholder for reload, audio, help */}
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </button>
        </div>
        <Button onClick={onResolved} size="sm" className="px-6 uppercase">
          Next
        </Button>
      </div>
    </div>
  );
}
