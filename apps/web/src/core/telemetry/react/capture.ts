import type { LinkKind } from '../types';

export const TRACK_IGNORE_SELECTOR = '[data-track-ignore]';
export const TRACK_SECTION_SELECTOR = '[data-track-section]';

const ACTION_SELECTOR = [
  '[data-track]',
  'button',
  'a',
  '[role="button"]',
  '[data-slot$="-trigger"]',
  '[data-slot$="-close"]',
].join(',');

const TEXT_INPUT_TYPES = new Set([
  'text',
  'email',
  'password',
  'search',
  'tel',
  'url',
  'number',
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
]);

/** Invalid-fields limit keeps a broken form from producing a huge payload. */
const MAX_REPORTED_FIELDS = 5;

export function isTrackingSuppressed(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  return window.location.pathname.includes('/debug');
}

export function resolveActionElement(target: Element): Element | null {
  return target.closest(ACTION_SELECTOR);
}

export function resolveSection(element: Element): string | undefined {
  return (
    element
      .closest(TRACK_SECTION_SELECTOR)
      ?.getAttribute('data-track-section') ?? undefined
  );
}

export function resolveFormKey(form: HTMLFormElement): string {
  return (
    form.getAttribute('data-track-form') ||
    form.id ||
    form.getAttribute('data-slot') ||
    form.getAttribute('name') ||
    'anonymous'
  );
}

export function resolveFieldName(
  element: Element,
  fallbackIndex?: number,
): string {
  const name =
    element.getAttribute('name') ||
    element.getAttribute('data-track-field') ||
    element.id;
  if (name) {
    return name;
  }
  return fallbackIndex === undefined ? 'field' : `field${fallbackIndex}`;
}

export function resolveControlName(element: Element): string {
  return (
    element.getAttribute('name') ||
    element.getAttribute('data-track-field') ||
    element.getAttribute('aria-label') ||
    element.tagName.toLowerCase()
  );
}

export function isTextInput(element: Element): element is HTMLElement {
  if (element instanceof HTMLTextAreaElement) {
    return true;
  }
  if (!(element instanceof HTMLInputElement)) {
    return false;
  }
  return TEXT_INPUT_TYPES.has(element.type);
}

export function getLinkKind(href: string, currentOrigin: string): LinkKind {
  if (!href) {
    return 'other';
  }
  if (href.startsWith('#')) {
    return 'hash';
  }
  if (/^mailto:/i.test(href)) {
    return 'mailto';
  }
  if (/^tel:/i.test(href)) {
    return 'tel';
  }
  try {
    const url = new URL(href, currentOrigin);
    return url.origin === currentOrigin ? 'internal' : 'external';
  } catch {
    return 'other';
  }
}

export function readReferrerKind(
  referrer: string,
  currentOrigin: string,
): 'direct' | 'internal' | 'external' {
  if (!referrer) {
    return 'direct';
  }
  try {
    return new URL(referrer).origin === currentOrigin ? 'internal' : 'external';
  } catch {
    return 'external';
  }
}

export function readViewportBucket(width: number): string {
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  return 'xl';
}

export function countFormFields(form: HTMLFormElement): number {
  return form.querySelectorAll('input:not([type="hidden"]),select,textarea')
    .length;
}

export function countFilledFields(form: HTMLFormElement): number {
  let filled = 0;
  for (const field of Array.from(form.elements)) {
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement ||
      field instanceof HTMLSelectElement
    ) {
      if (field.type !== 'hidden' && String(field.value).length > 0) {
        filled += 1;
      }
    }
  }
  return filled;
}

export interface InvalidField {
  field: string;
  code: string;
}

/**
 * Reads validation state through `aria-invalid`, which Base UI / react-hook-form
 * already set on invalid controls. This keeps form tracking free of per-form
 * wiring.
 */
export function collectInvalidFields(form: HTMLFormElement): InvalidField[] {
  const invalid = Array.from(
    form.querySelectorAll<HTMLElement>(
      '[aria-invalid="true"],[data-invalid="true"]',
    ),
  ).slice(0, MAX_REPORTED_FIELDS);

  return invalid.map((element, index) => ({
    field: resolveFieldName(element, index),
    code: element.getAttribute('data-error-code') || 'invalid',
  }));
}

export function resolveResourceKind(tagName: string): string {
  switch (tagName.toUpperCase()) {
    case 'IMG':
      return 'image';
    case 'VIDEO':
      return 'video';
    case 'AUDIO':
      return 'audio';
    case 'SCRIPT':
      return 'script';
    case 'LINK':
      return 'link';
    default:
      return 'other';
  }
}

export function resolveImpressionIndex(element: Element): number | undefined {
  const raw = element.getAttribute('data-track-index');
  if (!raw) {
    return undefined;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Stable identity for an impression: explicit `data-track-key` wins, then the
 * index. Without either, the label alone is used (one impression per label per
 * route).
 */
export function resolveImpressionKey(element: Element): string {
  const label = element.getAttribute('data-track-impression') || 'element';
  const key = element.getAttribute('data-track-key');
  if (key) {
    return `${label}:${key}`;
  }
  const index = resolveImpressionIndex(element);
  return index === undefined ? label : `${label}:${index}`;
}
