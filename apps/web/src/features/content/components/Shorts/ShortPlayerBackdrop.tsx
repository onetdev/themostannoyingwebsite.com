'use client';

import type { ShortListItem } from '@maw/content-sdk';
import { cn } from 'cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { selectShortMedia } from './short-media';

function BackdropLayer({
  short,
  className,
}: {
  short: ShortListItem;
  className?: string;
}) {
  const poster = selectShortMedia(short).poster;

  if (!poster) {
    return null;
  }

  return (
    <Image
      className={cn(
        'absolute inset-0 h-full w-full scale-110 object-cover blur-2xl',
        className,
      )}
      src={poster.url}
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
    />
  );
}

export interface ShortPlayerBackdropProps {
  short: ShortListItem;
}

/**
 * Fixed, blurred backdrop behind the vertical feed.
 *
 * The backdrop lives outside the carousel, so it never slides with a clip. On a
 * clip change the previous layer stays in place while the next layer fades in,
 * producing a crossfade instead of a hard switch.
 */
export function ShortPlayerBackdrop({ short }: ShortPlayerBackdropProps) {
  const [previous, setPrevious] = useState<ShortListItem>();
  const [current, setCurrent] = useState(short);
  const currentRef = useRef(short);

  useEffect(() => {
    if (short.id === currentRef.current.id) {
      return;
    }

    setPrevious(currentRef.current);
    setCurrent(short);
    currentRef.current = short;
  }, [short]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"
      aria-hidden="true"
    >
      {previous && <BackdropLayer short={previous} className="opacity-40" />}
      <div
        key={current.id}
        className="absolute inset-0 animate-in fade-in duration-700"
        data-testid="short-backdrop-current"
      >
        <BackdropLayer short={current} className="opacity-40" />
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
