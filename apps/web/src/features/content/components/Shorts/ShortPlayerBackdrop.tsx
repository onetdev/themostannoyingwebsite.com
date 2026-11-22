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
 * Keeping one backdrop outside the carousel means the background does not slide
 * with the clip, and switching clips crossfades instead of hard-cutting at the
 * slide boundary. The horizontal mask softens the outer edges.
 */
export function ShortPlayerBackdrop({ short }: ShortPlayerBackdropProps) {
  const [previous, setPrevious] = useState<ShortListItem>();
  const [current, setCurrent] = useState(short);
  const [visible, setVisible] = useState(true);
  const currentRef = useRef(short);

  useEffect(() => {
    if (short.id === currentRef.current.id) {
      return;
    }

    setPrevious(currentRef.current);
    setCurrent(short);
    currentRef.current = short;
    setVisible(false);

    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [short]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"
      aria-hidden="true"
    >
      {previous && <BackdropLayer short={previous} className="opacity-40" />}
      <BackdropLayer
        key={current.id}
        short={current}
        className={cn(
          'transition-opacity duration-500',
          visible ? 'opacity-40' : 'opacity-0',
        )}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
