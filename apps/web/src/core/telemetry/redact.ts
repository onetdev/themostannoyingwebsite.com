import type { TelemetryProps } from './types';

const MAX_STRING_LENGTH = 120;
const MAX_KEY_LENGTH = 40;

const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const URL_PATTERN = /https?:\/\/[^\s)]+/gi;
/**
 * International numbers with an explicit `+`, or North-American-shaped
 * `555-123-4567`. Deliberately narrower than "any digit run": dates, slugs and
 * ids (`2024-10-23`) must survive redaction intact.
 */
const PHONE_PATTERN =
  /(?:\+\d[\d\s().-]{6,}\d|\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b)/g;
const SECRET_PATTERN = /(bearer|token|secret|password|api[_-]?key)[=:\s]+\S+/gi;

/**
 * Prop keys that must never leave the client. Extend this list rather than
 * relying on call sites to behave.
 *
 * Note: `value` stays denied on purpose. Semantic option identities must be
 * sent as `optionValue`, so a careless call site cannot smuggle input values
 * into the stream by naming its prop `value`.
 */
export const SENSITIVE_PROP_KEYS: ReadonlySet<string> = new Set([
  'password',
  'passwordvalue',
  'value',
  'email',
  'phone',
  'address',
  'card',
  'cardnumber',
  'cvv',
  'token',
  'authorization',
  'cookie',
  'query',
  'searchterm',
  'username',
]);

/**
 * Removes the common ways personally identifying data leaks into a free-form
 * string (error messages, server responses, user labels).
 */
export function scrubMessage(value: string): string {
  return value
    .replace(URL_PATTERN, '[url]')
    .replace(EMAIL_PATTERN, '[email]')
    .replace(SECRET_PATTERN, '$1=[redacted]')
    .replace(PHONE_PATTERN, '[number]')
    .slice(0, MAX_STRING_LENGTH);
}

/**
 * Reduces a URL or path to its pathname so query strings and fragments (which
 * may carry search terms or tokens) never reach a sink.
 */
export function safePath(value: string): string {
  if (!value) {
    return '/';
  }

  try {
    const url = new URL(value, 'http://telemetry.invalid');
    return url.pathname || '/';
  } catch {
    const [path] = value.split(/[?#]/);
    return path && path.length > 0 ? path : '/';
  }
}

/** Coarse input length, so field sizes are visible without storing the value. */
export function bucketLength(length: number): string {
  if (length <= 0) return '0';
  if (length <= 2) return '1-2';
  if (length <= 5) return '3-5';
  if (length <= 10) return '6-10';
  if (length <= 25) return '11-25';
  return '26+';
}

/**
 * Normalises arbitrary props into the primitive, size-limited shape sinks
 * accept. Unknown/sensitive keys are dropped instead of being trusted.
 */
export function sanitizeProps(input: Record<string, unknown>): TelemetryProps {
  const output: TelemetryProps = {};

  for (const [rawKey, value] of Object.entries(input)) {
    const key = rawKey.slice(0, MAX_KEY_LENGTH);
    if (SENSITIVE_PROP_KEYS.has(key.toLowerCase())) {
      continue;
    }

    if (typeof value === 'string') {
      output[key] = scrubMessage(value);
      continue;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      output[key] = value;
      continue;
    }

    if (typeof value === 'boolean') {
      output[key] = value;
    }
  }

  return output;
}
