import deploymentMeta from '@/root/public/deployment-meta.json';

const config = {
  defaultColorScheme: 'dark' as AppTheme,
  donation: {
    buyMeACoffeeUrl: 'https://buymeacoffee.com/onetdev',
    paypalUrl: 'https://paypal.me/onetdev',
    ethWallet: {
      address: '0x8E804CFeeCc031bB97FeC97208510003Cc247454',
    },
    btcWallet: {
      network: 'segwit',
      address: 'bc1qe0mr42jg6lwhhcxkdkj7fpjdwn6g0fh4pmva3t',
    },
    alternativeOptionsUrl: 'http://onet.dev/donate',

    // Early rough estimate for the project start — we'll use this to calculate
    // costs since the inception of development.
    costStartEpoch: 1630469166,

    // Calculation: I estimate that I worked on this project for ~16 hours each
    // month, even though the sessions happened in occasional longer bursts
    // rather than being evenly spread out. My Vercel plan is still on "Hobby".
    // Using an hourly rate of 45 EUR/hour, the math is: 16 × 45 / 30 = 24.
    costDailyAvgInEuro: 24,

    // Once I get ANY donation, I'll figure out a way to track this dynamically.
    // Not a priority at the moment 😅
    totalDonationInEuro: 0,
  },
  subscription: {
    urgency: {
      discountPercentage: 0.2,
      timeoutSeconds: 600,
    },
    socialProof: {
      minDelayMs: 5000,
      maxDelayMs: 15000,
    },
  },
  screensaver: {
    defaultTimeoutSeconds: 15,
  },
  deploymentMeta: { ...deploymentMeta },
};

export default config;
