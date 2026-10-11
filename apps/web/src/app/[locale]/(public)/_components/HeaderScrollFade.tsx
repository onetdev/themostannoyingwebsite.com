'use client';

import { clsx } from '@maw/ui-lib/utils';
import { useIsScrolled } from '@/hooks/useIsScrolled';

export type HeaderScrollFadeProps = {
  className?: string;
};

/**
 * Top scrim that fades page content as it scrolls under the floating header.
 *
 * A CSS `scroll-fade`/mask cannot anchor to the viewport here: the page shell
 * is not its own scroll container, so a mask would be painted in the
 * document-height container's coordinate space and scroll away with it. A
 * fixed background gradient gives the same "content dissolves at the top"
 * effect once the page is scrolled, without changing the scroll container.
 *
 * Sits above page content and below the floating header (`z-40`). Its height
 * roughly matches the header clearance so it only fades the top strip.
 */
export function HeaderScrollFade({ className }: HeaderScrollFadeProps) {
  const isScrolled = useIsScrolled();

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none fixed inset-x-0 top-0 z-30 h-16 bg-linear-to-b from-background/60 to-transparent transition-opacity duration-500 motion-reduce:transition-none',
        isScrolled ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  );
}
