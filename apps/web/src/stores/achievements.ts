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
  ) => void;
  incrementAchievementProgress: (
    id: string,
    amount: number,
    targetProgress: number,
  ) => void;
  completeAchievement: (id: string) => void;
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

        if (current.achieved) return;

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
      },

      incrementAchievementProgress: (id, amount, targetProgress) => {
        const current = get().achievements[id] || {
          id,
          achieved: false,
          progress: 0,
        };

        if (current.achieved) return;

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
      },

      completeAchievement: (id) => {
        const current = get().achievements[id];
        if (current?.achieved) return;

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
