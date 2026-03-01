import { create } from 'zustand';

export interface MonitoringState {
  eventHistory: EventBusEvent<unknown>[];
  isEventHistoryEnabled: boolean;
  isAuthorized: boolean;
}

export interface MonitoringStateActions {
  pushEventToHistory: (event: EventBusEvent<unknown>) => void;
  setIsEventHistoryEnabled: (isHistoryEnabled: boolean) => void;
  clearEventHistory: () => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

export interface MonitoringStore extends MonitoringState, MonitoringStateActions {}

const initialState: MonitoringState = {
  eventHistory: [],
  isEventHistoryEnabled: false,
  isAuthorized: false,
};

export const useMonitoringStore = create<MonitoringStore>((set) => ({
  ...initialState,
  pushEventToHistory: (event) =>
    set((state) => ({
      eventHistory: [event, ...state.eventHistory].slice(0, 100),
    })),
  setIsEventHistoryEnabled: (isHistoryEnabled) => set({ isEventHistoryEnabled: isHistoryEnabled }),
  clearEventHistory: () => set({ eventHistory: [] }),
  setIsAuthorized: (isAuthorized) => set({ isAuthorized }),
}));
