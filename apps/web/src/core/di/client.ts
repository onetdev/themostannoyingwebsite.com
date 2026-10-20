import { configureBaseContainer } from './container.base';
import { createLazyContainer } from './lazy-container';

export const getClientDependencyContainer = createLazyContainer(
  configureBaseContainer,
);
