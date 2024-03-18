import type { AppState } from '@/redux/store';

const selectRuntime = (state: AppState) => state.runtime;
export const selectStartTime = (state: AppState) =>
  new Date(state.runtime.startTime);
export const selectIsInFocus = (state: AppState) => state.runtime.isInFocus;
export const selectHasInteracted = (state: AppState) =>
  state.runtime.hasInteracted;
export const selectInFocusSeconds = (state: AppState) =>
  state.runtime.inFocusSeconds;

export default selectRuntime;
