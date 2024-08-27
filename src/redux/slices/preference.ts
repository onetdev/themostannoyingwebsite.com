import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferenceState {
  enableSound: boolean;
  enableFlashing: boolean;
  adultFilter: boolean;
}

const initialState: PreferenceState = {
  enableSound: true,
  enableFlashing: false,
  adultFilter: true,
};

export const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
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
