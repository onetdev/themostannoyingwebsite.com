import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export default preference.reducer;
