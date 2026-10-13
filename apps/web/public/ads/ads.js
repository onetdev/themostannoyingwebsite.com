// This is just a bait for ad blockers. It is intentionally served from an
// ad-like path (/ads/ads.js) so network filter lists block it. The ad blocker
// detector (features/marketing/services/adblocker-detection.ts) treats a
// failed request to this file as a signal.
(() => {
  window.mawBannerProp = true;
})(window);
