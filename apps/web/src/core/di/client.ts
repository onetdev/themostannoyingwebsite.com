import { Container } from 'inversify';
import { configureCommonContainer } from '@/app/bootstrap/di.common';

let container: Container;

export function getClientDependencyContainer() {
  if (!container) {
    container = new Container();
    configureCommonContainer(container);
  }

  return container;
}
