import Emittery from 'emittery';

export const eventBus = new Emittery<AppEvents>();
export const emit = eventBus.emit.bind(eventBus);
export const on = eventBus.on.bind(eventBus);

// Setting up global window context, mainly used for e2e. Avoid other usecases.
if (typeof window !== 'undefined') {
  if (window.maw === undefined) {
    window.maw = {};
  }

  if (window.maw._emit !== undefined) {
    window.maw._emit = emit;
  }

  if (window.maw._on !== undefined) {
    window.maw._on = on;
  }
}
