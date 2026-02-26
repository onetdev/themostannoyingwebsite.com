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

export type EventBridgeEvent<T = EventPayload> = {
  type: string;
  payload?: T;
  timestamp: number;
};

export type EventBridgeListener<T = EventPayload> = (
  event: EventBridgeEvent<T>,
) => void;

interface EventBridgeContextValue {
  dispatch: <T = EventPayload>(type: string, payload?: T) => void;
  subscribe: <T = EventPayload>(
    type: string,
    listener: EventBridgeListener<T>,
  ) => () => void;
}

const EventBridgeContext = createContext<EventBridgeContextValue | null>(null);

export function EventBridgeProvider({ children }: PropsWithChildren) {
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
        listener: EventBridgeListener<T>,
      ) => {
        const wrappedListener = (e: Event) => {
          const customEvent = e as CustomEvent<EventBridgeEvent<T>>;
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
    <EventBridgeContext.Provider value={value}>
      {children}
    </EventBridgeContext.Provider>
  );
}

export function useEventBridge() {
  const context = useContext(EventBridgeContext);
  if (!context) {
    throw new Error(
      'useEventBridge must be used within an EventBridgeProvider',
    );
  }
  return context;
}

/**
 * Hook to subscribe to an event from the event bridge.
 */
export function useEventBridgeListener<T = EventPayload>(
  type: string,
  listener: EventBridgeListener<T>,
) {
  const { subscribe } = useEventBridge();
  const savedListener = useRef(listener);

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    return subscribe(type, (event) => savedListener.current(event));
  }, [type, subscribe]);
}
