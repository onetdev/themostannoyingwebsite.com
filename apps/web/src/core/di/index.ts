import { Container } from 'inversify';
import { configureContainer } from '@/app/bootstrap/di';

let container: Container;

export function getDependencyContainer() {
  if (!container) {
    container = new Container();
    configureContainer(container);
  }

  return container;
}
