import { cn } from '@maw/ui-lib/utils';
import config from '@/core/config';

export type CoverPlaceholderProps = {
  width: number;
  height: number;
  className?: string;
  /**
   * Fill an already sized (e.g. `aspect-*`) relative parent instead of
   * deriving its own height from `width`/`height`.
   */
  fill?: boolean;
};

export function CoverPlaceholder({
  width,
  height,
  className,
  fill = false,
}: CoverPlaceholderProps) {
  const baseClassName =
    'after:bg-radial-primary relative bg-repeat after:pointer-events-none after:absolute after:top-0 after:left-0 after:size-full after:mix-blend-saturation';
  const backgroundImage = `url(${config.content.assets.articleCoverPlaceholder})`;

  if (fill) {
    return (
      <div
        className={cn(baseClassName, 'absolute inset-0 size-full', className)}
        style={{ backgroundImage }}
      />
    );
  }

  return (
    <div
      className={cn(baseClassName, className)}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        backgroundImage,
      }}
    />
  );
}
