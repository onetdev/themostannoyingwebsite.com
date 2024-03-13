import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '@/redux/store';

export interface PreferenceState {
  isDarkMode: boolean;
  enableSound: boolean;
  enableFlashing: boolean;
  adultFilter: boolean;
}

const initialState: PreferenceState = {
  isDarkMode: false,
  enableSound: true,
  enableFlashing: false,
  adultFilter: true,
};

export const preference = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setEnableSound: (state, action: PayloadAction<boolean>) => {
      state.enableSound = action.payload;
    },
    setEnableFlashing: (state, action: PayloadAction<boolean>) => {
      state.enableFlashing = action.payload;
    },
    setAdultFilter: (state, action: PayloadAction<boolean>) => {
      state.adultFilter = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setEnableSound,
  setEnableFlashing,
  setAdultFilter,
} = preference.actions;

export const selectDarkMode = (state: AppState) => state.preference.isDarkMode;
export const selectEnableSound = (state: AppState) =>
  state.preference.enableSound;
export const selectEnableFlashing = (state: AppState) =>
  state.preference.enableFlashing;
export const selectAdultFilter = (state: AppState) =>
  state.preference.adultFilter;

export default preference.reducer;
