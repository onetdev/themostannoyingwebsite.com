import { create } from 'zustand';

export interface MonitoringState {
  eventHistory: {
    timestamp: number;
    type: keyof AppEvents;
    payload: AppEvents[keyof AppEvents];
  }[];
  isEventHistoryEnabled: boolean;
  isAuthorized: boolean;
}

export interface MonitoringStateActions {
  pushEventToHistory: (
    type: keyof AppEvents,
    payload: AppEvents[keyof AppEvents],
  ) => void;
  setIsEventHistoryEnabled: (isHistoryEnabled: boolean) => void;
  clearEventHistory: () => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export interface MonitoringStore
  extends MonitoringState,
    MonitoringStateActions {}

const initialState: MonitoringState = {
  eventHistory: [],
  isEventHistoryEnabled: false,
  isAuthorized: false,
};

export const useMonitoringStore = create<MonitoringStore>((set) => ({
  ...initialState,
  pushEventToHistory: (type, payload) =>
    set((state) => ({
      eventHistory: [
        { type, payload, timestamp: Date.now() },
        ...state.eventHistory,
      ].slice(0, 100),
    })),
  setIsEventHistoryEnabled: (isHistoryEnabled) =>
    set({ isEventHistoryEnabled: isHistoryEnabled }),
  clearEventHistory: () => set({ eventHistory: [] }),
  setIsAuthorized: (isAuthorized) => set({ isAuthorized }),
}));
