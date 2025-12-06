import { PropsWithChildren, ReactNode } from 'react';

import { Icon } from '@maw/ui-lib';

type GenericItemShape = {
  key: string;
  label: string;
};

export type AdaptiveNavigationProps<T extends GenericItemShape> =
  JSXProxyProps<'nav'> & {
    activeItem?: string;
    className?: string;
    items: T[];
    IteratorComponent: (props: PropsWithChildren<T>) => ReactNode;
    texts: {
      toggleMenu: string;
    };
  };

export function AdaptiveNavigation<T extends GenericItemShape>({
  activeItem,
  className,
  items,
  IteratorComponent,
  texts,
}: AdaptiveNavigationProps<T>) {
  return (
    <nav
      className={`group/nav relative ${className}`}
      id="navigation-main"
      role="navigation">
      <input type="checkbox" id="menu-toggle" className="peer hidden" />
      <label className="block cursor-pointer md:hidden" htmlFor="menu-toggle">
        <Icon icon="menu" size="lg" aria-label={texts.toggleMenu} />
      </label>
      <ul className="bg-surface font-primary absolute inset-x-0 z-20 hidden flex-col gap-x-5 py-2 text-lg drop-shadow-md peer-checked:flex md:relative md:right-0 md:flex md:flex-row md:flex-wrap md:bg-transparent md:py-0 md:drop-shadow-none">
        {items.map(({ key, label, ...rest }) => (
          <li
            key={key}
            data-active={activeItem === key ? 'true' : 'false'}
            className={`group/nav-item relative px-3 data-[active=true]:font-extrabold md:px-0`}>
            <span className="bg-primary absolute inset-x-0 -bottom-1 h-0.5 opacity-0 transition-all duration-300 group-data-[active=true]/nav-item:opacity-30" />
            <IteratorComponent
              {...(rest as T)}
              aria-current={activeItem === key ? 'page' : undefined}>
              {label}
            </IteratorComponent>
          </li>
        ))}
      </ul>
    </nav>
  );
}
