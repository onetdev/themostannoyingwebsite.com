import { Container } from 'inversify';

/**
 * Creates a lazily-initialized, module-level container singleton.
 *
 * Next.js loads the server and browser bundles separately, so each entry point
 * gets its own instance while sharing this boilerplate.
 */
export function createLazyContainer(
  configure: (container: Container) => void,
): () => Container {
  let container: Container | undefined;

  return () => {
    if (!container) {
      container = new Container();
      configure(container);
    }

    return container;
  };
}
