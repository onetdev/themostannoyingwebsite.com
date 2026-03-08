import type { CaptchaI18nShape } from '../types';

export default {
  captcha: {
    field: 'Captcha',
    proveYouAreRobot: 'Bizonyítsd be, hogy robot vagy!',
    emojiHint:
      'Számold meg az emojikat, és azonosítsd azt, amelyik a legtöbbször fordul elő. Nézd meg alaposan, mert néhány emoji részben takarásban lehet.',
    tilePuzzleHint:
      'Csúsztasd a csempéket a megfelelő helyre. Csak a közvetlenül egymás mellett lévőket mozgathatod.',
    gridSelectHint:
      'Válaszd ki az összes képet, amely megfelel a leírásnak. Ha új képek jelennek meg, azokat is ellenőrizd.',
    gridSelectPrompts: [
      'kerékpárok',
      'motorkerékpárok',
      'közlekedési lámpák',
      'kijelölt gyalogosátkelőhelyek',
      'tűzcsapok',
      'lépcsők',
      'traktorok',
      'buszok',
      'hegyek vagy dombok',
      'pálmafák',
      'kémények',
      'hidak',
    ],
    challengeTitle: 'Captcha kihívás',
    verificationProgress: 'Ellenőrzési folyamat',
    resetChallenge: 'Kihívás újraindítása',
    taxonomyChallengePrompt:
      'Válaszd ki az összes négyzetet, amin <spanTag>{target}</spanTag> látható',

    taxonomyChallengeSkipHint: 'Ha nincs ilyen, kattints a kihagyásra',
    tilePuzzleChallengeHint:
      'Mozgasd a darabokat az üres hely melletti csempékre kattintva',
    roboCop: 'roboCOP',
    protected: 'védett',
    emojiChallengePlaceholder: 'A legtöbbször előforduló emoji',
  },
} satisfies CaptchaI18nShape;
