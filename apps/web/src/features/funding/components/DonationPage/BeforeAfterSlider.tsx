'use client';

import { Icon } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import Image from 'next/image';
import { type ComponentProps, useState } from 'react';

export type BeforeAfterSliderProps = {
  /** Image revealed on the left of the handle. */
  beforeSrc: string;
  /** Image revealed on the right of the handle. */
  afterSrc: string;
  /** Overlay label for the before side. */
  beforeLabel: string;
  /** Overlay label for the after side. */
  afterLabel: string;
  /** Accessible name for the range control. */
  sliderLabel: string;
} & ComponentProps<'div'>;

/**
 * Standalone before/after comparison slider. The after layer is clipped with
 * `inset(0 0 0 <position>%)` over the before layer, and a full-bleed range input
 * lets you drag anywhere across the image to move the split. Imagery is passed
 * in by the caller so it can be swapped without touching the component.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  sliderLabel,
  className,
  ...rest
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div
      className={cn(
        'group relative aspect-[16/9] w-full overflow-hidden rounded-xl select-none',
        className,
      )}
      {...rest}
    >
      <Image
        src={beforeSrc}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        loading="eager"
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={afterSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <span className="absolute top-4 left-4 text-sm font-bold tracking-widest text-white uppercase [text-shadow:0_1px_4px_rgb(0_0_0/0.6)]">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 text-sm font-bold tracking-widest text-white uppercase [text-shadow:0_1px_4px_rgb(0_0_0/0.6)]">
        {afterLabel}
      </span>

      <div
        aria-hidden
        className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgb(0_0_0/0.4)]"
        style={{ left: `${position}%` }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/20 text-white backdrop-blur-sm group-focus-within:ring-2 group-focus-within:ring-white group-focus-within:ring-offset-2 group-focus-within:ring-offset-black/20"
        style={{ left: `${position}%` }}
      >
        <Icon icon="chevronLeft" />
        <Icon icon="chevronRight" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={sliderLabel}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
      />
    </div>
  );
}
