import achievements from '@/features/achievements/i18n/hu';
import commentVariants from '@/features/comments/i18n/generator/hu';
import comments from '@/features/comments/i18n/hu';
import donate from '@/features/donation/i18n/hu';
import newsletter from '@/features/newsletter/i18n/hu';
import promotions from '@/features/promotion/i18n/hu';
import plansPage from '@/features/subscription/i18n/hu';

export default {
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
    donate,
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
  beggingBanner: {
    prefix: '🚨 Támogatásra van szükségünk:',
    linkText: 'Segíts a túlélésben →',
    messages: {
      catJudging:
        'A képzeletbeli macskám elítélően néz rám. Tudja, hogy már nem engedhetem meg magamnak a prémium jutalomfalatokat. Segíts visszaállítani a méltóságomat (és az ő véleményét rólam).',
      rentDue:
        'Itt a lakbér ideje. A főbérlőm szerint "kreatív" vagyok a fizetési ütemezéssel. Múlt hónapban improvizatív tánccal fizettem. Most valódi pénzre van szükségem.',
      codeTherapy:
        'A kódomnak terápiára van szüksége. Szigetelőszalag, imák és 2012-es Stack Overflow válaszok tartják össze. Segíts kifizetni az MI ágenseket.',
      futureSelf:
        'A múltbeli énem olyan kötelezettségeket vállalt, amiket a jelenlegi énem nem tud kifizetni. A jövőbeli énem nagyon csalódott lesz. Segíts meggyőzőbben hazudni magamnak.',
      pretendSuccessful:
        'Csak egyetlen napig szeretnék venni valamit anélkül, hogy először leellenőrizném a bankszámlámat. A támogatásod valóra váltja az álmokat. Szomorú, materialista álmokat.',
      validationNeeded:
        'A terapeutám szerint túl sokat keresem a külső elismerést. De mit tud ő? Nem ő az, aki a nulla adományt bámulja. Bizonyítsd be, hogy téved.',
      ramenUpgrade:
        'Szeretném fejleszteni a ramenemet. A "5 euróért 3 darab" típusról a "luxus instantra, amiben zöldségcsomag is van". Ez egy szerény álom. Tésztaalapú álom.',
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
  metadata: {
    app: {
      title: 'The Most Annoying Website',
      description:
        'Önjelölt legbosszantóbb weboldal a világhálón, annyi gusztustalan funkcióval a modern weboldalakról, hogy a végén még hányni is támad kedved.',
    },
    achievements: {
      title: 'Eredmények',
      description:
        'Kövesd a fejlődésedet és mutasd meg a kitartásodat. Nézd meg az összes mérföldkövet, amit elértél ezen a bosszantó utazáson.',
    },
    about: {
      title: 'Rólunk',
      description:
        'Fedezd fel a weboldal történetét, eredetét és a lelkes készítőket, közreműködőket, akik életre hívták.',
    },
    contact: {
      title: 'Kapcsolat',
      description:
        'Kérdésed, javaslatod van, vagy csak köszönni szeretnél? Keress minket itt, és örömmel kapcsolódunk.',
    },
    dilf: {
      title: "DILF - Donut I'd Like to Feast On",
      description:
        'Egy ellenállhatatlanul édes koncepció, ami egyesíti az élvezetet a szórakozással. Tudj meg többet itt.',
    },
    donate: {
      title: 'Támogatás',
      description:
        'A támogatásod rengeteget számít! Járulj hozzá itt, hogy továbbra is csodálatos élményeket hozhassunk létre.',
    },
    wanPhone: {
      title: 'Flaim-a-Phone',
      description:
        'Készen állsz egy kis tüzes szórakozásra? Lobbants lángra egy telefont itt, és nézd meg, hogyan hevítjük fel a mobilélményedet.',
    },
    hotThings: {
      title: 'Forró cuccok',
      description:
        'Fedezd fel a legforróbb trendeket, ötleteket és alkotásokat, amikért rajongunk. Fedezd fel az összes izgalmas tartalmat itt.',
    },
    privacyPolicy: {
      title: 'Adatvédelmi irányelvek',
      description:
        'Nagyra értékeljük a magánéletedet. Olvasd el az Adatvédelmi irányelveinket itt, hogy megtudd, hogyan védjük személyes adataidat.',
    },
    search: {
      title: 'Keresés',
      description:
        'Valami konkrétat keresel? Keress itt, hogy gyorsan megtaláld pontosan azt, amit keresel, bárhol is legyen az oldalunkon.',
    },
    settings: {
      title: 'Beállítások',
      description:
        'Szabd személyre az élményt a saját igényeid szerint. Fedezd fel a beállításokat itt, és állíts be mindent pontosan úgy, ahogy szereted.',
    },
    userLogin: {
      title: 'Belépés',
      description:
        'Üdvözöljük újra! Jelentkezzen be itt, hogy hozzáférjen személyre szabott tartalmaihoz és az összes exkluzív funkcióhoz.',
    },
    userPasswordReminder: {
      title: 'Jelszó emlékeztető',
      description:
        'Elfelejtette a jelszavát? Ne aggódjon! Használja a Jelszó emlékeztető funkciót itt, hogy gyorsan visszazökkenjen.',
    },
    userSignup: {
      title: 'Regisztráció',
      description:
        'Csatlakozzon közösségünkhöz még ma! Regisztráljon itt, hogy feltáruljon az exkluzív tartalmak és személyre szabott élmények világa.',
    },
    userProfile: {
      title: 'Profil',
      description:
        'Itt kezelheti fiókját és beállításait. Frissítse profiladatait és beállításait, hogy valóban a sajátja legyen.',
    },
    virgin: {
      title: 'Összes élmény kikapcsolása',
      description:
        'Sallangmentes élményre vágyik? Kapcsolja ki az összes személyre szabott funkciót itt, és élvezze oldalunk letisztult, zavaró tényezőktől mentes verzióját.',
    },
    plans: {
      title: 'MI csomagok és tervek',
      description:
        'Válasszon prémium, 100%-ban hamis MI csomagjaink közül. Tapasztalja meg a bosszúság jövőjét még ma!',
    },
    admin: {
      title: 'Admin terminál',
      description:
        'Biztonságos terminál hozzáférés a rendszeradminisztrációs felülethez.',
    },
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
  verification: {
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
  commentVariants,
  comments,
  settings: {
    userPreferences: {
      title: 'Beállítások',
      language: 'Nyelv',
      languages: {
        en: 'Angol',
        hu: 'Magyar',
      },
      colorScheme: 'Téma / Színséma',
      darkMode: 'Sötét mód',
      reducedMotion: 'Csökkentett mozgás',
      reducedMotionHelp:
        'Az operációs rendszered vagy a böngésződ beállításaiban módosítható, a változtatás után szükség lehet az oldal újratöltésére.',
      enableSound: 'Hangok bekapcsolása',
      adultFilter: 'Felnőtt tartalom szűrése',
      themeSwitch: {
        label: 'Téma váltása',
        darkMode: 'Sötét mód',
        lightMode: 'Világos mód',
      },
    },
    userGrants: {
      title: 'Beleegyezések és engedélyek',
      permissionDisclaimer:
        'Az engedélyeket a böngésző kezeli. Ha módosítani szeretnéd őket, a böngésződ webhelybeállításaiban megteheted.',
      essentialCookies: 'Alapvető sütik engedélyezése',
      notificationPermission: 'Értesítések engedélyezése',
      locationPermission: 'Helyhozzáférés engedélyezése',
    },
    optionalPainPoints: {
      title: 'Választható fájópontok',
      categories: {
        browser: 'Böngésző és lapfül',
        visual: 'Vizuális akadályok',
        ads: 'Hirdetések és monetizáció',
        interactivity: 'Felugró ablakok és interakció',
      },
      screensaverTimeout: 'Időtúllépés',
      screensaverVariant: 'Változat',
      screensaverVariantOptions: {
        bouncingLogo: 'Pattogó logó',
        maze: '3D Labirintus 95',
      },
      screensaverTimeoutOptions: {
        '15': '15 másodperc',
        '30': '30 másodperc',
        '60': '1 perc',
        '300': '5 perc',
        '900': '15 perc',
      },
      gifts: {
        detectAdblocker: 'Reklámblokkoló észlelése',
        flaps: 'Háttérben lebegő reklámfülek',
        oneByOne: 'Egyenkénti reklámblokkok',
      },
      achievementNotifications: 'Eredmény értesítések',
      clipboardMarker: 'Vágólap jelölő',
      contentPaywall: 'Tartalmi fizetőfal',
      deadPixel: 'Halott pixel',
      disableContextMenu: 'Jobb klikk menü letiltása',
      exitPrompt: 'Kilépési megerősítés',
      historySpam: 'Előzmény spam',
      mockChat: 'Chat buborék',
      newsletterModal: 'Hírlevél felugró ablak',
      notifications: 'Értesítések',
      screensaver: 'Képernyővédő',
      pageTitleInactiveArrayPaged: 'Alternatív cím, ha a lapfül inaktív',
      searchDelay: 'Kamuzott keresési késleltetés',
      wheelOfFortune: 'Szerencsekerék',
      stickyVideo: 'Tapadós videó',
    },
    optionalPainPointsHints: {
      screensaver:
        'A kiválasztott képernyővédőt indítja el a megadott inaktivitási idő után.',
      gifts: {
        detectAdblocker:
          'Egy nagy piros sávot jelenít meg, ha reklámblokkolót észlel.',
        flaps:
          'Reklámfüleket jelenít meg az oldal szélén, amikre kattintva különböző oldalakra jutsz.',
        oneByOne: 'Főleg a főoldalon lévő animált hirdetésekre vonatkozik.',
      },
      achievementNotifications:
        'Értesítést küld, ha új eredményt érsz el. A haladást a háttérben mindig követjük.',
      clipboardMarker:
        'Egy "Olvass tovább itt..." linket fűz a vágólapra másolt szöveg végére.',
      contentPaywall:
        'Egy hamis fizetőfalat jelenít meg bizonyos tartalmak felett, de a tartalom továbbra is felfedhető marad.',
      deadPixel:
        'Néhány hamis "halott" pixelt helyez el a képernyőn, hogy idegesítsen.',
      disableContextMenu:
        'Megakadályozza a jobb egérgombos menü használatát, és helyette egy figyelmeztetést jelenít meg.',
      exitPrompt:
        'Megkérdezi, hogy "Biztosan el akarsz menni?", amikor be akarod zárni a lapot vagy elnavigálnál.',
      historySpam:
        'Teleírja a böngészési előzményeidet hamis bejegyzésekkel, hogy ne tudj könnyen visszalépni. Ez megnehezítheti a keresőmotor találataihoz való visszatérést.',
      mockChat:
        'Megjelenít egy idegesítő "emberi" chat buborékot, ami csak akkor üzen neked, amikor bezárod, és közben folyamatosan azt mutatja, hogy "az ügyintéző gépel".',
      newsletterModal:
        'Rendszeresen megjelenít egy hírlevél-feliratkozási ablakot, különösen akkor, ha a lapfül inaktivitás után (lapfülváltás) újra fókuszba kerül.',
      notifications:
        'Engedélyt kér az értesítésekhez, és hamis értesítéseket jelenít meg.',
      pageTitleInactiveArrayPaged:
        'Figyelemfelkeltőre változtatja a lapfül címét, amikor az inaktív.',
      searchDelay:
        'Egy hamis, hosszú betöltési késleltetést ad minden kereséshez.',
      wheelOfFortune:
        'Egy hamis "Szerencsekerék" ablakot jelenít meg, ami teljesen haszontalan nyereményeket ad.',
      stickyVideo:
        'Egy tapadós videólejátszót jelenít meg, ami követ téged görgetés közben.',
    },
    mandatoryExperienceFlags: {
      title: 'Kötelező élmény',
      impossibleLogin: 'Lehetetlen belépés',
      impossibleSignup: 'Lehetetlen regisztráció',
      impossiblePasswordReminder: 'Lehetetlen jelszó emlékeztető',
      unreasonableContent: 'Ésszerűtlen tartalom',
      flaimYourPhone: 'Flaim your phone',
      fakeAiSubscription: 'Hamis MI előfizetési tervek',
    },
    runtime: {
      title: 'A munkamenetről',
      disclaimer:
        'Az alább felsorolt információk hibakeresési célt szolgálnak a jelenlegi böngészőmunkamenethez (ha frissíted az oldalt, minden alaphelyzetbe áll). A színfalak mögött ezeknek az értékeknek hatalmas hatásuk van arra, hogy mi és hogyan történik.',
      startedAgo: 'Munkamenet kezdete',
      visibilitySeconds: 'Fókuszban töltött idő',
      isDocumentVisible: 'Jelenleg fókuszban van',
      navigationCount: 'Navigációk száma',
      userActivation: 'Kezdeti felhasználói interakció',
      lastActivation: 'Utolsó felhasználói aktivitás',
      flaimSurveyResult: 'Flaim felmérés eredménye',
      adblockerSuspected: 'Reklámblokkoló gyanúja',
      adblockerNotDetected: 'Reklámblokkoló nem észlelhető',
    },
    screensaver: {
      exitClick: 'Kattints bárhova a kilépéshez',
      exitTap: 'Koppints bárhova a kilépéshez',
    },
  },
  achievements,
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
  newsletter,
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
  gifts: promotions,
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
  chatBubble: {
    messageInitial:
      'Szia! Én egy chat buborék vagyok. Azért vagyok itt, hogy segítsek neked. 🤓',
    messageVariants: {
      variant_001: 'Gyerünk, hadd segítsek!',
      variant_002: 'Nem halllak! Beszélj hangosabban!',
      variant_003: 'Ki lakik a tenger fenekén?',
      variant_004:
        'A FitnessGram Pacer teszt egy többlépcsős aerob kapacitásmérés, amely a folytatással egyre nehezebbé válik.',
      variant_005: 'Bocsi, épp egy alagúton megyek át. Megismételnéd?',
      variant_006:
        'Biztosan lemaradtál az előző üzeneteimről. Kicsit magányos vagyok.',
      variant_007:
        "Wondering if my messages got caught in a time warp. Feeling like I'm at a party where everyone's speaking Simlish.",
      variant_008: 'My messages must be on a ghosting spree. Feeling ignored.',
      variant_009:
        'Ah, the sweet sound of silence. My messages must be enjoying their newfound solitude.',
    },
    messageFallback: "It's nothing, leave me alone. 😤",
    newAlert: 'New message from Chat Bubble! 🎉',
    hudTitle: 'Chat with a "100% real huuman"',
    hudTitleDisclaimer:
      "Disclaimer: Actually, this is a bot that almost feels like a real human (not a smart one) but it's still just a bot",
    agentIsTyping: 'Agent is typing',
    yourMessage: 'Your message',
    yourMessagePlaceholder: 'Type here...',
  },
  messages: {
    errors: {
      e404title: 'Hiba 404',
      e404description: 'Az oldal nem található, hogyan történhetett ez?',
    },
    info: {},
  },
  debug: {
    auth: {
      title: 'Korlátozott hozzáférés',
      description: 'Add meg a jelszót a debug felület eléréséhez.',
      passwordLabel: 'Jelszó',
      passwordPlaceholder: '••••••••',
      submit: 'Debug mód feloldása',
    },
    logout: 'Kijelentkezés',
    internalOnly: 'Csak belső használatra',
    tabs: {
      stores: 'Store ellenőrző',
      events: 'Esemény tesztelő',
      config: 'Statikus konfiguráció',
    },
    eventTester: {
      title: 'Eseménybusz tesztelő',
      commonEvents: 'Gyakori események',
      eventTypeLabel: 'Esemény típusa',
      payloadLabel: 'Payload (JSON)',
      dispatch: 'Esemény küldése',
    },
    eventHistory: {
      title: 'Eseménytörténet',
      enable: 'Eseménytörténet rögzítése',
      clear: 'Történet törlése',
      table: {
        timestamp: 'Időbélyeg',
        type: 'Típus',
        payload: 'Payload',
      },
      empty: 'Még nincsenek rögzített események...',
      disabled: 'Az eseménytörténet rögzítése ki van kapcsolva.',
    },
    storeInspector: {
      runtime: 'Runtime Store',
      monitoring: 'Monitoring Store',
      painPreferences: 'Fájdalom-beállítások Store',
      achievements: 'Eredmények Store',
      userPreferences: 'Felhasználói beállítások Store',
      userGrants: 'Hozzájárulások Store',
      appConfig: 'App konfiguráció',
    },
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
  plansPage,
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
