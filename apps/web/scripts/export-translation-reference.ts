import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import en from '@/i18n/messages/en';

export type JsonValue =
  | boolean
  | number
  | string
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface TranslationReference {
  schemaVersion: number;
  hash: string;
  namespaces: JsonValue;
}

export const SCHEMA_VERSION = 1;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Recursively sorts object keys while preserving array order. `undefined`
 * object values are dropped so the result is always JSON-serializable.
 */
export function canonicalize(value: unknown): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => canonicalize(item));
  }

  if (isPlainObject(value)) {
    const result: { [key: string]: JsonValue } = {};
    for (const key of Object.keys(value).sort()) {
      const item = value[key];
      if (item === undefined) {
        continue;
      }
      result[key] = canonicalize(item);
    }
    return result;
  }

  return (value ?? null) as JsonValue;
}

/**
 * Deterministic JSON: sorted object keys (lexicographic by UTF-16 code unit,
 * independent of JavaScript's integer-like key ordering), preserved array
 * order, no whitespace.
 *
 * The string is built directly instead of going through
 * `JSON.stringify(canonicalize(...))`, because JavaScript enumerates
 * integer-like keys (`"15"`, `"60"`, `"300"`) in numeric order regardless of
 * insertion, which would otherwise make the hash language-dependent.
 */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJson(item ?? null)).join(',')}]`;
  }

  if (isPlainObject(value)) {
    return `{${Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(',')}}`;
  }

  return JSON.stringify(value ?? null);
}

export function buildReference(bundle: unknown): TranslationReference {
  const namespaces = canonicalize(bundle);
  const hash = createHash('sha256')
    .update(canonicalJson(namespaces), 'utf8')
    .digest('hex');

  return {
    schemaVersion: SCHEMA_VERSION,
    hash,
    namespaces,
  };
}

export function serializeReference(reference: TranslationReference): string {
  return `${JSON.stringify(reference, null, 2)}\n`;
}

/**
 * Writes the reference snapshot only when the serialized content changed.
 * Returns whether the file was (re)written.
 */
export function writeReference(outputPath: string, bundle: unknown): boolean {
  const next = serializeReference(buildReference(bundle));
  const previous = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, 'utf8')
    : undefined;

  if (previous === next) {
    return false;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, next);
  return true;
}

const entry = process.argv[1];
if (entry?.includes('export-translation-reference')) {
  const scriptDir = path.dirname(path.resolve(entry));
  const outputPath = path.resolve(scriptDir, '../translation-reference.json');
  const changed = writeReference(outputPath, en);

  process.stdout.write(
    changed
      ? `✅ Wrote translation reference to '${outputPath}'.\n`
      : `✅ Translation reference is up to date at '${outputPath}'.\n`,
  );
}
