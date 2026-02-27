import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { broadcastChannelSync } from '@/stores/utils/sync';

export const ACHIEVEMENTS_STORAGE_KEY = 'zustand-achievements-storage';

export interface AchievementState {
  id: string;
  achieved: boolean;
  progress: number;
  completedAt?: number;
  updatedAt?: number;
  lastNotifiedAt?: number;
}

export interface AchievementUpdateResult {
  newlyAchieved: boolean;
  progress: number;
  lastNotifiedAt?: number;
}

export interface AchievementsState {
  achievements: Record<string, AchievementState>;
}

export interface AchievementsActions {
  setAchievementProgress: (
    id: string,
    progress: number,
    targetProgress: number,
  ) => AchievementUpdateResult;
  incrementAchievementProgress: (
    id: string,
    amount: number,
    targetProgress: number,
  ) => AchievementUpdateResult;
  completeAchievement: (id: string) => boolean;
  notifyAchievementProgress: (id: string) => void;
  resetAchievements: () => void;
}

export interface AchievementsStore
  extends AchievementsState,
    AchievementsActions {}

const initialState: AchievementsState = {
  achievements: {},
};

export const useAchievementsStore = create<AchievementsStore>()(
  persist(
    broadcastChannelSync<AchievementsStore>(ACHIEVEMENTS_STORAGE_KEY)(
      (set, get) => ({
        ...initialState,

        setAchievementProgress: (id, progress, targetProgress) => {
          const current = get().achievements[id] || {
            id,
            achieved: false,
            progress: 0,
          };

          if (current.achieved)
            return {
              newlyAchieved: false,
              progress: current.progress,
              lastNotifiedAt: current.lastNotifiedAt,
            };

          const newProgress = Math.min(progress, targetProgress);
          const newlyAchieved = newProgress >= targetProgress;

          const now = Date.now();
          const lastNotifiedAt = current.lastNotifiedAt;

          set((state) => ({
            achievements: {
              ...state.achievements,
              [id]: {
                ...current,
                id,
                progress: newProgress,
                achieved: newlyAchieved,
                completedAt: newlyAchieved ? now : current.completedAt,
                updatedAt: now,
              },
            },
          }));

          return {
            newlyAchieved,
            progress: newProgress,
            lastNotifiedAt,
          };
        },

        incrementAchievementProgress: (id, amount, targetProgress) => {
          const current = get().achievements[id] || {
            id,
            achieved: false,
            progress: 0,
          };

          if (current.achieved)
            return {
              newlyAchieved: false,
              progress: current.progress,
              lastNotifiedAt: current.lastNotifiedAt,
            };

          const newProgress = Math.min(
            current.progress + amount,
            targetProgress,
          );
          const newlyAchieved = newProgress >= targetProgress;

          const now = Date.now();
          const lastNotifiedAt = current.lastNotifiedAt;

          set((state) => ({
            achievements: {
              ...state.achievements,
              [id]: {
                ...current,
                id,
                progress: newProgress,
                achieved: newlyAchieved,
                completedAt: newlyAchieved ? now : current.completedAt,
                updatedAt: now,
              },
            },
          }));

          return {
            newlyAchieved,
            progress: newProgress,
            lastNotifiedAt: lastNotifiedAt,
          };
        },

        completeAchievement: (id) => {
          const current = get().achievements[id];
          if (current?.achieved) return false;

          const now = Date.now();
          set((state) => ({
            achievements: {
              ...state.achievements,
              [id]: {
                id,
                progress: 1, // Treat as 1 for boolean achievements
                achieved: true,
                completedAt: now,
                updatedAt: now,
                lastNotifiedAt: now,
              },
            },
          }));

          return true;
        },

        notifyAchievementProgress: (id) => {
          const current = get().achievements[id];
          if (!current) return;

          set((state) => ({
            achievements: {
              ...state.achievements,
              [id]: {
                ...current,
                lastNotifiedAt: Date.now(),
              },
            },
          }));
        },

        resetAchievements: () => set(initialState),
      }),
    ),
    {
      name: ACHIEVEMENTS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
