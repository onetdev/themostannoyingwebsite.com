'use client';

import { Toaster } from '@maw/ui-lib';
import { useTheme } from '@wrksz/themes/client';

/**
 * Bridges the app's theme context into the library-agnostic `Toaster`.
 * Kept separate so only the toaster re-renders when the theme changes.
 */
export function ThemedToaster() {
  const { theme } = useTheme();

  return <Toaster theme={theme ?? 'system'} />;
}
