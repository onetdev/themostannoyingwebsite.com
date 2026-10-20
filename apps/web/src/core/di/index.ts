import { configureServerContainer } from './container.server';
import { createLazyContainer } from './lazy-container';

export const getDependencyContainer = createLazyContainer(
  configureServerContainer,
);
