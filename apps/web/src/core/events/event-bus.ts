import Emittery from 'emittery';

export const eventBus = new Emittery<AppEvents>();
export const emit = eventBus.emit.bind(eventBus);
export const on = eventBus.on.bind(eventBus);
