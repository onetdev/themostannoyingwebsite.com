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
 */
export function TelemetryProvider() {
  useTelemetryBusBridge();
  useInteractionTracking();
  useImpressionTracking();
  useWebVitalsTracking();

  useEffect(() => {
    installDebugHandle();
  }, []);

  return null;
}
