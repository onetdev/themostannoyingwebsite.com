import achievements from '@/features/achievements/i18n/hu';
import auth from '@/features/auth/i18n/hu';
import humanVerification from '@/features/captcha/i18n/hu';
import commentVariants from '@/features/comments/i18n/generator/hu';
import comments from '@/features/comments/i18n/hu';
import content from '@/features/content/i18n/hu';
import disruptions from '@/features/disruptions/i18n/hu';
import funding from '@/features/funding/i18n/hu';
import marketing from '@/features/marketing/i18n/hu';
import monitoring from '@/features/monitoring/i18n/hu';
import subscription from '@/features/subscription/i18n/hu';
import support from '@/features/support/i18n/hu';
import user from '@/features/user/i18n/hu';
import common from './common/hu';
import metadata from './metadata/hu';

export default {
  // Feature or externals
  achievements,
  auth,
  comments,
  commentVariants,
  common,
  content,
  disruptions,
  funding,
  humanVerification,
  marketing,
  metadata,
  monitoring,
  subscription,
  support,
  user,

  // App level, shared translations
  app: {
    title: 'The Most Annoying Website',
    description:
      'Önjelölt legbosszantóbb weboldal a világhálón, annyi gusztustalan funkcióval a modern weboldalakról, hogy a végén még hányni is támad kedved.',
    recruiting:
      'Szeretnéd kiterjeszteni amit itt látsz? Látogasd meg a <linkTag>GitHub</linkTag> repónkat a kezdéshez.',
    aiDisclose:
      'Ez a weboldal generatív MI-t használ kreatív tartalmakhoz és médiához. Bármilyen hasonlóság hasznos információval csak a véletlen műve.',
    copyright: '© {year} The Most Annoying Website. Minden jog fenntartva.',
    dataStorageDisclaimer:
      'Adatvédelem mindenekelőtt: Nem tárolunk el érzékeny űrlapadatokat vagy felhasználói hitelesítő adatokat.',
    noWarranties:
      'Úgy adjuk, "ahogy van", garancia nélkül. Nem vállalunk felelősséget az elvesztegetett idődért vagy a frusztrációdért.',
    privacyPolicyDisclaimer:
      'Ez a dokumentum a hivatalos angol nyelvű változat fordítása. Bármilyen eltérés esetén az angol változat az irányadó. A hivatalos változatot <linkTag>itt találod</linkTag>.',
    cookieConsent:
      'Ez a weboldal sütiket használ, hogy a lehető legjobb élményt nyújtsa. Emellett ez egy vicc is, sok funkció szándékosan hibás vagy nem is működik. A beállítások menüben személyre szabhatod az élményt és a süti beállításokat.',

    exitPrompt:
      'Átgondolnám a távozást, mielőtt valami rossz történne veled. Biztos vagy benne?',
    readMoreAt: 'Olvass tovább itt:',
    virgin: {
      title: 'Összes élmény kikapcsolása',
      description:
        'Most minden élmény ki van kapcsolva. Ha csak a tartalom miatt szeretnéd megosztani ezt az oldalt, csak küldd tovább ezt az URL-t. Ha meggondoltad magad, a beállítások menüben bármikor visszakapcsolhatod az összes élményt.',
    },
    toggleMenu: 'Menü váltása',
    logo: 'MAW Logó',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: 'Banner elrejtése',
    contactForm: {
      title: 'Hivatalos kapcsolatfelvételi űrlap',
      subject: 'Tárgy',
      message: 'Üzenet',
      send: 'Küldés',
      placeholderSubject: 'Miről van szó?',
      placeholderMessage: 'Írd ide az üzenetedet...',
      alternative:
        'Alternatív megoldásként közvetlenül is elérhetsz minket a <linkTag>{email}</linkTag> címen',
      intro:
        'Nyugodtan keress minket, ha bármilyen kérdésed vagy visszajelzésed van.',
      reportIssues:
        'Ha technikai problémába ütközöl, vagy új fájópontokat javasolnál, kérlek <linkTag>jelentsd őket GitHubon</linkTag>.',
    },
  },
  navigation: {
    home: 'Főoldal',
    about: 'Rólunk',
    contact: 'Kapcsolat',
    donate: 'Támogatás',
    login: 'Belépés',
    logout: 'Kijelentkezés',
    signup: 'Regisztráció',
    passwordReminder: 'Elfelejtett jelszó',
    profile: 'Profil',
    settings: 'Beállítások',
    search: 'Keresés',
    privacyPolicy: 'Adatvédelmi irányelvek',
    hotThings: 'Forró cuccok',
    dilf: 'DILF',
    plans: 'MI csomagok',
    personal: 'Személyes',
    achievements: 'Eredmények',
  },
  userField: {
    consentNewsletter: 'Szeretnék hírlevelet kapni',
    consentPrivacyPolicy: 'Elfogadom az adatvédelmi irányelveket',
    consentChildSoul: 'Az elsőszülött gyermekem lelke',
    countryCode: 'Ország',
    dateOfBirth: 'Születési dátum',
    dateOfBirthYear: 'Év',
    dateOfBirthMonth: 'Hónap',
    dateOfBirthDay: 'Nap',
    email: 'E-mail',
    firstName: 'Keresztnév',
    gender: 'Nem',
    lastName: 'Vezetéknév',
    nickname: 'Becenév',
    password: 'Jelszó',
    passwordStrength: 'Jelszó erőssége',
    passwordConfirmation: 'Jelszó megerősítése',
    phoneNumber: 'Telefonszám',
    phoneNumberCountryCode: 'Országhívó',
    phoneNumberAreaCode: 'Körzetszám',
    phoneNumberDecrease: 'Telefonszám csökkentése',
    phoneNumberIncrease: 'Telefonszám növelése',
    rememberMe: 'Emlékezz rám',
    username: 'Felhasználónév',
  },
  gender: {
    alien: 'Idegen',
    chymera: 'Kiméra',
    cyborg: 'Kiborg',
    female: 'Nő',
    male: 'Férfi',
    other: 'Egyéb',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Oldal megosztása',
      description:
        'Terjeszd a nyomorúságot! Mindenképpen kényszerítsd rá ezt a fájdalmasan ellenszenves weboldalt a barátaidra is — miért szenvednél egyedül, ha magaddal rántod őket is?',
    },
  },
  messages: {
    errors: {
      e404title: 'Hiba 404',
      e404description: 'Az oldal nem található, hogyan történhetett ez?',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Hé, itt nem lehet jobb klikkelni!',
  },
  language: {
    label: 'Nyelv',
    option: {
      en: 'Angol',
      hu: 'Magyar',
      zh: 'Mandarin kínai',
    },
  },
  themeSwitch: {
    label: 'Téma váltása',
    darkMode: 'Sötét mód',
    lightMode: 'Világos mód',
  },
} satisfies AppTranslationShape;
