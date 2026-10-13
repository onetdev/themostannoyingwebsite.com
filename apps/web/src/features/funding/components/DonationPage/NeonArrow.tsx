import styles from './NeonArrow.module.css';

export type NeonArrowTone = 'positive' | 'negative';

export type NeonArrowProps = {
  /** Glow colour, matched to the balance state (green in the black, red in debt). */
  tone?: NeonArrowTone;
  className?: string;
};

/**
 * Decorative neon arrow cluster pointing down from the balance hero at the
 * support grid: three straight arrows in the middle flanked by two bent "elbow"
 * arrows. The tube is white and the halo picks up the balance colour. Paths start
 * at the very top edge so the arrows appear to grow out of the balance bar above
 * them. Purely presentational, so it is hidden from assistive tech.
 */
export function NeonArrow({ tone = 'positive', className }: NeonArrowProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 440 110"
      fill="none"
      className={`${styles.arrow} ${styles[tone]} ${className ?? ''}`}
    >
      <g
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M150 0L150 52L30 52L30 100" />
        <path d="M20 88L30 100L40 88" />

        <path d="M290 0L290 52L410 52L410 100" />
        <path d="M400 88L410 100L420 88" />

        <path d="M190 0L190 100" />
        <path d="M180 88L190 100L200 88" />

        <path d="M220 0L220 100" />
        <path d="M210 88L220 100L230 88" />

        <path d="M250 0L250 100" />
        <path d="M240 88L250 100L260 88" />
      </g>
    </svg>
  );
}
