import en from './index';

type JsonValue =
  | boolean
  | null
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Recursively checks that a value is JSON-serializable data (no functions,
 * `undefined`, symbols, or class instances).
 */
const isJsonValue = (value: unknown): value is JsonValue => {
  if (value === null) return true;

  if (Array.isArray(value)) {
    return value.every(isJsonValue);
  }

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return true;
    case 'object':
      return Object.values(value as Record<string, unknown>).every(isJsonValue);
    default:
      return false;
  }
};

/**
 * The Content API extracts this bundle from source by bundling the entry module
 * and reading its default export, so it must stay a pure namespace map of
 * JSON-serializable data. See `adr/0028-english-translation-reference-sync.md`.
 */
describe('English translation bundle contract', () => {
  it('maps every namespace to a plain object', () => {
    const namespaces = Object.entries(en);

    expect(namespaces.length).toBeGreaterThan(0);

    for (const [namespace, value] of namespaces) {
      expect(Array.isArray(value)).toBe(false);
      expect([namespace, typeof value]).toEqual([namespace, 'object']);
    }
  });

  it('contains only JSON-serializable data', () => {
    expect(isJsonValue(en)).toBe(true);
  });
});
