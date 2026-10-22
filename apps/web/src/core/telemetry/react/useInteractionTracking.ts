'use client';

import { useEffect } from 'react';
import { usePathname } from '@/core/i18n/navigation';
import { telemetry, track, trackOnce } from '..';
import { bucketLength, safePath, scrubMessage } from '../redact';
import {
  collectInvalidFields,
  countFilledFields,
  countFormFields,
  getLinkKind,
  isTextInput,
  isTrackingSuppressed,
  readReferrerKind,
  readViewportBucket,
  resolveActionElement,
  resolveControlName,
  resolveFieldName,
  resolveFormKey,
  resolveResourceKind,
  resolveSection,
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

  trackOnce('session:start', 'session.start', {
    entryRoute: safePath(window.location.pathname),
    referrerKind: readReferrerKind(document.referrer, window.location.origin),
    viewport: readViewportBucket(window.innerWidth),
  });
}

function trackSelect(target: Element, section?: string): boolean {
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

function trackCheckboxToggle(target: Element, section?: string): boolean {
  if (!(target instanceof HTMLInputElement)) {
    return false;
  }
  const type = target.getAttribute('type');
  if (type !== 'checkbox' && type !== 'radio') {
    return false;
  }
  track('ui.toggle', {
    control: resolveControlName(target),
    checked: target.checked,
    section,
    source: type,
  });
  return true;
}

function trackRoleToggle(target: Element, section?: string): boolean {
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

function trackRange(target: Element, section?: string): boolean {
  if (!(target instanceof HTMLInputElement) || target.type !== 'range') {
    return false;
  }
  track('ui.slider', {
    control: resolveControlName(target),
    valueBucket: Math.round(Number(target.value) / 10) * 10,
    section,
  });
  return true;
}

function trackDialogAction(
  slot: string | undefined,
  trackKey: string | undefined,
  section: string | undefined,
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
  section: string | undefined,
): boolean {
  const href = action.getAttribute('href');
  if (action.tagName !== 'A' || !href) {
    return false;
  }
  const kind = getLinkKind(href, window.location.origin);
  if (kind === 'hash' || kind === 'other') {
    return false;
  }
  track('nav.link-click', { kind, path: safePath(href), section, slot });
  return true;
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

  const action = resolveActionElement(rawTarget);
  if (!action) {
    return;
  }
  if (
    action.matches('[disabled],[aria-disabled="true"]') ||
    action.closest('[disabled]')
  ) {
    return;
  }

  const section = resolveSection(action);
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
  });
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
      reason: 'validation',
      invalidFields: invalid.map((item) => item.field).join(','),
    });
    for (const item of invalid) {
      track('input.validation-failed', {
        field: item.field,
        code: item.code,
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

  const form = target.closest('form');
  const optedIn =
    target.hasAttribute('data-track-input') ||
    Boolean(form?.hasAttribute('data-track-form'));
  if (!optedIn) {
    return;
  }

  const value = (target as HTMLInputElement).value ?? '';
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
    route: safePath(window.location.pathname),
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
          route: safePath(window.location.pathname),
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

function handlePageHide(): void {
  track('session.end', {
    durationMs: Date.now() - sessionStartedAt,
    interactionCount: telemetry.getInteractionCount(),
    routeCount: routeVisits,
  });
  telemetry.flush();
}

function disposeSession(session: CaptureSession): void {
  for (const timer of session.validationTimers) {
    clearTimeout(timer);
  }
  session.validationTimers.clear();

  for (const [key, state] of session.formBook) {
    if (state.submitted || !state.form.isConnected) {
      continue;
    }
    track('form.abandoned', {
      form: key,
      fieldCount: state.fieldCount,
      filledFields: countFilledFields(state.form),
    });
  }
  session.formBook.clear();
}

/**
 * Installs one delegated listener set for the whole app. Every handler is
 * module-level and reads from a per-route `CaptureSession`, keeping the hook
 * itself flat.
 */
export function useInteractionTracking(): void {
  const pathname = usePathname();

  useEffect(() => {
    telemetry.notifyRouteChange();
    startSession();
    routeVisits += 1;

    const session = createSession();
    const onClick = handleClick;
    const onFocusIn = (event: FocusEvent) => handleFocusIn(event, session);
    const onSubmit = (event: Event) => handleSubmit(event, session);
    const onScroll = () => handleScroll(session);
    const onVisibility = () => handleVisibility(session);

    document.addEventListener('click', onClick, true);
    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('submit', onSubmit, true);
    document.addEventListener('change', handleChange, true);
    document.addEventListener('focusout', handleFocusOut, true);
    window.addEventListener('error', handleWindowError, true);
    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', handlePageHide);

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
      window.removeEventListener('pagehide', handlePageHide);
      disposeSession(session);
    };
  }, [pathname]);
}
