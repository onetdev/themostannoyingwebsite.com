'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { usePathname } from '@/core/i18n/navigation';
import { telemetry, track } from '..';
import type { TelemetrySection } from '../catalog';
import { bucketLength, safePath, scrubMessage } from '../redact';
import {
  collectInvalidFields,
  countFilledFields,
  countFormFields,
  getLinkKind,
  isGroupedChoiceMirror,
  isSensitiveField,
  isTextInput,
  isTrackingSuppressed,
  readPressedState,
  readRangeBucket,
  readReferrerKind,
  readViewportBucket,
  resolveActionElement,
  resolveActionLabel,
  resolveControlName,
  resolveFieldName,
  resolveFormKey,
  resolveResourceKind,
  resolveSection,
  resolveSegmentedSelection,
  resolveSelectSelection,
  type SegmentedSelection,
  TRACK_IGNORE_SELECTOR,
} from './capture';

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;
const VALIDATION_SETTLE_MS = 250;

let hasStartedSession = false;
let routeVisits = 0;
let sessionStartedAt = 0;

interface FormState {
  form: HTMLFormElement;
  fieldCount: number;
  submitted: boolean;
}

interface CaptureSession {
  formBook: Map<string, FormState>;
  validationTimers: Set<ReturnType<typeof setTimeout>>;
  reachedScrollThresholds: Set<number>;
  scrollTicking: boolean;
  visibleSince: number;
}

function createSession(): CaptureSession {
  return {
    formBook: new Map(),
    validationTimers: new Set(),
    reachedScrollThresholds: new Set(),
    scrollTicking: false,
    visibleSince: Date.now(),
  };
}

function startSession(): void {
  if (hasStartedSession) {
    return;
  }
  hasStartedSession = true;
  sessionStartedAt = Date.now();

  track('session.start', {
    entryRoute: safePath(window.location.pathname),
    referrerKind: readReferrerKind(document.referrer, window.location.origin),
    viewport: readViewportBucket(window.innerWidth),
  });
}

function trackSelect(target: Element, section?: TelemetrySection): boolean {
  if (!(target instanceof HTMLSelectElement)) {
    return false;
  }
  track('ui.select', {
    control: resolveControlName(target),
    optionIndex: target.selectedIndex,
    optionCount: target.options.length,
    section,
  });
  return true;
}

function trackCheckboxToggle(
  target: Element,
  section?: TelemetrySection,
): boolean {
  if (!(target instanceof HTMLInputElement)) {
    return false;
  }
  const type = target.getAttribute('type');
  if (type !== 'checkbox' && type !== 'radio') {
    return false;
  }
  // Grouped radios already emit `ui.select` from the segmented-control path;
  // their Base UI mirror input would otherwise double every answer.
  if (isGroupedChoiceMirror(target)) {
    return true;
  }
  track('ui.toggle', {
    control: resolveControlName(target),
    checked: target.checked,
    section,
    source: type,
  });
  return true;
}

function trackRoleToggle(target: Element, section?: TelemetrySection): boolean {
  if (target instanceof HTMLInputElement) {
    return false;
  }
  const role = target.getAttribute('role');
  if (role !== 'switch' && role !== 'checkbox' && role !== 'radio') {
    return false;
  }
  track('ui.toggle', {
    control: resolveControlName(target),
    checked:
      target.getAttribute('aria-checked') === 'true' ||
      target.getAttribute('data-state') === 'checked',
    section,
    source: role,
  });
  return true;
}

function trackRange(target: Element, section?: TelemetrySection): boolean {
  if (!(target instanceof HTMLInputElement) || target.type !== 'range') {
    return false;
  }
  const min = target.min === '' ? 0 : Number(target.min);
  const max = target.max === '' ? 100 : Number(target.max);
  track('ui.slider', {
    control: resolveControlName(target),
    valueBucket: readRangeBucket(Number(target.value), min, max),
    section,
  });
  return true;
}

function trackDialogAction(
  slot: string | undefined,
  trackKey: string | undefined,
  section: TelemetrySection | undefined,
): boolean {
  if (slot === 'dialog-trigger' || slot === 'sheet-trigger') {
    track('ui.dialog-open', { name: trackKey ?? slot, section });
    return true;
  }
  if (slot === 'dialog-close' || slot === 'sheet-close') {
    track('ui.dialog-close', { name: trackKey ?? slot, section });
    return true;
  }
  return false;
}

function trackLinkAction(
  action: Element,
  slot: string | undefined,
  section: TelemetrySection | undefined,
): boolean {
  const href = action.getAttribute('href');
  if (action.tagName !== 'A' || !href) {
    return false;
  }
  const kind = getLinkKind(href, window.location.origin);
  if (kind === 'hash' || kind === 'other') {
    return false;
  }

  track('nav.link-click', {
    kind,
    // `mailto:`/`tel:` pathnames *are* the address and the phone number.
    ...(kind === 'mailto' || kind === 'tel' ? {} : { path: safePath(href) }),
    section,
    slot,
    trackKey: action.getAttribute('data-track') ?? undefined,
    key: action.getAttribute('data-track-key') ?? undefined,
    label: resolveActionLabel(action),
  });
  return true;
}

function trackSegmentedSelection(selection: SegmentedSelection): void {
  // Base UI updates `aria-pressed`/`aria-checked` in the same tick as the
  // click, so read the settled state on the next macrotask.
  setTimeout(() => {
    track('ui.select', {
      control: selection.control,
      optionIndex: selection.index,
      optionCount: selection.count,
      optionValue: selection.value,
      checked: readPressedState(selection.item),
      section: resolveSection(selection.group),
    });
  }, 0);
}

function trackSegmentedClick(target: Element): boolean {
  const selection = resolveSegmentedSelection(target);
  if (!selection) {
    return false;
  }
  if (selection.item.matches('[disabled],[aria-disabled="true"]')) {
    return true;
  }
  trackSegmentedSelection(selection);
  return true;
}

/**
 * A picked option in an annotated Base UI `Select` popup. These never fire a
 * native `change`, so the click is the only signal.
 */
function trackSelectClick(target: Element): boolean {
  const selection = resolveSelectSelection(target);
  if (!selection) {
    return false;
  }

  track('ui.select', {
    control: selection.control,
    optionIndex: selection.index,
    optionCount: selection.count,
    optionValue: selection.value,
    section: resolveSection(selection.popup),
  });
  return true;
}

function isDisabledAction(action: Element): boolean {
  return (
    action.matches('[disabled],[aria-disabled="true"]') ||
    Boolean(action.closest('[disabled]'))
  );
}

/** Warn once per element so a repeated click does not flood the console. */
const warnedUnscopedActions = new WeakSet<Element>();

/**
 * Surfaces missing scopes during development. A section is required so events
 * answer "where on the page?"; without it the payload collapses to slot/tag.
 */
function warnUnscopedAction(
  action: Element,
  section: TelemetrySection | undefined,
): void {
  if (section || process.env.NODE_ENV !== 'development') {
    return;
  }
  if (warnedUnscopedActions.has(action)) {
    return;
  }
  warnedUnscopedActions.add(action);
  console.warn(
    '[telemetry] Click captured without a data-track-section scope.',
    action,
  );
}

function trackAction(action: Element): void {
  const section = resolveSection(action);
  warnUnscopedAction(action, section);

  const slot = action.getAttribute('data-slot') ?? undefined;
  const trackKey = action.getAttribute('data-track') ?? undefined;

  if (trackDialogAction(slot, trackKey, section)) {
    return;
  }
  if (trackLinkAction(action, slot, section)) {
    return;
  }

  track('ui.click', {
    slot: slot ?? action.tagName.toLowerCase(),
    tag: action.tagName.toLowerCase(),
    section,
    variant: action.getAttribute('data-variant') ?? undefined,
    role: action.getAttribute('role') ?? undefined,
    trackKey,
    key: action.getAttribute('data-track-key') ?? undefined,
    optionValue: action.getAttribute('data-value') ?? undefined,
    label: resolveActionLabel(action),
  });
}

function handleClick(event: MouseEvent): void {
  if (isTrackingSuppressed()) {
    return;
  }

  const rawTarget = event.target;
  if (!(rawTarget instanceof Element)) {
    return;
  }
  if (rawTarget.closest(TRACK_IGNORE_SELECTOR)) {
    return;
  }

  // Options and segmented controls resolve to a group, not an action element.
  if (trackSegmentedClick(rawTarget) || trackSelectClick(rawTarget)) {
    return;
  }

  const action = resolveActionElement(rawTarget);
  if (!action || isDisabledAction(action)) {
    return;
  }

  trackAction(action);
}

function handleFocusIn(event: FocusEvent, session: CaptureSession): void {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const form = target.closest('form');
  if (!form || session.formBook.has(resolveFormKey(form))) {
    return;
  }

  const key = resolveFormKey(form);
  const fieldCount = countFormFields(form);
  session.formBook.set(key, { form, fieldCount, submitted: false });
  track('form.start', { form: key, fieldCount });
}

function handleSubmit(event: Event, session: CaptureSession): void {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const key = resolveFormKey(form);
  const fieldCount = countFormFields(form);
  const state = session.formBook.get(key) ?? {
    form,
    fieldCount,
    submitted: false,
  };
  state.submitted = true;
  session.formBook.set(key, state);
  track('form.submit', { form: key, fieldCount });

  const timer = setTimeout(() => {
    session.validationTimers.delete(timer);
    if (!form.isConnected) {
      return;
    }

    const invalid = collectInvalidFields(form);
    if (invalid.length === 0) {
      return;
    }

    track('form.submit-failed', {
      form: key,
      invalidFields: invalid.join(','),
    });
    for (const field of invalid) {
      track('input.validation-failed', {
        field,
        form: key,
      });
    }
  }, VALIDATION_SETTLE_MS);
  session.validationTimers.add(timer);
}

function handleChange(event: Event): void {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const section = resolveSection(target);
  trackSelect(target, section);
  trackCheckboxToggle(target, section);
  trackRoleToggle(target, section);
  trackRange(target, section);
}

function handleFocusOut(event: FocusEvent): void {
  const target = event.target;
  if (!(target instanceof Element) || !isTextInput(target)) {
    return;
  }
  // Credential and payment fields stay invisible even on opted-in forms.
  if (isSensitiveField(target)) {
    return;
  }

  const form = target.closest('form');
  const optedIn =
    target.hasAttribute('data-track-input') ||
    Boolean(form?.hasAttribute('data-track-form'));
  if (!optedIn) {
    return;
  }

  const value = target.value ?? '';
  track('input.change', {
    field: resolveFieldName(target),
    kind: target.getAttribute('type') ?? target.tagName.toLowerCase(),
    hasValue: value.length > 0,
    lengthBucket: bucketLength(value.length),
    form: form ? resolveFormKey(form) : undefined,
    section: resolveSection(target),
  });
}

function handleWindowError(event: ErrorEvent): void {
  const target = event.target;
  if (target instanceof Element) {
    const src = target.getAttribute('src') ?? target.getAttribute('href') ?? '';
    track('error.media', {
      kind: resolveResourceKind(target.tagName),
      path: safePath(src),
    });
    return;
  }

  track('error.unhandled', {
    message: scrubMessage(event.message || 'unknown'),
    source: safePath(event.filename || ''),
    line: event.lineno,
    column: event.colno,
  });
}

function handleRejection(event: PromiseRejectionEvent): void {
  const reason =
    event.reason instanceof Error ? event.reason.message : String(event.reason);
  track('error.promise-rejection', { message: scrubMessage(reason) });
}

function handleScroll(session: CaptureSession): void {
  if (session.scrollTicking) {
    return;
  }
  session.scrollTicking = true;

  requestAnimationFrame(() => {
    session.scrollTicking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);

    for (const threshold of SCROLL_THRESHOLDS) {
      if (pct >= threshold && !session.reachedScrollThresholds.has(threshold)) {
        session.reachedScrollThresholds.add(threshold);
        track('session.scroll-depth', {
          pct: threshold,
        });
      }
    }
  });
}

function handleVisibility(session: CaptureSession): void {
  if (document.visibilityState === 'hidden') {
    track('session.visibility', {
      state: 'hidden',
      visibleMs: Date.now() - session.visibleSince,
    });
    telemetry.flush();
    return;
  }
  session.visibleSince = Date.now();
}

function handlePageHide(
  event: PageTransitionEvent,
  session: CaptureSession,
): void {
  // A bfcache-restored document keeps its session; ending it here would report
  // a duration and an abandonment that never happened.
  if (event.persisted) {
    return;
  }

  flushAbandonedForms(session);
  track('session.end', {
    durationMs: Date.now() - sessionStartedAt,
    interactionCount: telemetry.getInteractionCount(),
    routeCount: routeVisits,
  });
  telemetry.flush();
}

/**
 * Forms still open when the page is left were never submitted. Their elements
 * may already be detached by React, but the book still knows the field count.
 */
function flushAbandonedForms(session: CaptureSession): void {
  for (const [key, state] of session.formBook) {
    if (state.submitted) {
      continue;
    }
    state.submitted = true;
    track('form.abandoned', {
      form: key,
      fieldCount: state.fieldCount,
      filledFields: countFilledFields(state.form),
    });
  }
  session.formBook.clear();
}

function disposeSession(session: CaptureSession): void {
  for (const timer of session.validationTimers) {
    clearTimeout(timer);
  }
  session.validationTimers.clear();

  flushAbandonedForms(session);
}

/**
 * Installs one delegated listener set for the whole app. Every handler is
 * module-level and reads from a per-route `CaptureSession`, keeping the hook
 * itself flat.
 */
export function useInteractionTracking(): void {
  const pathname = usePathname();
  const locale = useLocale();

  // The locale is part of the page identity: switching language keeps the
  // locale-relative pathname but is a new page view.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the locale intentionally re-runs the effect.
  useEffect(() => {
    telemetry.notifyRouteChange();
    if (isTrackingSuppressed()) {
      return;
    }

    startSession();
    // Universal page view: emitted for every route, not only the pages that
    // remember to render `ReportRouteVisit`.
    track('nav.route-view', { route: pathname });
    routeVisits += 1;

    const session = createSession();
    const onClick = handleClick;
    const onFocusIn = (event: FocusEvent) => handleFocusIn(event, session);
    const onSubmit = (event: Event) => handleSubmit(event, session);
    const onScroll = () => handleScroll(session);
    const onVisibility = () => handleVisibility(session);
    const onPageHide = (event: PageTransitionEvent) =>
      handlePageHide(event, session);

    document.addEventListener('click', onClick, true);
    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('submit', onSubmit, true);
    document.addEventListener('change', handleChange, true);
    document.addEventListener('focusout', handleFocusOut, true);
    window.addEventListener('error', handleWindowError, true);
    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocusIn, true);
      document.removeEventListener('submit', onSubmit, true);
      document.removeEventListener('change', handleChange, true);
      document.removeEventListener('focusout', handleFocusOut, true);
      window.removeEventListener('error', handleWindowError, true);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      disposeSession(session);
    };
  }, [pathname, locale]);
}
