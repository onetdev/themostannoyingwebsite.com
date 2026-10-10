import { fetchWithTimeout } from '@maw/utils/network';

/**
 * Self hosted bait file. Ad blockers commonly block resources served from
 * ad-like paths (`/ads/ads.js`), so a failed request is treated as a signal
 * that a network level filter is active. Kept on our own origin so the probe
 * never leaks a request to a third party ad domain.
 */
const NETWORK_BAIT_URL = '/ads/ads.js';

/**
 * Zero footprint canary style. It must not affect layout or paint, only exist
 * long enough to be measured.
 */
const CANARY_STYLE =
  'position:fixed;left:-9999px;top:0;width:1px;height:1px;pointer-events:none;';

interface CanarySpec {
  attributes?: string[];
  classes: string[];
  id?: string;
}

/**
 * Selectors that generic, domain independent element hiding rules target.
 *
 * The ad selectors are present in EasyList's default general-hide list, which
 * uBlock Origin / AdGuard / Brave ship enabled by default, so a subscribed
 * blocker hides the canary on any site. The cookie notice selectors come from
 * the EasyList Cookie (Fanboy / AdGuard annoyances) lists and cover blockers
 * that subscribe to a dedicated consent list. Mixing them raises the hit rate
 * across blocker configurations.
 */
const CANARIES: CanarySpec[] = [
  {
    id: 'ad-slot',
    attributes: [
      'data-ad-cls',
      'data-ad-manager-id',
      'data-ad-width',
      'data-ad-name',
      'data-ad-module',
      'data-dynamic-ads',
      'data-desktop-ad-id',
    ],
    classes: [
      'ad-slot',
      'ad-wrapper',
      'ad-unit',
      'google-ad',
      'ad-leaderboard',
      'sponsored-ad',
      'ad-block',
      'ad-holder',
      'ad-region',
      'ad__container',
      'ad__placeholder',
      'ad__space',
      '_ads',
      'a-ad',
    ],
  },
  {
    id: 'cmplz-cookiebanner-container',
    classes: [
      'cc-window-banner',
      'qc-cmp-ui-container',
      'didomi-notice-banner',
      'klaroPlaceholder',
    ],
  },
];

/**
 * Probes the self hosted bait to detect network level ad blocking.
 *
 * A rejected request (blocked, aborted, offline) or a non-OK response is
 * reported as suspected. This makes the previous detector's silent failure
 * explicit instead of reporting "not blocked" when the request never landed.
 */
export const detectNetworkBlocking = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(NETWORK_BAIT_URL, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
    });

    return !response.ok;
  } catch {
    return true;
  }
};

/**
 * Renders offscreen canaries carrying well known, globally blocked selectors
 * and checks whether a cosmetic filter hid any of them.
 *
 * Detection is deliberately layout independent (`getClientRects` is unreliable
 * in the test environment) because element hiding lists apply
 * `display: none !important` / `visibility: hidden` / `opacity: 0`.
 */
export const detectCosmeticBlocking = (doc?: Document): boolean => {
  const target =
    doc ?? (typeof document === 'undefined' ? undefined : document);
  const view = target?.defaultView;

  if (!target?.body || !view) {
    return false;
  }

  const canaries = CANARIES.map((spec) => {
    const canary = target.createElement('div');
    if (spec.id) {
      canary.id = spec.id;
    }
    canary.className = spec.classes.join(' ');
    for (const attribute of spec.attributes ?? []) {
      canary.setAttribute(attribute, '');
    }
    canary.setAttribute('aria-hidden', 'true');
    canary.style.cssText = CANARY_STYLE;
    target.body.appendChild(canary);
    return canary;
  });

  const hidden = canaries.some((canary) => {
    const style = view.getComputedStyle(canary);
    return (
      !canary.isConnected ||
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      style.opacity === '0'
    );
  });

  for (const canary of canaries) {
    canary.remove();
  }

  return hidden;
};

/**
 * Complementary ad blocker detection: either a blocked network request or a
 * hidden cosmetic canary is enough to raise suspicion.
 */
export const detectAdblocker = async (): Promise<boolean> => {
  if (detectCosmeticBlocking()) {
    return true;
  }

  return detectNetworkBlocking();
};
