/**
 * Marker for the page a viewer was opened from.
 *
 * Deliberately `sessionStorage`: it is scoped to a single tab/top-level browsing
 * context, so opening shorts in another tab cannot read or overwrite this entry.
 * `localStorage` would be shared across every tab and is not suitable here.
 */
export const SHORTS_ENTRY_STORAGE_KEY = 'shorts:entry';

function isSafeEntryPath(path: string | null): path is string {
  if (!path?.startsWith('/') || path.startsWith('//')) {
    return false;
  }

  return true;
}

export function rememberShortsEntry(path: string): void {
  if (typeof window === 'undefined' || !isSafeEntryPath(path)) {
    return;
  }

  window.sessionStorage.setItem(SHORTS_ENTRY_STORAGE_KEY, path);
}

export function takeShortsEntry(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const path = window.sessionStorage.getItem(SHORTS_ENTRY_STORAGE_KEY);
  window.sessionStorage.removeItem(SHORTS_ENTRY_STORAGE_KEY);

  return isSafeEntryPath(path) ? path : undefined;
}
