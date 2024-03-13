import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '@/redux/store';

export interface RuntimeState {
  startTime: string;
  isInFocus: boolean;
  inFocusSeconds: number;
  hasInteracted: boolean;
}

const initialState: RuntimeState = {
  startTime: new Date().toISOString(),
  isInFocus: false,
  inFocusSeconds: 0,
  hasInteracted: false,
};

/**
 * Runtime stores everyting that won't get persisted. This also includes some
 * non-persional statistics.
 */
export const runtime = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setIsInFocus: (state, action: PayloadAction<boolean>) => {
      state.isInFocus = action.payload;
    },
    setHasInteracted: (state) => {
      state.hasInteracted = true;
    },
    setInFocusSeconds: (state, action: PayloadAction<number>) => {
      state.inFocusSeconds = action.payload;
    },
  },
});

export const { setIsInFocus, setHasInteracted, setInFocusSeconds } =
  runtime.actions;

export const selectStartTime = (state: AppState) =>
  new Date(state.runtime.startTime);
export const selectIsInFocus = (state: AppState) => state.runtime.isInFocus;
export const selectHasInteracted = (state: AppState) =>
  state.runtime.hasInteracted;
export const selectInFocusSeconds = (state: AppState) =>
  state.runtime.inFocusSeconds;

export default runtime.reducer;
