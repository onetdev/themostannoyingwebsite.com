'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

// biome-ignore lint/suspicious/noExplicitAny: TODO: Add proper type
export type EventPayload = any;

export type EventBusEvent<T = EventPayload> = {
  type: string;
  payload?: T;
  timestamp: number;
};

export type EventBusListener<T = EventPayload> = (
  event: EventBusEvent<T>,
) => void;

interface EventBusContextValue {
  dispatch: <T = EventPayload>(type: string, payload?: T) => void;
  subscribe: <T = EventPayload>(
    type: string,
    listener: EventBusListener<T>,
  ) => () => void;
}

const EventBusContext = createContext<EventBusContextValue | null>(null);

export function EventBusProvider({ children }: PropsWithChildren) {
  const eventTarget = useRef<EventTarget>(null);

  if (!eventTarget.current && typeof window !== 'undefined') {
    eventTarget.current = new EventTarget();
  }

  const value = useMemo(
    () => ({
      dispatch: <T = EventPayload>(type: string, payload?: T) => {
        const event = new CustomEvent(type, {
          detail: {
            type,
            payload,
            timestamp: Date.now(),
          },
        });
        eventTarget.current?.dispatchEvent(event);
      },
      subscribe: <T = EventPayload>(
        type: string,
        listener: EventBusListener<T>,
      ) => {
        const wrappedListener = (e: Event) => {
          const customEvent = e as CustomEvent<EventBusEvent<T>>;
          listener(customEvent.detail);
        };
        eventTarget.current?.addEventListener(type, wrappedListener);
        return () => {
          eventTarget.current?.removeEventListener(type, wrappedListener);
        };
      },
    }),
    [],
  );

  return (
    <EventBusContext.Provider value={value}>
      {children}
    </EventBusContext.Provider>
  );
}

export function useEventBus() {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error('useEventBus must be used within an EventBusProvider');
  }
  return context;
}

/**
 * Hook to subscribe to an event from the event bridge.
 */
export function useEventBusListener<T = EventPayload>(
  type: string,
  listener: EventBusListener<T>,
) {
  const { subscribe } = useEventBus();
  const savedListener = useRef(listener);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    return subscribe(type, (event) => savedListener.current(event));
  }, [type, subscribe]);
}
