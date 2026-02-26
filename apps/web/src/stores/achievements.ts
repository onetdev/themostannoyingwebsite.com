import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const ACHIEVEMENTS_STORAGE_KEY = 'zustand-achievements-storage';

export interface AchievementState {
  id: string;
  achieved: boolean;
  progress: number;
  completedAt?: number;
}

export interface AchievementsState {
  achievements: Record<string, AchievementState>;
}

export interface AchievementsActions {
  setAchievementProgress: (
    id: string,
    progress: number,
    targetProgress: number,
  ) => boolean;
  incrementAchievementProgress: (
    id: string,
    amount: number,
    targetProgress: number,
  ) => boolean;
  completeAchievement: (id: string) => boolean;
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
    (set, get) => ({
      ...initialState,

      setAchievementProgress: (id, progress, targetProgress) => {
        const current = get().achievements[id] || {
          id,
          achieved: false,
          progress: 0,
        };

        if (current.achieved) return false;

        const newProgress = Math.min(progress, targetProgress);
        const newlyAchieved = newProgress >= targetProgress;

        set((state) => ({
          achievements: {
            ...state.achievements,
            [id]: {
              ...current,
              id,
              progress: newProgress,
              achieved: newlyAchieved,
              completedAt: newlyAchieved ? Date.now() : undefined,
            },
          },
        }));

        return newlyAchieved;
      },

      incrementAchievementProgress: (id, amount, targetProgress) => {
        const current = get().achievements[id] || {
          id,
          achieved: false,
          progress: 0,
        };

        if (current.achieved) return false;

        const newProgress = Math.min(current.progress + amount, targetProgress);
        const newlyAchieved = newProgress >= targetProgress;

        set((state) => ({
          achievements: {
            ...state.achievements,
            [id]: {
              ...current,
              id,
              progress: newProgress,
              achieved: newlyAchieved,
              completedAt: newlyAchieved ? Date.now() : undefined,
            },
          },
        }));

        return newlyAchieved;
      },

      completeAchievement: (id) => {
        const current = get().achievements[id];
        if (current?.achieved) return false;

        set((state) => ({
          achievements: {
            ...state.achievements,
            [id]: {
              id,
              progress: 1, // Treat as 1 for boolean achievements
              achieved: true,
              completedAt: Date.now(),
            },
          },
        }));

        return true;
      },

      resetAchievements: () => set(initialState),
    }),
    {
      name: ACHIEVEMENTS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
