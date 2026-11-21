import type { InteractionEvent } from '../types';
import { createBusSink } from './bus';

const emit = jest.fn();

jest.mock('@/core/events/event-bus', () => ({
  emit: (...args: unknown[]) => emit(...args),
}));

const sample = {
  id: 'id-1',
  name: 'ui.click',
  category: 'ui',
  timestamp: 1_700_000_000_000,
  sessionId: 'session-1',
  route: '/en/',
  locale: 'en',
  source: 'auto',
  props: {},
} as InteractionEvent;

describe('bus sink', () => {
  beforeEach(() => {
    emit.mockReset();
  });

  it('mirrors the event onto the app bus', () => {
    emit.mockResolvedValue(undefined);
    createBusSink().handle(sample);

    expect(emit).toHaveBeenCalledWith('telemetry:event', sample);
  });

  it('swallows listener rejections instead of raising unhandled ones', () => {
    emit.mockRejectedValue(new Error('listener exploded'));
    const sink = createBusSink();

    expect(() => sink.handle(sample)).not.toThrow();
  });
});
