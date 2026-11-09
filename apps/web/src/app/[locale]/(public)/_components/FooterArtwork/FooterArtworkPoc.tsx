'use client';

import { useEffect, useState } from 'react';
import { FooterArtwork } from './FooterArtwork';

const POC_QUERY_KEY = 'footerArtworkPoc';
const POC_STORAGE_KEY = 'footer-artwork-poc';
const DEFAULT_STRENGTH = 1;

const readPocRequest = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const search = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

  return (
    search.get(POC_QUERY_KEY) === 'both' || hash.get(POC_QUERY_KEY) === 'both'
  );
};

/**
 * Dev-only comparison of the two edge-light models.
 *
 * Enable with `?footerArtworkPoc=both` or `#footerArtworkPoc=both`. The flag is
 * kept in session storage because the app canonicalises the URL shortly after
 * hydration. Both walls share one loop epoch, so they animate in sync on the
 * same cells and phase. The strength slider updates both live uniforms.
 *
 * Remove this component once the preferred variant and strength are chosen.
 */
export function FooterArtworkPoc() {
  const [enabled, setEnabled] = useState(false);
  const [strength, setStrength] = useState(DEFAULT_STRENGTH);
  const [loopEpoch] = useState(() => Date.now());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    if (readPocRequest()) {
      window.sessionStorage.setItem(POC_STORAGE_KEY, 'both');
      setEnabled(true);
      return;
    }

    setEnabled(window.sessionStorage.getItem(POC_STORAGE_KEY) === 'both');
  }, []);

  if (!enabled) {
    return null;
  }

  const close = () => {
    window.sessionStorage.removeItem(POC_STORAGE_KEY);
    setEnabled(false);
  };

  return (
    <section
      className="mt-12 flex flex-col gap-10"
      aria-label="Footer artwork edge-light comparison"
      data-testid="footer-artwork-poc"
    >
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-4 bg-background/95 px-4 py-2 backdrop-blur">
        <p className="text-xs text-muted-foreground">
          Dev edge-light comparison — synchronised animation, same cells and
          phase.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <label className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Bleed strength</span>
            <input
              type="range"
              min={0}
              max={2}
              step={0.05}
              value={strength}
              onChange={(event) => setStrength(Number(event.target.value))}
              className="w-40 accent-foreground"
              aria-label="Edge bleed strength"
            />
            <span className="w-12 text-right tabular-nums text-foreground">
              {strength.toFixed(2)}×
            </span>
          </label>
          <button
            type="button"
            onClick={close}
            className="text-xs font-medium text-foreground underline underline-offset-2"
          >
            Close comparison
          </button>
        </div>
      </div>

      <div>
        <h2 className="mb-1 px-4 text-sm font-semibold text-foreground">
          A — analytic edge band + corner glint
        </h2>
        <p className="mb-3 px-4 text-xs text-muted-foreground">
          Exponential core plus a linear tail, with a small bright corner oval.
        </p>
        <FooterArtwork
          bleedMode="analytic"
          bleedStrength={strength}
          instanceId="footer-artwork-analytic"
          loopEpoch={loopEpoch}
        />
      </div>

      <div>
        <h2 className="mb-1 px-4 text-sm font-semibold text-foreground">
          B — measured 1D LUT + corner oval
        </h2>
        <p className="mb-3 px-4 text-xs text-muted-foreground">
          The sampled reference falloff, with the same corner oval and white
          blend.
        </p>
        <FooterArtwork
          bleedMode="lut"
          bleedStrength={strength}
          instanceId="footer-artwork-lut"
          loopEpoch={loopEpoch}
        />
      </div>
    </section>
  );
}
