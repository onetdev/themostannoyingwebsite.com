/**
 * Flattens a nested object into a dot-notation KV object.
 */
export function flatten(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, unknown> {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => {
      const key = prefix ? `${prefix}.${k}` : k;

      if (v && typeof v === 'object' && !Array.isArray(v)) {
        Object.assign(acc, flatten(v as Record<string, unknown>, key));
      } else {
        acc[key] = v;
      }

      return acc;
    },
    {} as Record<string, unknown>,
  );
}
