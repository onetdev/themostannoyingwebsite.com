'use client';

import { clsx } from 'cn';
import type { ComponentProps } from 'react';
import { useIsScrolled } from '@/hooks/useIsScrolled';

export type FloatingHeaderProps = ComponentProps<'header'>;

/**
 * Sticky, rounded header shell that only casts a drop shadow once the page is
 * scrolled, so it sits flush with the content at the top and lifts above it
 * afterwards. Kept as a client component because the header itself renders
 * server-side (translations, navigation).
 */
export function FloatingHeader({ className, ...props }: FloatingHeaderProps) {
  const isScrolled = useIsScrolled();

  return (
    <header
      id="header"
      className={clsx(
        'sticky top-3 z-40 mx-gutter mt-3 rounded-xl border bg-card/80 backdrop-blur-md transition-shadow duration-500',
        isScrolled && 'shadow-md',
        className,
      )}
      {...props}
    />
  );
}
