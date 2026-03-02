import type Emittery from 'emittery';

export function configureEvents(eventBus: Emittery<AppEvents>) {
  // Setting up global window context, mainly used for e2e. Avoid other usecases.
  if (typeof window === 'undefined') {
    return;
  }

  if (window.maw === undefined) {
    window.maw = {};
  }

  if (window.maw._emit === undefined) {
    window.maw._emit = eventBus.emit.bind(eventBus);
  }

  if (window.maw._on === undefined) {
    window.maw._on = eventBus.on.bind(eventBus);
  }
}
