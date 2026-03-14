import deploymentMeta from '@/root/public/deployment-meta.json' with {
  type: 'json',
};
import type { AppConfig, Environment } from '@/schemas';

const config: AppConfig = {
  defaultColorScheme: 'dark' as AppTheme,
  achievements: {
    assets: {
      achievementUnlockedSfx: '/assets/sfx/achievement.mp3',
    },
    progressiveAchievementToastThrottlingSeconds: 10,
  },
  captcha: {
    assets: {
      tileChallenge: ['/assets/images/captcha-tile-abstract.jpg'],
      taxonomyChallengeSprites: [
        {
          width: 300,
          height: 300,
          rows: 8,
          columns: 8,
          uri: '/assets/images/captcha-random-8x8-a.jpg',
        },
        {
          width: 300,
          height: 300,
          rows: 8,
          columns: 8,
          uri: '/assets/images/captcha-random-8x8-b.jpg',
        },
      ],
    },
    allowedChallenges: ['emoji', 'tile', 'grid'],
    challengeTriggerTimeoutMs: 2000,
    requiredCompletedChallenges: 20,
    tilePuzzleCols: 6,
    tilePuzzleRows: 5,
    emojiChallengeCount: 100,
  },
  content: {
    assets: {
      articleCoverPlaceholder: '/assets/cover-placeholder.svg',
      hotThings: {
        placeholder: '/assets/images/hot-things.webp',
        vtt: {
          ar: '/assets/vtt/hot-things-ar.vtt',
          de: '/assets/vtt/hot-things-de.vtt',
          en: '/assets/vtt/hot-things-en.vtt',
          es: '/assets/vtt/hot-things-es.vtt',
          fr: '/assets/vtt/hot-things-fr.vtt',
          hi: '/assets/vtt/hot-things-hi.vtt',
          hu: '/assets/vtt/hot-things-hu.vtt',
          it: '/assets/vtt/hot-things-it.vtt',
          ja: '/assets/vtt/hot-things-ja.vtt',
          ko: '/assets/vtt/hot-things-ko.vtt',
          pl: '/assets/vtt/hot-things-pl.vtt',
          pt: '/assets/vtt/hot-things-pt.vtt',
          ru: '/assets/vtt/hot-things-ru.vtt',
          tr: '/assets/vtt/hot-things-tr.vtt',
          zh: '/assets/vtt/hot-things-zh.vtt',
        },
      },
    },
    api: {
      searchEndpoint: '/api/articles/search/',
    },
  },
  funding: {
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
  disruptions: {
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
    stickyVideoPlayer: {
      videoUrl:
        'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=2&loop=1&mute=1',
    },
    deadPixel: {
      rainbowChance: 1 / 20,
    },
  },
  marketing: {
    assets: {
      dilfFlapsAd: '/ads/ad-dilf-flaps.webp',
      wanAPhoneAd: {
        en: '/ads/wan-a-fone/ad-wan-a-fone-en.webp',
        hu: '/ads/wan-a-fone/ad-wan-a-fone-hu.webp',
        zh: '/ads/wan-a-fone/ad-wan-a-fone-zh.webp',
        ar: '/ads/wan-a-fone/ad-wan-a-fone-ar.webp',
        de: '/ads/wan-a-fone/ad-wan-a-fone-de.webp',
        es: '/ads/wan-a-fone/ad-wan-a-fone-es.webp',
        fr: '/ads/wan-a-fone/ad-wan-a-fone-fr.webp',
        hi: '/ads/wan-a-fone/ad-wan-a-fone-hi.webp',
        it: '/ads/wan-a-fone/ad-wan-a-fone-it.webp',
        ja: '/ads/wan-a-fone/ad-wan-a-fone-ja.webp',
        ko: '/ads/wan-a-fone/ad-wan-a-fone-ko.webp',
        pl: '/ads/wan-a-fone/ad-wan-a-fone-pl.webp',
        pt: '/ads/wan-a-fone/ad-wan-a-fone-pt.webp',
        ru: '/ads/wan-a-fone/ad-wan-a-fone-ru.webp',
        tr: '/ads/wan-a-fone/ad-wan-a-fone-tr.webp',
      },
      dilfFullImage: '/assets/images/dilf-full.webp',
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
