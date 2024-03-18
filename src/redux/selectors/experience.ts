import type { AppRootState } from '@/redux/store';

const selectExperience = (state: AppRootState) => state.experience;
export const selectMockChat = (state: AppRootState) =>
  state.experience.mockChat;
export const selectWheelOfFortune = (state: AppRootState) =>
  state.experience.wheelOfFortune;
export const selectExitPrompt = (state: AppRootState) =>
  state.experience.exitPrompt;
export const selectContentPaywall = (state: AppRootState) =>
  state.experience.contentPaywall;

export default selectExperience;
