import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '@/redux/store';

export interface ConsentState {
  reviewCompleted: boolean;
  allowCookies: boolean;
  allowAnalytics: boolean;
  allowLocation: boolean | null;
  allowNotification: boolean | null;
}

const initialState: ConsentState = {
  reviewCompleted: false,
  allowCookies: true,
  allowAnalytics: true,
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
    setAllowAnalytics: (state, action: PayloadAction<boolean>) => {
      state.allowAnalytics = action.payload;
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
  setAllowAnalytics,
  setAllowLocation,
  setAllowNotification,
} = consent.actions;

export const selectReviewCompleted = (state: AppState) =>
  state.consent.reviewCompleted;
export const selectAllowCookies = (state: AppState) =>
  state.consent.allowCookies;
export const selectAllowAnalytics = (state: AppState) =>
  state.consent.allowAnalytics;
export const selectAllowLocation = (state: AppState) =>
  state.consent.allowLocation;
export const selectAllowNotification = (state: AppState) =>
  state.consent.allowNotification;

export default consent.reducer;
