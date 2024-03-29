import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ExperienceState {
  contentPaywall: boolean;
  exitPrompt: boolean;
  mockChat: boolean;
  pageTitle: {
    inactiveArrayPaged: boolean;
    inactiveMarquee: boolean;
    randomGlitch: boolean;
  };
  wheelOfFortune: boolean;
}

const initialState: ExperienceState = {
  contentPaywall: true,
  exitPrompt: true,
  mockChat: true,
  // `inactiveMarquee` and `randomGlitch` are not enabled because title refresh rate is to low
  // maybe these can be turned on at a later point.
  pageTitle: {
    inactiveMarquee: false,
    randomGlitch: false,
    inactiveArrayPaged: true,
  },
  wheelOfFortune: true,
};

export const experienceSlice = createSlice({
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
    setPageTitle: (
      state,
      action: PayloadAction<Partial<ExperienceState['pageTitle']>>,
    ) => {
      state.pageTitle = { ...state.pageTitle, ...action.payload };
    },
  },
});

export const actions = experienceSlice.actions;
export default experienceSlice.reducer;
