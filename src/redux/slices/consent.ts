import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConsentState {
  reviewCompleted: boolean;
  allowCookies: boolean;
  allowLocation: boolean | null;
  allowNotification: boolean | null;
}

const initialState: ConsentState = {
  reviewCompleted: false,
  allowCookies: true,
  allowLocation: null,
  allowNotification: null,
};

export const consent = createSlice({
  name: 'consent',
  initialState,
  reducers: {
    setReviewCompleted: (state, action: PayloadAction<boolean>) => {
      state.reviewCompleted = action.payload;
    },
    setAllowCookies: (state, action: PayloadAction<boolean>) => {
      state.allowCookies = action.payload;
    },
    setAllowLocation: (state, action: PayloadAction<boolean>) => {
      state.allowLocation = action.payload;
    },
    setAllowNotification: (state, action: PayloadAction<boolean>) => {
      state.allowNotification = action.payload;
    },
  },
});

export const {
  setReviewCompleted,
  setAllowCookies,
  setAllowLocation,
  setAllowNotification,
} = consent.actions;

export default consent.reducer;
