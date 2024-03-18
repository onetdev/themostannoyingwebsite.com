import type { AppState } from '@/redux/store';

const selectExperience = (state: AppState) => state.experience;
export const selectMockChat = (state: AppState) => state.experience.mockChat;
export const selectWheelOfFortune = (state: AppState) =>
  state.experience.wheelOfFortune;
export const selectExitPrompt = (state: AppState) =>
  state.experience.exitPrompt;
export const selectContentPaywall = (state: AppState) =>
  state.experience.contentPaywall;

export default selectExperience;
