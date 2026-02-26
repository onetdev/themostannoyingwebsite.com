import type { AchievementDefinition } from '../../types';

export const ACHIEVEMENT_REGISTRY: AchievementDefinition[] = [
  {
    id: 'first-visit',
    nameKey: 'achievements.registry.firstVisit.name',
    descriptionKey: 'achievements.registry.firstVisit.description',
    type: 'boolean',
  },
  {
    id: 'first-package-selection',
    nameKey: 'achievements.registry.firstPackageSelection.name',
    descriptionKey: 'achievements.registry.firstPackageSelection.description',
    type: 'boolean',
  },
  {
    id: 'first-search',
    nameKey: 'achievements.registry.firstSearch.name',
    descriptionKey: 'achievements.registry.firstSearch.description',
    type: 'boolean',
  },
  {
    id: 'right-click-rebel',
    nameKey: 'achievements.registry.rightClickRebel.name',
    descriptionKey: 'achievements.registry.rightClickRebel.description',
    type: 'progression',
    targetProgress: 20,
  },
  {
    id: 'copy-paste-criminal',
    nameKey: 'achievements.registry.copyPasteCriminal.name',
    descriptionKey: 'achievements.registry.copyPasteCriminal.description',
    type: 'progression',
    targetProgress: 5,
  },
  {
    id: 'escape-artist',
    nameKey: 'achievements.registry.escapeArtist.name',
    descriptionKey: 'achievements.registry.escapeArtist.description',
    type: 'boolean',
  },
  {
    id: 'dead-pixel-hunter',
    nameKey: 'achievements.registry.deadPixelHunter.name',
    descriptionKey: 'achievements.registry.deadPixelHunter.description',
    type: 'boolean',
  },
];

export const getAchievementById = (id: string) =>
  ACHIEVEMENT_REGISTRY.find((a) => a.id === id);
