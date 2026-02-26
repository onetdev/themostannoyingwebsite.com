import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import config from '@/config';

export const PAIN_PREFERENCES_STORAGE_KEY = 'zustand-pain-preferences-storage';
export const PRIVATE_PAIN_POINT_LIST = [
  'pageTitle.inactiveMarquee',
  'pageTitle.randomGlitch',
] as const;

// The sort of the pain points is important, it might get refactore into
// a weighted struct but it is what it is for now.
export const PUBLIC_PAIN_POINT_LIST = [
  'gifts.oneByOne',
  'gifts.flaps',
  'contentPaywall',
  'mockChat',
  'wheelOfFortune',
  'screensaver',
  'exitPrompt',
  'clipboardMarker',
  'gifts.detectAdblocker',
  'searchDelay',
  'pageTitle.inactiveArrayPaged',
  'deadPixel',
  'disableContextMenu',
  'newsletterModal',
  'historySpam',
  'notifications',
  'stickyVideo',
  'achievements',
] as const;

export const PAIN_POINT_LIST = [
  ...PRIVATE_PAIN_POINT_LIST,
  ...PUBLIC_PAIN_POINT_LIST,
] as const;

export type PainPointKey = (typeof PAIN_POINT_LIST)[number];

export type ScreensaverVariant = 'bouncingLogo' | 'maze';

export type PainPreferencesState = {
  flags: Record<PainPointKey, boolean>;
  publicLevel: {
    current: number;
    max: number;
  };
  screensaver: {
    timeoutSeconds: number;
    variant: ScreensaverVariant;
  };
};

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
  achievements: true,
};

const initialState: PainPreferencesState = {
  flags: initialStateFlags,
  publicLevel: calculatePublicLevelMeta(initialStateFlags),
  screensaver: {
    timeoutSeconds: config.screensaver.defaultTimeoutSeconds,
    variant: 'bouncingLogo',
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
        set(({ screensaver, ...state }) => ({
          ...state,
          screensaver: { ...screensaver, timeoutSeconds },
        })),
      setScreensaverVariant: (variant) =>
        set(({ screensaver, ...state }) => ({
          ...state,
          screensaver: { ...screensaver, variant },
        })),
    }),
    {
      name: PAIN_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState, version) => {
        if (version === 1) {
          const state = persistedState as PainPreferencesState;
          return {
            ...state,
            flags: {
              ...state.flags,
              achievements: initialStateFlags.achievements,
            },
          };
        }

        return persistedState;
      },
    },
  ),
);
