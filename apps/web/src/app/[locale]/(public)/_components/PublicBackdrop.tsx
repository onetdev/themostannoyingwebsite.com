import { clsx } from '@maw/ui-lib/utils';

/**
 * Decorative full-screen backdrop for the public route group.
 *
 * Renders a fixed, non-interactive layer of oversized blurred "aurora" blobs
 * (Gemini-style) behind all page content. It is pure CSS — no client JS, no
 * hydration cost — and reads its hues, opacity and blur from the theme tokens
 * (`--aurora-*`), so it adapts to light/dark automatically. Motion is disabled
 * with `motion-reduce:animate-none`, leaving the blobs visible but static for
 * visitors who opt out of motion.
 *
 * Mounted once from the `(public)` layout, so it covers every public page but
 * never the `(barebone)` admin/debug routes.
 */
const BLOBS = [
  {
    id: 'blue',
    // `[animation-delay:-…]` desynchronises the otherwise identical loops so
    // the blobs never breathe in lockstep.
    className:
      'text-aurora-1 animate-aurora-drift-a -top-[24%] -left-[14%] size-[44vmax] [animation-delay:-6s]',
  },
  {
    id: 'violet',
    className:
      'text-aurora-2 animate-aurora-drift-b -top-[20%] left-[18%] size-[42vmax] [animation-delay:-18s]',
  },
  {
    id: 'magenta',
    className:
      'text-aurora-3 animate-aurora-drift-c -top-[18%] right-[16%] size-[42vmax] [animation-delay:-11s]',
  },
  {
    id: 'teal',
    className:
      'text-aurora-4 animate-aurora-drift-d -top-[24%] -right-[14%] size-[44vmax] [animation-delay:-27s]',
  },
] as const;

export function PublicBackdrop() {
  return (
    <div
      aria-hidden="true"
      data-testid="public-backdrop"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {BLOBS.map((blob) => (
        <div
          key={blob.id}
          className={clsx(
            'aurora-blob motion-reduce:animate-none',
            blob.className,
          )}
        />
      ))}
    </div>
  );
}
