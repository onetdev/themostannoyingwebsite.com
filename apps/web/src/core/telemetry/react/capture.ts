import { isTelemetrySection, type TelemetrySection } from '../catalog';
import type { LinkKind } from '../types';

export const TRACK_IGNORE_SELECTOR = '[data-track-ignore]';
export const TRACK_SECTION_SELECTOR = '[data-track-section]';

const SEGMENTED_ITEM_SELECTOR =
  '[data-slot="toggle-group-item"],[data-slot="radio-group-item"],[role="radio"]';
const SEGMENTED_GROUP_SELECTOR =
  '[data-slot="toggle-group"],[data-slot="radio-group"],[role="radiogroup"]';

/**
 * Base UI `Select` renders its options into a portal as `role="option"` nodes,
 * so option picks never reach the click or change handlers on their own. A
 * `SelectContent` opts in with `data-track-control` and this selector picks the
 * chosen item back up.
 */
export const SELECT_ITEM_SELECTOR = '[data-slot="select-item"],[role="option"]';
const SELECT_POPUP_SELECTOR = '[data-slot="select-content"]';
const SELECT_LISTBOX_SELECTOR = '[role="listbox"]';

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

/** Input types that must never contribute telemetry, even when opted in. */
const SENSITIVE_INPUT_TYPES = new Set([
  'password',
  'hidden',
  'file',
  'cc-number',
  'cc-csc',
  'cc-exp',
  'one-time-code',
]);

/** Field names that identify a credential or payment value. */
const SENSITIVE_FIELD_PATTERN =
  /pass|card|cvv|cvc|ssn|secret|token|otp|one-time/i;

/** Invalid-fields limit keeps a broken form from producing a huge payload. */
const MAX_REPORTED_FIELDS = 5;

/** `/debug`, `/en/debug`, `/debug/…` — never the middle of another segment. */
const DEBUG_ROUTE_PATTERN = /(^|\/)debug(\/|$)/;

export function isTrackingSuppressed(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  return DEBUG_ROUTE_PATTERN.test(window.location.pathname);
}

export function resolveActionElement(target: Element): Element | null {
  return target.closest(ACTION_SELECTOR);
}

export function resolveSection(element: Element): TelemetrySection | undefined {
  const section = element
    .closest(TRACK_SECTION_SELECTOR)
    ?.getAttribute('data-track-section');

  return section && isTelemetrySection(section) ? section : undefined;
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
      // Uses the registry guard, so an unknown `data-track-section` counts as
      // unscoped instead of silently passing the audit.
      resolveSection(element) === undefined &&
      element.getAttribute('aria-hidden') !== 'true',
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

export function isTextInput(
  element: Element,
): element is HTMLInputElement | HTMLTextAreaElement {
  if (element instanceof HTMLTextAreaElement) {
    return true;
  }
  if (!(element instanceof HTMLInputElement)) {
    return false;
  }
  return TEXT_INPUT_TYPES.has(element.type);
}

/**
 * Fields whose *value* must never reach telemetry. The tracker only reports a
 * length bucket, but a password length is still a credential attribute, and
 * form-level opt-in (`data-track-form`) would otherwise opt these in too.
 */
export function isSensitiveField(element: Element): boolean {
  if (
    element instanceof HTMLInputElement &&
    SENSITIVE_INPUT_TYPES.has(element.type)
  ) {
    return true;
  }

  const identifier =
    element.getAttribute('name') ??
    element.getAttribute('data-track-field') ??
    element.id ??
    '';
  return SENSITIVE_FIELD_PATTERN.test(identifier);
}

/**
 * Base UI renders an `aria-hidden` mirror `<input>` next to every checkbox,
 * switch and radio. For grouped radios the click already produces `ui.select`
 * (the segmented-control path), so the mirror must not report a second time;
 * for standalone checkboxes/switches the mirror *is* the only signal.
 */
export function isGroupedChoiceMirror(element: Element): boolean {
  if (
    !(element instanceof HTMLInputElement) ||
    element.getAttribute('aria-hidden') !== 'true'
  ) {
    return false;
  }
  return (
    element.closest('[data-slot="radio-group"],[role="radiogroup"]') !== null
  );
}

/**
 * Visible, user-facing form controls only. Base UI renders an `aria-hidden`
 * mirror `<input>` next to its `<span role="checkbox">`; counting those would
 * double every field and keep hidden inputs in the form funnel.
 */
export function isCountableControl(element: Element): boolean {
  if (element.getAttribute('aria-hidden') === 'true') {
    return false;
  }
  if (element.closest('[hidden],[inert]')) {
    return false;
  }
  return !(element instanceof HTMLInputElement && element.type === 'hidden');
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
  return Array.from(form.elements).filter(
    (field) =>
      (field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLSelectElement) &&
      isCountableControl(field),
  ).length;
}

/** A control counts as filled when it would contribute to a submission. */
function isFilledControl(field: Element): boolean {
  if (field instanceof HTMLTextAreaElement) {
    return field.value.length > 0;
  }
  if (field instanceof HTMLSelectElement) {
    return field.value.length > 0;
  }
  if (!(field instanceof HTMLInputElement) || !isCountableControl(field)) {
    return false;
  }
  if (field.type === 'checkbox' || field.type === 'radio') {
    // An unchecked box still reports `value === 'on'`.
    return field.checked;
  }
  return field.value.length > 0;
}

export function countFilledFields(form: HTMLFormElement): number {
  return Array.from(form.elements).filter(isFilledControl).length;
}

/**
 * Reads validation state through `aria-invalid`, which Base UI / react-hook-form
 * already set on invalid controls. This keeps form tracking free of per-form
 * wiring.
 */
export function collectInvalidFields(form: HTMLFormElement): string[] {
  return Array.from(
    form.querySelectorAll<HTMLElement>(
      '[aria-invalid="true"],[data-invalid="true"]',
    ),
  )
    .slice(0, MAX_REPORTED_FIELDS)
    .map((element, index) => resolveFieldName(element, index));
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

/** Fraction of an element that must be visible before it counts as impressed. */
export const MIN_IMPRESSION_RATIO = 0.5;

/**
 * Thresholds handed to the single `IntersectionObserver`. The low entries exist
 * for tall elements: a body taller than two viewports can never expose 50 % of
 * its own area, so it would otherwise never be observed as visible.
 */
export const IMPRESSION_THRESHOLDS = [0, 0.01, 0.05, 0.1, 0.25, 0.5] as const;

const MIN_TALL_ELEMENT_RATIO = 0.01;

/**
 * Scales the visibility requirement for elements taller than the viewport:
 * "half the viewport is covered by the element" instead of "half the element is
 * on screen". `intersectionRatio` is intersection area ÷ element area, so the
 * naive 50 % rule silently drops every article body and long list.
 */
export function requiredImpressionRatio(
  elementHeight: number,
  viewportHeight: number,
): number {
  if (
    !Number.isFinite(elementHeight) ||
    !Number.isFinite(viewportHeight) ||
    elementHeight <= 0 ||
    viewportHeight <= 0 ||
    elementHeight <= viewportHeight
  ) {
    return MIN_IMPRESSION_RATIO;
  }

  const ratio = (MIN_IMPRESSION_RATIO * viewportHeight) / elementHeight;
  return Math.max(MIN_TALL_ELEMENT_RATIO, ratio);
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

export interface SelectSelection {
  popup: Element;
  control: string;
  index: number;
  count: number;
  value?: string;
}

/**
 * Resolves a picked option in a Base UI `Select` popup. Only annotated popups
 * (`data-track-control`) are captured: the language switcher keeps emitting its
 * explicit locale event instead of a generic `ui.select`.
 */
export function resolveSelectSelection(
  target: Element,
): SelectSelection | null {
  const item = target.closest(SELECT_ITEM_SELECTOR);
  if (!item) {
    return null;
  }

  // Prefer the annotated popup; the listbox inside it matches only as a
  // fallback and never carries the control name.
  const popup =
    item.closest(SELECT_POPUP_SELECTOR) ??
    item.closest(SELECT_LISTBOX_SELECTOR);
  const control = popup?.getAttribute('data-track-control');
  if (!popup || !control) {
    return null;
  }

  const items = Array.from(popup.querySelectorAll(SELECT_ITEM_SELECTOR));
  const index = items.indexOf(item);
  if (index < 0) {
    return null;
  }

  return {
    popup,
    control,
    index,
    count: items.length,
    value: item.getAttribute('data-value') ?? undefined,
  };
}
