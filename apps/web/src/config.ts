import deploymentMeta from '@/root/public/deployment-meta.json';
import type { Environment } from './schemas';
import type { AppConfig } from './schemas/app-config';

const config: AppConfig = {
  defaultColorScheme: 'dark' as AppTheme,
  achievements: {
    assets: {
      achievementUnlockedSfx: '/assets/sfx/achievement.mp3',
    },
  },
  auth: {
    assets: {
      captchaTile: '/assets/images/captcha-tile-abstract.jpg',
    },
  },
  content: {
    assets: {
      lavaImage: '/assets/images/lava.webp',
      coverPlaceholder: '/assets/cover-placeholder.svg',
      hotThingsVtt: {
        en: '/assets/vtt/hot-things-en.vtt',
      },
    },
  },
  donation: {
    assets: {
      moneyJarAnimation: '/assets/animations/money-jar.lottie',
    },
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
  obstructor: {
    assets: {
      mazeCeiling: '/assets/maze-screensaver/maze-ceiling.webp',
      mazeFloor: '/assets/maze-screensaver/maze-floor.webp',
      mazeWall: '/assets/maze-screensaver/maze-wall.webp',
      mazeOverlayEasteregg: '/assets/maze-screensaver/maze-overlay-42.webp',
    },
    screensaver: {
      defaultTimeoutSeconds: 30,
      defaultVariant: 'bouncingLogo',
    },
  },
  promotion: {
    assets: {
      dilfFlapsAd: '/ads/ad-dilf-flaps.webp',
      wanAPhoneAd: '/ads/ad-wan-a-phone.webp',
      dilfFullImage: '/assets/dilf-full.webp',
    },
  },
  support: {
    assets: {
      newMessageSfx: '/assets/sfx/new_message.mp3',
    },
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
  common: {
    assets: {
      adStandard: '/ads/ad-458x80.jpg',
      adScript: '/ads/ads.js',
      appIcon: '/assets/appicon.png',
      bannerDefault: '/assets/banner-default.png',
      bannerGithub: '/assets/banner-github.png',
      socialImage: '/assets/social.png',
    },
  },
  deploymentMeta: {
    ...deploymentMeta,
    environment: deploymentMeta.environment as Environment,
  },
};

export default config;
