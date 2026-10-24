'use client';

import { useEffect } from 'react';
import { telemetry } from '..';
import { useTelemetryBusBridge } from '../bus-bridge';
import { findUnscopedActions } from './capture';
import { useImpressionTracking } from './useImpressionTracking';
import { useInteractionTracking } from './useInteractionTracking';
import { useWebVitalsTracking } from './useWebVitalsTracking';

function installDebugHandle(): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (window.maw === undefined) {
    window.maw = {};
  }
  window.maw.tracker = {
    history: telemetry.getHistory,
    setEnabled: telemetry.setEnabled,
    isEnabled: telemetry.isEnabled,
    flush: telemetry.flush,
    auditScopes: () => findUnscopedActions(document),
  };
}

/**
 * Mounts the whole interaction-observability layer once per app instance:
 * bus bridge, DOM capture, impressions, and web vitals.
 *
 * A disabled tracker still exposes the read-only debug handle (useful for the
 * e2e scope audit), but installs no listeners or observers.
 */
export function TelemetryProvider() {
  useEffect(() => {
    installDebugHandle();
  }, []);

  if (!telemetry.isEnabled()) {
    return null;
  }

  return <TelemetryCapture />;
}

function TelemetryCapture() {
  useTelemetryBusBridge();
  useInteractionTracking();
  useImpressionTracking();
  useWebVitalsTracking();

  return null;
}
