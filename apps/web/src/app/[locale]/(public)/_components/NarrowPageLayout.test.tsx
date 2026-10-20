import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NarrowPageLayout } from './NarrowPageLayout';

jest.mock('./PageLayout', () => ({
  PageLayout: ({
    children,
    className,
    autoPadding,
    route,
    navigationHighlightRoute,
    role,
  }: {
    children: ReactNode;
    className?: string;
    autoPadding?: boolean;
    route?: string;
    navigationHighlightRoute?: string;
    role?: string;
  }) => (
    <main
      className={className}
      data-auto-padding={String(autoPadding)}
      data-route={String(route)}
      data-navigation-highlight-route={String(navigationHighlightRoute)}
      role={role}
    >
      {children}
    </main>
  ),
}));

describe('NarrowPageLayout', () => {
  it('centers a default-width column inside the page layout', () => {
    const html = renderToStaticMarkup(
      <NarrowPageLayout route="user.login" role="main">
        <p>Body copy</p>
      </NarrowPageLayout>,
    );

    expect(html).toContain('Body copy');
    expect(html).toContain('data-narrow-content');
    expect(html).toContain('mx-auto');
    expect(html).toContain('my-auto');
    expect(html).toContain('w-full');
    expect(html).toContain('max-w-lg');
    expect(html).toContain('flex flex-col');
  });

  it('applies a custom max width and extra content classes', () => {
    const html = renderToStaticMarkup(
      <NarrowPageLayout
        maxWidthClassName="max-w-md"
        contentClassName="gap-2"
        role="main"
      >
        <p>Body copy</p>
      </NarrowPageLayout>,
    );

    expect(html).toContain('max-w-md');
    expect(html).not.toContain('max-w-lg');
    expect(html).toContain('gap-2');
  });

  it('forces autoPadding off and forwards route, role and navigation highlight', () => {
    const html = renderToStaticMarkup(
      <NarrowPageLayout
        route="user.profile"
        navigationHighlightRoute="user.login"
        role="main"
      >
        <p>Body copy</p>
      </NarrowPageLayout>,
    );

    expect(html).toContain('data-auto-padding="false"');
    expect(html).toContain('data-route="user.profile"');
    expect(html).toContain('data-navigation-highlight-route="user.login"');
    expect(html).toContain('role="main"');
  });
});
