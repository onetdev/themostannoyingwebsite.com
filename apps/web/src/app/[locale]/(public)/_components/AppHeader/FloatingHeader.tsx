'use client';

import { clsx } from '@maw/ui-lib/utils';
import { type ComponentProps, useEffect, useState } from 'react';

export type FloatingHeaderProps = ComponentProps<'header'>;

/**
 * Sticky, rounded header shell that only casts a drop shadow once the page is
 * scrolled, so it sits flush with the content at the top and lifts above it
 * afterwards. Kept as a client component because the header itself renders
 * server-side (translations, navigation).
 */
export function FloatingHeader({ className, ...props }: FloatingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="header"
      className={clsx(
        'sticky top-3 z-40 mx-3 mt-3 rounded-xl border bg-card/80 backdrop-blur-md transition-shadow xl:mx-4',
        isScrolled && 'shadow-md',
        className,
      )}
      {...props}
    />
  );
}
