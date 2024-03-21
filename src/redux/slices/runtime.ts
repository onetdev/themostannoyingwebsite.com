import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
export const runtimeSlice = createSlice({
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
    incrementInFocusSeconds: (state) => {
      state.inFocusSeconds += 1;
    },
  },
});

export const actions = runtimeSlice.actions;
export default runtimeSlice.reducer;
