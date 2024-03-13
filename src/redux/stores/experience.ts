import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '@/redux/store';

export interface ExperienceState {
  mockChat: boolean;
  wheelOfFortune: boolean;
  exitPrompt: boolean;
  contentPaywall: boolean;
}

const initialState: ExperienceState = {
  mockChat: true,
  wheelOfFortune: true,
  exitPrompt: true,
  contentPaywall: true,
};

export const experience = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setMockChat: (state, action: PayloadAction<boolean>) => {
      state.mockChat = action.payload;
    },
    setWheelOfFortune: (state, action: PayloadAction<boolean>) => {
      state.wheelOfFortune = action.payload;
    },
    setExitPrompt: (state, action: PayloadAction<boolean>) => {
      state.exitPrompt = action.payload;
    },
    setContentPaywall: (state, action: PayloadAction<boolean>) => {
      state.contentPaywall = action.payload;
    },
  },
});

export const {
  setMockChat,
  setWheelOfFortune,
  setExitPrompt,
  setContentPaywall,
} = experience.actions;

export const selectMockChat = (state: AppState) => state.experience.mockChat;
export const selectWheelOfFortune = (state: AppState) =>
  state.experience.wheelOfFortune;
export const selectExitPrompt = (state: AppState) =>
  state.experience.exitPrompt;
export const selectContentPaywall = (state: AppState) =>
  state.experience.contentPaywall;

export default experience.reducer;
