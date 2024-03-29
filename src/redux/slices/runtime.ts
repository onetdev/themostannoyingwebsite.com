import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RuntimeState {
  document: {
    isVisible: boolean;
    visibilitySeconds: number;
  };
  interactionUnlocked: boolean;
  startedAt: string;
}

const initialState: RuntimeState = {
  document: {
    isVisible: false,
    visibilitySeconds: 0,
  },
  startedAt: new Date().toISOString(),
  interactionUnlocked: false,
};

/**
 * Runtime stores everyting that won't get persisted. This also includes some
 * non-persional statistics.
 */
export const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setIsDocumentVisibile: (state, action: PayloadAction<boolean>) => {
      state.document.isVisible = action.payload;
    },
    markInteractionUnlocked: (state) => {
      state.interactionUnlocked = true;
    },
    incrementVisibilitySeconds: (state) => {
      state.document.visibilitySeconds += 1;
    },
  },
});

export const actions = runtimeSlice.actions;
export default runtimeSlice.reducer;
