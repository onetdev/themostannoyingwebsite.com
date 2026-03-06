import achievements from '@/features/achievements/i18n/hu';
import humanVerification from '@/features/captcha/i18n/hu';
import commentVariants from '@/features/comments/i18n/generator/hu';
import comments from '@/features/comments/i18n/hu';
import funding from '@/features/funding/i18n/hu';
import marketing from '@/features/marketing/i18n/hu';
import monitoring from '@/features/monitoring/i18n/hu';
import subscription from '@/features/subscription/i18n/hu';
import support from '@/features/support/i18n/hu';
import settings from '@/features/user/i18n/hu';
import metadata from './metadata/hu';

export default {
  // Feature or externals
  achievements,
  comments,
  commentVariants,
  funding,
  humanVerification,
  marketing,
  metadata,
  monitoring,
  settings,
  subscription,
  support,

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
  common: {
    accept: 'Elfogadom',
    back: 'Vissza',
    backHome: 'Vissza a főoldalra',
    cancel: 'Mégse',
    close: 'Bezárás',
    completed: 'Befejezve',
    confirm: 'Megerősítés',
    decline: 'Elutasítás',
    delete: 'Törlés',
    disable: 'Kikapcsolás',
    disableAll: 'Összes kikapcsolása',
    dismiss: 'Elvetés',
    done: 'Kész',
    edit: 'Szerkesztés',
    enable: 'Bekapcsolás',
    enableAll: 'Összes bekapcsolása',
    generate: 'Generálás',
    loading: 'Betöltés...',
    next: 'Tovább',
    no: 'Nem',
    notAvailable: 'n/a',
    notSet: 'Nincs beállítva',
    ok: 'OK',
    pending: 'Folyamatban',
    placeholderSearch: 'Keresés...',
    reply: 'Válasz',
    reset: 'Alaphelyzet',
    save: 'Mentés',
    search: 'Keresés',
    select: 'Kiválasztás',
    send: 'Küldés',
    share: 'Megosztás',
    skip: 'Kihagyás',
    submit: 'Beküldés',
    unknown: 'Ismeretlen',
    verify: 'Ellenőrzés',
    yes: 'Igen',
  },
  date: {
    months: {
      january: 'Január',
      february: 'Február',
      march: 'Március',
      april: 'Április',
      may: 'Május',
      june: 'Június',
      july: 'Július',
      august: 'Augusztus',
      september: 'Szeptember',
      october: 'Október',
      november: 'November',
      december: 'December',
    },
    weekdays: {
      monday: 'Hétfő',
      tuesday: 'Kedd',
      wednesday: 'Szerda',
      thursday: 'Csütörtök',
      friday: 'Péntek',
      saturday: 'Szombat',
      sunday: 'Vasárnap',
    },
    formats: {
      long: 'MMM D, YYYY',
      short: 'M/D/YYYY',
    },
  },
  form: {
    validation: {
      error: {
        unknownError: 'Ismeretlen hiba történt. Kérlek, próbáld újra később.',
        impossiblePath:
          'Lehetetlen idejutni, hiba történt. Nyugodtan próbáld meg újra.',
        required: 'Ezt a mezőt kötelező kitölteni.',
        minLength: 'A minimális hossz {count} karakter',
        maxLength: 'A maximális hossz {count} karakter',
        min: 'Az értéknek legalább {count}-nak kell lennie',
        max: 'Az érték nem lehet több {count}-nál',
        emailInvalid: 'Érvényes e-mail cím szükséges',
        captchaRequired: 'A Captcha kitöltése kötelező',
        captchaInvalid: 'Érvénytelen Captcha',
        patternMismatch: 'A bemenet nem felel meg a kért mintának',
        passwordMismatch: 'A jelszavak nem egyeznek',
        urlInvalid: 'Érvénytelen URL formátum',
        numberInvalid: 'Kérlek, adj meg egy érvényes számot',
        dateInvalid: 'Érvénytelen dátumformátum',
        tooShort: 'A bemenet túl rövid',
        tooLong: 'A bemenet túl hosszú',
        checkboxRequired: 'Ezt a négyzetet be kell jelölnöd',
        fileTooLarge: 'A fájlméret meghaladja a {size} korlátot',
        fileTypeInvalid: 'Érvénytelen fájltípus',
        customError: 'Érvénytelen bemenet',
        missingUppercase: 'Legalább egy nagybetűt tartalmaznia kell',
        missingLowercase: 'Legalább egy kisbetűt tartalmaznia kell',
        missingNumber: 'Legalább egy számot tartalmaznia kell',
        missingSpecialCharacter: 'Legalább egy szimbólumot tartalmaznia kell',
        sumOfNumbersGte: 'A számok összegének legalább {count}-nak kell lennie',
        sumOfNumbersMustBeEven: 'A számok összegének párosnak kell lennie',
        passwordAlreadyTaken:
          'Ezt a jelszót már egy másik felhasználó lefoglalta',
      },
      passwordStrength: {
        weak: 'Gyenge',
        okay: 'Elmegy',
        veryStrong: 'Erős',
      },
    },
  },
  user: {
    common: {
      lookingForSignup: 'Nincs még fiókod? Regisztrálj itt',
      forgotPassword: 'Elfelejtetted a jelszavad?',
      Login: 'Belépés',
      signup: 'Regisztráció',
    },
    field: {
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
    form: {
      login: {
        genericError: 'A belépés sikertelen',
        callToAction: 'Belépés',
      },
      signup: {
        genericError: 'A regisztráció sikertelen',
        callToAction: 'Fiók létrehozása',
      },
      passwordReminder: {
        genericError: 'A jelszó emlékeztető sikertelen',
        callToAction: 'Jelszó emlékeztető küldése',
      },
    },
    genderVariants: {
      alien: 'Idegen',
      chymera: 'Kiméra',
      cyborg: 'Kiborg',
      female: 'Nő',
      male: 'Férfi',
      other: 'Egyéb',
      robot: 'Robot',
    },
    profile: {
      notSupposedToBeHere: 'Hmm, nem kellene itt lenned 😡',
    },
  },
  share: {
    modal: {
      title: 'Oldal megosztása',
      description:
        'Terjeszd a nyomorúságot! Mindenképpen kényszerítsd rá ezt a fájdalmasan ellenszenves weboldalt a barátaidra is — miért szenvednél egyedül, ha magaddal rántod őket is?',
    },
  },
  notification: {
    modal: {
      title: 'Ó ne, hol van az értesítési engedély!?!',
      description:
        'Szeretnénk néha értesítéseket küldeni neked. A böngésződ beállításaiban adhatsz értesítési engedélyt ennek a weboldalnak. Megtennéd? 🙏🥺🙏',
    },
  },
  paywall: {
    overlay: {
      title:
        'Vagy fizetned kell {price}/órát 24 hónapos hűségidővel a következő bekezdés megtekintéséhez, vagy folyamatosan a másodlagos gombra kell kattintanod.',
      disclaimer:
        'lehet, hogy nem annyira biztonságos és legális, de ez nem számít, mert ezen a weboldalon valójában nem tudsz fizetni.',
      confirm: 'Fizetés! 100% legális és biztonságos',
      cancel: 'Add oda ingyen az ingyenes cuccot',
    },
  },
  article: {
    coverImage: 'Borítókép',
    published: 'Közzétéve: {date}',
    moreContentScroll: 'Van még itt tartalom a múltból, görgess!',
  },
  titleExperience: {
    marqueeVariants: {
      variant_001: '📣 Gyere vissza kérlek 🏃‍♀️🏃 Van nálunk cukorka!! 🚐',
    },
    arrayPagedVariants: {
      variant_001: '⭐️ HÉ TE 🫵',
      variant_002: '😜 IGEN TE 😱',
      variant_003: '📣 GYERE VISSZA 🏃',
    },
  },
  search: {
    placeholder: 'Keresés...',
    noResults: 'Nincs találat',
    resultMeta:
      'A(z) "{query}" kifejezésre történő keresés {time}ms-ig tartott és {count} találatot hozott',
    searching: 'Keresés',
    peopleAlsoSearched: 'Mások ezekre kerestek még:',
    topSearcheVariants: {
      variant_001: 'szomjasak-e a halak',
      variant_002: 'tészta dalszöveg',
      variant_003: 'elfogy-e az autóból a duda',
      variant_004: 'nem működik az internet',
      variant_005: 'hallgatózik-e a facebook a telefonon keresztül',
      variant_006: 'miért van pénz szagom',
      variant_007: 'lehet-e zselében úszni',
      variant_008:
        'hogyan mondjam meg udvariasan valakinek hogy hagyma szaga van',
      variant_009: 'nem látom a tükörképem a tükörben',
      variant_010: 'áram feltalálása',
      variant_011: 'megkenni a kenyerét',
      variant_012: 'mém és varangy',
      variant_013: 'mocsári tesó',
    },
  },
  wheelOfFortune: {
    title: 'Szerencsekerék',
    spinStart: 'Kattints vagy koppints ide!',
    spinWin: 'Nyertél! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Ingyen sör örökre',
      worldPeace: 'Világbéke',
      absolutellyNothing: 'A nagy büdös semmi',
      complimentaryOtter: 'Ingyen vidra',
      fake70Discount: 'Kamuzott 70%-os kedvezmény',
    },
    wheelTitle: 'Szerencsekerék',
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
  admin: {
    terminal: {
      systemBoot: 'Rendszer betöltése...',
      systemReady: 'MAW admin biztonságos kapcsolat létrejött.',
      loginPrompt: 'belépés:',
      passwordPrompt: 'jelszó:',
      invalidCredentials:
        'Hozzáférés megtagadva. Érvénytelen hitelesítő adatok.',
      accessGranted: 'Hozzáférés megadva. Üdvözöljük újra, {username}.',
      matrixQuote: 'Valaki figyel téged!!! Kövesd a fehér nyulat.',
      redirectingGeneric: 'Átirányítás...',
      redirectingSafety: 'Visszaviszlek a biztonságba...',
    },
  },
  hotThings: {
    playVideo: 'Videó lejátszása',
    videoPlaybackFailed: 'A videó lejátszása sikertelen',
    pictureOfYou: 'Kép rólad',
    hotThingsVtt: 'Magyar',
  },
  stickyVideoPlayer: {
    videoTitle: 'Tapadós videólejátszó',
  },
  painPreferences: {
    levelSettings: {
      label: 'Fájdalomküszöb',
      railTitle: 'Fájdalomküszöb csúszka sínje',
      clamps: {
        from_0: 'Ártatlan',
        from_10: 'Kicsit fura, nem?',
        from_20: 'Enyhén bosszantó',
        from_30: 'Egy kicsit elátkozott',
        from_40: 'Nagyon specifikus módon nyugtalanító',
        from_50: 'Pont a megfelelő mennyiség',
        from_60: 'Átlag feletti tolerancia',
        from_70: 'Mezítláb kutyagumiba lépni',
        from_80: 'Határeset mazochizmus',
        from_90: 'Rémálmok? Feliratkozva.',
        from_100: 'Maximális fájdalom',
      },
    },
  },
} satisfies AppTranslationShape;
