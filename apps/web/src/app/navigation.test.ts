import {
  isNavGroup,
  type NavItem,
  SITE_NAVIGATION_FLAT_LINKS,
  SITE_NAVIGATION_LINKS,
} from './navigation';

const leaf: NavItem = {
  id: 'home',
  labelKey: 'common.navigation.home',
  hrefFor: 'home',
};

describe('navigation', () => {
  it('distinguishes groups from leaf links', () => {
    expect(isNavGroup(leaf)).toBe(false);
    expect(SITE_NAVIGATION_LINKS.some(isNavGroup)).toBe(true);
  });

  it('flattens groups into their child links', () => {
    const ids = SITE_NAVIGATION_FLAT_LINKS.map((item) => item.id);

    expect(ids).toContain('home');
    expect(ids).toContain('dilf');
    expect(ids).toContain('donate');
    expect(ids).toContain('about');
    // Group containers themselves must not leak in.
    expect(ids).not.toContain('explore');
    expect(ids).not.toContain('project');
  });

  it('keeps retired pages out of the main navigation', () => {
    const ids = SITE_NAVIGATION_FLAT_LINKS.map((item) => item.id);

    expect(ids).not.toContain('virgin');
  });

  it('orders the Explore group after AI plans', () => {
    const ids = SITE_NAVIGATION_LINKS.map((entry) => entry.id);

    expect(ids.indexOf('explore')).toBeGreaterThan(ids.indexOf('plans'));
  });
});
