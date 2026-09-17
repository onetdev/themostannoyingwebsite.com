import 'core-js/actual/iterator/filter';
import 'core-js/actual/iterator/map';
import 'core-js/actual/iterator/to-array';
import Emittery from 'emittery';
import { configureEvents } from '@/app/bootstrap/events';

export const eventBus = new Emittery<AppEvents>();
export const emit = eventBus.emit.bind(eventBus);
export const on = eventBus.on.bind(eventBus);

configureEvents(eventBus);
