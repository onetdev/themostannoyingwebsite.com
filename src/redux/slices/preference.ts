import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ColorScheme } from '@/hooks/useSystemColorScheme';

export type UserColorScheme = ColorScheme | 'auto';
export interface PreferenceState {
  colorScheme: UserColorScheme;
  enableSound: boolean;
  enableFlashing: boolean;
  adultFilter: boolean;
}

const initialState: PreferenceState = {
  colorScheme: 'auto',
  enableSound: true,
  enableFlashing: false,
  adultFilter: true,
};

export const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<UserColorScheme>) => {
      state.colorScheme = action.payload;
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

export const actions = preferenceSlice.actions;
export default preferenceSlice.reducer;
