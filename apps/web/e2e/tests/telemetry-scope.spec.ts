import { expect, type Page, test } from '@playwright/test';
import type { PainPreferencesState } from '@/stores/pain-preferences';
import { allDisabledPainPreferencesState } from '../fixtures/pain-preferences';
import { acceptedUserGrantsState } from '../fixtures/user-grants';
import { setupE2eTestState } from '../utils/setup';
import { setPainPreferences, setUserGrants } from '../utils/zustand';

const withFlags = (
  ...names: Array<keyof PainPreferencesState['flags']>
): PainPreferencesState => {
  const flags = { ...allDisabledPainPreferencesState.flags };
  for (const name of names) {
    flags[name] = true;
  }
  return { ...allDisabledPainPreferencesState, flags };
};

/**
 * Public routes that render interactive elements. Auth and funnel pages are
 * included because they are noindex, not unclickable.
 */
const ROUTES = [
  '/en',
  '/en/about',
  '/en/achievements',
  '/en/contact',
  '/en/dilf',
  '/en/donate',
  '/en/flaim-a-phone',
  '/en/hot-things',
  '/en/only-spams',
  '/en/plans',
  '/en/plans/cancellation',
  '/en/plans/special-deal',
  '/en/privacy-policy',
  '/en/search',
  '/en/settings',
  '/en/terms-of-use',
  '/en/user/login',
  '/en/user/password-reminder',
  '/en/user/profile',
  '/en/user/signup',
  '/en/virgin',
];

interface UnscopedAction {
  tag: string;
  track: string | null;
  text: string;
}

const readUnscopedActions = (page: Page): Promise<UnscopedAction[]> =>
  page.evaluate(() => {
    const tracker = (
      window as Window & {
        maw?: { tracker?: { auditScopes: () => Element[] } };
      }
    ).maw?.tracker;

    if (!tracker) {
      return [];
    }

    return tracker.auditScopes().map((element) => ({
      tag: element.tagName.toLowerCase(),
      track: element.getAttribute('data-track'),
      text: (element.textContent ?? '').trim().slice(0, 60),
    }));
  });

const expectScoped = async (page: Page) => {
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(
          (
            window as Window & {
              maw?: { tracker?: { auditScopes?: () => Element[] } };
            }
          ).maw?.tracker?.auditScopes,
        ),
      ),
    )
    .toBe(true);

  const unscoped = await readUnscopedActions(page);
  expect(
    unscoped,
    `Unscoped interactions on ${page.url()}: ${JSON.stringify(unscoped, null, 2)}`,
  ).toEqual([]);
};

test.describe('telemetry scopes', () => {
  test.beforeEach(async ({ page }) => {
    await setupE2eTestState(page);
  });

  for (const route of ROUTES) {
    test(`every interaction on ${route} resolves a section`, async ({
      page,
    }) => {
      await page.goto(route);
      await expectScoped(page);
    });
  }

  test('mobile menu links resolve a section', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');

    await page.locator('[data-track="navigation:menu-toggle"]').click();
    await expect(page.locator('[data-slot="sheet-content"]')).toBeVisible();
    await expectScoped(page);
  });

  test('language switcher popup resolves a section', async ({ page }) => {
    await page.goto('/en');

    const switcher = page.locator('[data-track="navigation:language"]').last();
    await switcher.click();
    await expect(page.locator('[data-slot="select-content"]')).toBeVisible();
    await expectScoped(page);
  });

  test('share modal resolves a section', async ({ page }) => {
    await page.goto('/en');

    await page.locator('[data-slot="navigation-menu-trigger"]').last().click();
    await page
      .locator('[data-slot="navigation-menu-content"]')
      .getByRole('link', { name: 'Share' })
      .click();

    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
    await expectScoped(page);

    const hasShareEvent = () =>
      page.evaluate(() => {
        const history = (
          window as unknown as {
            maw?: {
              tracker?: {
                history: () => Array<{
                  name: string;
                  props?: Record<string, unknown>;
                }>;
              };
            };
          }
        ).maw?.tracker?.history();

        return Boolean(
          history?.some(
            (event) =>
              event.name === 'ui.share' &&
              event.props?.channel === 'modal' &&
              event.props?.surface === 'navigation:main',
          ),
        );
      });

    await expect.poll(hasShareEvent).toBe(true);
  });

  test('newsletter modal resolves a section', async ({ page }) => {
    await page.goto('/en');

    await page.evaluate(() => {
      const bus = (
        window as Window & {
          maw?: { _emit?: (event: string, payload?: unknown) => void };
        }
      ).maw;
      bus?._emit?.('ui:newsletter-modal:show');
    });

    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
    await expectScoped(page);
  });

  test('cookie consent resolves a section', async ({ page }) => {
    await setUserGrants(page, {
      ...acceptedUserGrantsState,
      reviewCompleted: false,
    });
    await page.goto('/en');

    await expect(
      page.locator('[data-track-section="common:cookie-consent"]'),
    ).toBeVisible();
    await expectScoped(page);
  });

  test('prize wheel modal resolves a section', async ({ page }) => {
    await setPainPreferences(page, withFlags('wheelOfFortune'));
    await page.goto('/en');

    await page.locator('[data-track="wheel:trigger"]').click();
    await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible();
    await expectScoped(page);
  });

  test('chat bubble panel resolves a section', async ({ page }) => {
    await setPainPreferences(page, withFlags('mockChat'));
    await page.goto('/en');

    await page.locator('[data-testid="chat-bubble-trigger"]').click();
    await expect(
      page.locator('[data-testid="chat-bubble-panel"]'),
    ).toBeVisible();
    await expectScoped(page);
  });
});

test.describe('telemetry events', () => {
  test.beforeEach(async ({ page }) => {
    await setupE2eTestState(page);
  });

  test('records a semantic link click in the tracker history', async ({
    page,
  }) => {
    await page.goto('/en');

    await expect(page.locator('main[data-route-alias="home"]')).toBeVisible();

    await page.locator('[data-track="navigation:logo"]').first().click();

    const hasLogoClick = () =>
      page.evaluate(() => {
        const history = (
          window as unknown as {
            maw?: {
              tracker?: {
                history: () => Array<{
                  name: string;
                  routeAlias?: string;
                  props?: Record<string, unknown>;
                }>;
              };
            };
          }
        ).maw?.tracker?.history();

        return Boolean(
          history?.some(
            (event) =>
              event.name === 'nav.link-click' &&
              event.props?.trackKey === 'navigation:logo' &&
              event.routeAlias === 'home',
          ),
        );
      });

    await expect.poll(hasLogoClick).toBe(true);
  });

  test('records a Base UI select pick without exposing the value', async ({
    page,
  }) => {
    await page.goto('/en/user/signup');

    await page.getByRole('combobox', { name: 'Gender' }).click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();

    const hasGenderPick = () =>
      page.evaluate(() => {
        const history = (
          window as unknown as {
            maw?: {
              tracker?: {
                history: () => Array<{
                  name: string;
                  props?: Record<string, unknown>;
                }>;
              };
            };
          }
        ).maw?.tracker?.history();

        return Boolean(
          history?.some(
            (event) =>
              event.name === 'ui.select' &&
              event.props?.control === 'auth:gender' &&
              event.props?.section === 'auth:signup' &&
              event.props?.optionValue === undefined &&
              event.props?.optionIndex === undefined,
          ),
        );
      });

    await expect.poll(hasGenderPick).toBe(true);
  });
});
