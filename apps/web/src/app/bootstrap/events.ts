import * as EventBus from '@/core/events/event-bus';

// Setting up global window context, mainly used for e2e. Avoid other usecases.
if (typeof window !== 'undefined') {
  if (window.maw === undefined) {
    window.maw = {};
  }

  if (window.maw._emit === undefined) {
    window.maw._emit = EventBus.emit;
  }

  if (window.maw._on === undefined) {
    window.maw._on = EventBus.on;
  }
}
