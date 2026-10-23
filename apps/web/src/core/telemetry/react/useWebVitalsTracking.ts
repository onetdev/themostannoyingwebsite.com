'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { track } from '..';
import { safePath } from '../redact';
import type { WebVitalName, WebVitalRating } from '../types';
import { isTrackingSuppressed } from './capture';

/**
 * Next 16 extends the base `web-vitals` metric with navigation metadata. The
 * bundled type does not always expose it, so we read it through this local
 * shape instead of reaching for `any`.
 */
interface ReportedMetric {
  name: string;
  value: number;
  id: string;
  rating?: string;
  navigationType?: string;
  navigationURL?: string;
}

const VITAL_NAMES: ReadonlySet<string> = new Set([
  'TTFB',
  'FCP',
  'LCP',
  'INP',
  'CLS',
]);

const VITAL_RATINGS: ReadonlySet<string> = new Set([
  'good',
  'needs-improvement',
  'poor',
]);

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0];

function reportWebVital(metric: ReportedMetric): void {
  if (!VITAL_NAMES.has(metric.name) || isTrackingSuppressed()) {
    return;
  }

  const name = metric.name as WebVitalName;
  const rating = (
    metric.rating && VITAL_RATINGS.has(metric.rating) ? metric.rating : 'good'
  ) as WebVitalRating;

  // CLS is unitless; store it in thousandths so every vital is an integer.
  const value =
    name === 'CLS' ? Math.round(metric.value * 1000) : Math.round(metric.value);

  track('perf.web-vital', {
    metric: name,
    value,
    rating,
    navigationType: metric.navigationType ?? 'navigate',
    metricId: metric.id,
    route: safePath(metric.navigationURL ?? window.location.pathname),
  });
}

/**
 * Captures real-user Core Web Vitals (TTFB, FCP, LCP, INP, CLS) for every hard
 * navigation and soft navigation, attributed to the route they belong to.
 *
 * The callback is deliberately module-level: `useReportWebVitals` replays all
 * known metrics whenever its callback identity changes.
 */
const reportVital: ReportWebVitalsCallback = (metric) =>
  reportWebVital(metric as unknown as ReportedMetric);

export function useWebVitalsTracking(): void {
  useReportWebVitals(reportVital);
}
