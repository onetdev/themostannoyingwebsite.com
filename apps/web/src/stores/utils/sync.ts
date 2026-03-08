import type { StateCreator } from 'zustand';

// By default Zustand only does hydration on the initial page load
// which is more than fine if the user has only one instance of the orign,
// as soon as there 1+n tabs or windows, state will get overwritten each time
// any of the instances touch a store.
//
// To remedy this race condition (if you can even call it this way) we need
// to utilize BroadcastChannel that will keep all the separate pages in sync.
export const broadcastChannelSync =
  <T>(name: string): ((config: StateCreator<T>) => StateCreator<T>) =>
  (config) =>
  (set, get, api) => {
    if (typeof window === 'undefined') {
      return config(set, get, api);
    }

    const channel = new BroadcastChannel(name);
    const tabId = Math.random().toString(36).substring(2);

    // Listen for changes from other tabs
    channel.onmessage = (event) => {
      if (
        event.data &&
        typeof event.data === 'object' &&
        event.data.source !== tabId
      ) {
        set(event.data.state);
      }
    };

    const nextSet: typeof set = (partial, replace) => {
      // @ts-expect-error - set has multiple overloads that are tricky to wrap with generic T
      set(partial, replace);
      const state = get();

      // Filter out functions from the state before broadcasting
      const serializableState = Object.fromEntries(
        Object.entries(state as Record<string, unknown>).filter(
          ([_, value]) => typeof value !== 'function',
        ),
      );

      channel.postMessage({
        source: tabId,
        state: serializableState,
      });
    };

    return config(nextSet, get, api);
  };
