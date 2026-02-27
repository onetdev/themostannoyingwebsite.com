import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import config from '@/config';
import type { ScreensaverVariant } from '@/features/obstructor/schemas';
import {
  type PainPointKey,
  type PainPreferencesState,
  PainPreferencesStateSchema,
  PUBLIC_PAIN_POINT_LIST,
} from './pain-preferences-schema';

export const PAIN_PREFERENCES_STORAGE_KEY = 'zustand-pain-preferences-storage';

function calculatePublicLevelMeta(
  painPointFlags: PainPreferencesState['flags'],
): PainPreferencesState['publicLevel'] {
  const current = PUBLIC_PAIN_POINT_LIST.reduce(
    (acc, exp) => acc + (painPointFlags[exp] ? 1 : 0),
    0,
  );

  return {
    current,
    max: PUBLIC_PAIN_POINT_LIST.length,
  };
}

export interface PainPreferencesStateActions {
  allDisable: () => void;
  allEnable: () => void;
  setFlag: (key: PainPointKey, value: boolean) => void;
  setFlagIndeterminate: (
    key: PainPointKey,
    value: boolean | 'indeterminate',
  ) => void;
  setLevel: (level: number) => void;
  setScreensaverTimeoutSeconds: (timeoutSeconds: number) => void;
  setScreensaverVariant: (variant: ScreensaverVariant) => void;
}

export interface PainPreferencesStore
  extends PainPreferencesState,
    PainPreferencesStateActions {}

const initialStateFlags: PainPreferencesState['flags'] = {
  'gifts.detectAdblocker': true,
  'gifts.flaps': true,
  'gifts.oneByOne': true,
  'pageTitle.inactiveArrayPaged': true,
  'pageTitle.inactiveMarquee': false,
  'pageTitle.randomGlitch': false,
  clipboardMarker: true,
  contentPaywall: true,
  deadPixel: true,
  disableContextMenu: true,
  exitPrompt: true,
  historySpam: true,
  mockChat: true,
  newsletterModal: true,
  notifications: false,
  screensaver: true,
  searchDelay: true,
  stickyVideo: false,
  wheelOfFortune: true,
  achievementNotifications: true,
};

const initialState: PainPreferencesState = {
  flags: initialStateFlags,
  publicLevel: calculatePublicLevelMeta(initialStateFlags),
  screensaver: {
    timeoutSeconds: config.obstructor.screensaver.defaultTimeoutSeconds,
    variant: config.obstructor.screensaver.defaultVariant as ScreensaverVariant,
  },
};

export const usePainPreferencesStore = create<PainPreferencesStore>()(
  persist(
    (set) => ({
      ...initialState,
      allDisable: () =>
        set((state) => {
          const newFlags = { ...state.flags };
          (Object.keys(initialStateFlags) as PainPointKey[]).forEach((key) => {
            newFlags[key] = false;
          });
          return {
            ...state,
            flags: newFlags,
            publicLevel: calculatePublicLevelMeta(newFlags),
          };
        }),
      allEnable: () => {
        set((state) => {
          const nextFlags = { ...state.flags };
          PUBLIC_PAIN_POINT_LIST.forEach((key) => {
            nextFlags[key] = true;
          });
          return {
            ...state,
            flags: nextFlags,
            publicLevel: calculatePublicLevelMeta(nextFlags),
          };
        });
      },
      setFlag: (key, value) =>
        set((state) => {
          const nextFlags = { ...state.flags, [key]: value };
          return {
            ...state,
            flags: nextFlags,
            publicLevel: calculatePublicLevelMeta(nextFlags),
          };
        }),
      setFlagIndeterminate: (
        key: PainPointKey,
        value: boolean | 'indeterminate',
      ) =>
        set((state) => {
          const nextValue =
            value === 'indeterminate' ? initialStateFlags[key] : value;
          const nextFlags = { ...state.flags, [key]: nextValue };
          return {
            ...state,
            flags: nextFlags,
            publicLevel: calculatePublicLevelMeta(nextFlags),
          };
        }),
      setLevel: (level) =>
        set((state) => {
          const nextFlags = { ...state.flags };

          PUBLIC_PAIN_POINT_LIST.forEach((exp, index) => {
            const shouldEnable = index < level;
            nextFlags[exp] = shouldEnable;
          });

          return {
            ...state,
            flags: nextFlags,
            publicLevel: calculatePublicLevelMeta(nextFlags),
          };
        }),
      setScreensaverTimeoutSeconds: (timeoutSeconds) =>
        set(({ screensaver, ...stateRest }) => ({
          ...stateRest,
          screensaver: { ...screensaver, timeoutSeconds },
        })),
      setScreensaverVariant: (variant) =>
        set(({ screensaver, ...stateRest }) => ({
          ...stateRest,
          screensaver: { ...screensaver, variant },
        })),
    }),
    {
      name: PAIN_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 3,
      migrate: (persistedState, _version) => {
        const sanitizedSchema = PainPreferencesStateSchema.strip().parse(persistedState);

        const flags = {
          ...initialStateFlags,
          ...sanitizedSchema.flags,
        }

        return {
          flags,
          publicLevel: calculatePublicLevelMeta(flags),
          screensaver: {
            ...initialState.screensaver,
            ...sanitizedSchema.screensaver,
          },
        } satisfies PainPreferencesState;
      },
    },
  ),
);
