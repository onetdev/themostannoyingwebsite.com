import type { LinkKind } from '../types';

export const TRACK_IGNORE_SELECTOR = '[data-track-ignore]';
export const TRACK_SECTION_SELECTOR = '[data-track-section]';

const SEGMENTED_ITEM_SELECTOR =
  '[data-slot="toggle-group-item"],[data-slot="radio-group-item"],[role="radio"]';
const SEGMENTED_GROUP_SELECTOR =
  '[data-slot="toggle-group"],[data-slot="radio-group"],[role="radiogroup"]';

export const ACTION_SELECTOR = [
  '[data-track]',
  'button',
  'a',
  '[role="button"]',
  '[data-slot$="-trigger"]',
  '[data-slot$="-close"]',
].join(',');

/** Everything that can emit an interaction, including change-only controls. */
const INTERACTIVE_SELECTOR = `${ACTION_SELECTOR},input:not([type="hidden"]),select,textarea`;

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

/**
 * Action elements that would emit an event without a `section`. Used by the
 * dev console warning and `window.maw.tracker.auditScopes()`.
 *
 * Overlays rendered in a portal (dialog, sheet, popover, toast) are separate
 * DOM trees, so their `data-track-section` must live inside the portal, not on
 * the trigger or page wrapper.
 */
export function findUnscopedActions(root: ParentNode = document): Element[] {
  return Array.from(root.querySelectorAll(INTERACTIVE_SELECTOR)).filter(
    (element) =>
      !element.closest(TRACK_IGNORE_SELECTOR) &&
      !element.closest(TRACK_SECTION_SELECTOR),
  );
}

/**
 * Accessible name of the action. Prefers an explicit telemetry label, then the
 * ARIA label, then the tooltip title. Never reads `textContent`, so dynamic or
 * user-generated copy cannot leak into the stream.
 */
export function resolveActionLabel(element: Element): string | undefined {
  const label =
    element.getAttribute('data-track-label') ||
    element.getAttribute('aria-label') ||
    element.getAttribute('title');
  const trimmed = label?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
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

/** Slider buckets land on multiples of 10 % of the control's usable range. */
const SLIDER_BUCKET_STEP = 10;

/**
 * Coarse position of a range value, expressed as a percentage of its own
 * usable range and rounded to the nearest 10 %. Scaling by the range keeps
 * small sliders meaningful: a 0–19 pain level still reports 50 rather than
 * collapsing every mid-range value to 10.
 */
export function readRangeBucket(
  value: number,
  min: number,
  max: number,
): number {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(min) ||
    !Number.isFinite(max)
  ) {
    return 0;
  }
  if (max <= min) {
    return 0;
  }
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)));
  return Math.round((ratio * 100) / SLIDER_BUCKET_STEP) * SLIDER_BUCKET_STEP;
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

export interface SegmentedSelection {
  item: Element;
  group: Element;
  control: string;
  index: number;
  count: number;
  value?: string;
}

/**
 * Resolves a clicked segmented-control option (toggle group, radio group) to
 * its group, position and stable value. `data-value` is rendered by
 * `ToggleGroupItem`/`RadioGroupItem` from their `value` prop.
 */
export function resolveSegmentedSelection(
  target: Element,
): SegmentedSelection | null {
  const item = target.closest(SEGMENTED_ITEM_SELECTOR);
  if (!item) {
    return null;
  }

  const group = item.closest(SEGMENTED_GROUP_SELECTOR);
  if (!group) {
    return null;
  }

  const items = Array.from(group.querySelectorAll(SEGMENTED_ITEM_SELECTOR));
  const index = items.indexOf(item);
  if (index < 0) {
    return null;
  }

  return {
    item,
    group,
    control:
      group.getAttribute('data-track-control') ??
      group.getAttribute('data-slot') ??
      'segmented',
    index,
    count: items.length,
    value: item.getAttribute('data-value') ?? undefined,
  };
}

/** Reads the post-update pressed/checked state of a toggle or radio option. */
export function readPressedState(item: Element): boolean {
  return (
    item.getAttribute('aria-pressed') === 'true' ||
    item.getAttribute('aria-checked') === 'true' ||
    item.getAttribute('data-pressed') !== null ||
    item.getAttribute('data-state') === 'on'
  );
}
