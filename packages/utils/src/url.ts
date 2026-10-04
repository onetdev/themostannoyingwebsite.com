/**
 * Removes every trailing forward slash from a string.
 *
 * Useful for normalizing URL/path segments before joining them.
 */
export const trimTrailingSlashes = (value: string): string => {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47 /* '/' */) {
    end -= 1;
  }
  return value.slice(0, end);
};

/**
 * Removes every leading forward slash from a string.
 *
 * Useful for normalizing URL/path segments before joining them.
 */
export const trimLeadingSlashes = (value: string): string => {
  let start = 0;
  while (start < value.length && value.charCodeAt(start) === 47 /* '/' */) {
    start += 1;
  }
  return value.slice(start);
};
