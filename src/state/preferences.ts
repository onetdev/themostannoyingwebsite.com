import { create } from 'zustand';

export interface PreferenceState {
  enableSound: boolean;
  enableFlashing: boolean;
  adultFilter: boolean;
}

export interface PreferenceStateActions {
  setEnableSound: (enableSound: boolean) => void;
  setEnableFlashing: (enableFlashing: boolean) => void;
  setAdultFilter: (adultFilter: boolean) => void;
}

const initialState: PreferenceState = {
  enableSound: true,
  enableFlashing: false,
  adultFilter: true,
};

export const usePreferenceStore = create<
  PreferenceState & PreferenceStateActions
>((set) => ({
  ...initialState,
  setEnableSound: (enableSound) => set({ enableSound }),
  setEnableFlashing: (enableFlashing) => set({ enableFlashing }),
  setAdultFilter: (adultFilter) => set({ adultFilter }),
}));
