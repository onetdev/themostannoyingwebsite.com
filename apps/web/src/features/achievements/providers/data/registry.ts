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
  {
    id: 'wheel-of-fortune-spin',
    nameKey: 'achievements.registry.wheelOfFortuneSpin.name',
    descriptionKey: 'achievements.registry.wheelOfFortuneSpin.description',
    type: 'boolean',
  },
  {
    id: 'admin-login',
    nameKey: 'achievements.registry.adminLogin.name',
    descriptionKey: 'achievements.registry.adminLogin.description',
    type: 'boolean',
    secret: true,
  },
  {
    id: 'maze-special-cell',
    nameKey: 'achievements.registry.mazeSpecialCell.name',
    descriptionKey: 'achievements.registry.mazeSpecialCell.description',
    type: 'boolean',
    secret: true,
  },
  {
    id: 'maze-explorer',
    nameKey: 'achievements.registry.mazeExplorer.name',
    descriptionKey: 'achievements.registry.mazeExplorer.description',
    type: 'progression',
    targetProgress: 500,
  },
  {
    id: 'bouncing-logo-corner-hit',
    nameKey: 'achievements.registry.bouncingLogoCornerHit.name',
    descriptionKey: 'achievements.registry.bouncingLogoCornerHit.description',
    type: 'boolean',
  },
  {
    id: 'bouncing-logo-fanatic',
    nameKey: 'achievements.registry.bouncingLogoFanatic.name',
    descriptionKey: 'achievements.registry.bouncingLogoFanatic.description',
    type: 'progression',
    targetProgress: 420,
  },
];

export const getAchievementById = (id: string) =>
  ACHIEVEMENT_REGISTRY.find((a) => a.id === id);
