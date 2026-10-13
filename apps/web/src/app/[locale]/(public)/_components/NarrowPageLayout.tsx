import { clsx } from '@maw/ui-lib/utils';
import type { ComponentProps } from 'react';
import { PageLayout } from './PageLayout';

type PageLayoutProps = ComponentProps<typeof PageLayout>;

export type NarrowPageLayoutProps = Omit<PageLayoutProps, 'autoPadding'> & {
  /**
   * Max-width utility applied to the centered column. Defaults to `max-w-lg`.
   */
  maxWidthClassName?: string;
  /**
   * Extra classes applied to the centered column wrapper.
   */
  contentClassName?: string;
};

/**
 * Narrow, single-column variant of {@link PageLayout} for pages such as the
 * auth forms and profile.
 *
 * `PageLayout` insets `<main>` with `mx-gutter`; placing `mx-auto` on `<main>`
 * for centering collides with it (both set `margin-inline`, and `mx-gutter`
 * wins in the cascade), which left these pages left-aligned. Instead `<main>`
 * becomes a flex column and a child wrapper is centered with auto margins. The
 * `my-auto` also vertically centers short content between the header and
 * footer, and gracefully collapses to top-alignment (no clipping) when the
 * content is taller than the viewport.
 */
export function NarrowPageLayout({
  children,
  className,
  maxWidthClassName = 'max-w-lg',
  contentClassName,
  ...rest
}: NarrowPageLayoutProps) {
  return (
    <PageLayout
      {...rest}
      autoPadding={false}
      className={clsx('flex flex-col', className)}
    >
      <div
        data-narrow-content=""
        className={clsx(
          'mx-auto my-auto w-full py-8',
          maxWidthClassName,
          contentClassName,
        )}
      >
        {children}
      </div>
    </PageLayout>
  );
}
