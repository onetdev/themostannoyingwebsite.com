import type { UserI18nShape } from '../types';

export default {
  userPreferences: {
    title: 'Beállítások',
    colorScheme: 'Téma / Színséma',
    darkMode: 'Sötét mód',
    reducedMotion: 'Csökkentett mozgás',
    reducedMotionHelp:
      'Az operációs rendszered vagy a böngésződ beállításaiban módosítható, a változtatás után szükség lehet az oldal újratöltésére.',
    enableSound: 'Hangok bekapcsolása',
    adultFilter: 'Felnőtt tartalom szűrése',
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
      visualChaos: 'Vizuális káosz',
      uiSabotage: 'UI szabotázs',
      interruptions: 'Megszakítások',
      browserHijacking: 'Böngészőeltérítés',
    },
    achievementNotifications: {
      label: 'Eredmény értesítések',
      hint: 'Értesítést küld, ha új eredményt érsz el. A haladást a háttérben mindig követjük.',
    },
    backgroundAdflaps: {
      label: 'Háttérben lebegő reklámfülek',
      hint: 'Hirdetési szárnyakat jelenít meg az oldal szélén, amelyekre kattintva marketing oldalakra juthatsz.',
    },
    clipboardBrandingMark: {
      label: 'Vágólap márkajelzés',
      hint: 'Egy "Olvass tovább itt..." linket fűz a vágólapra másolt szöveg végére.',
    },
    contentPaywall: {
      label: 'Tartalmi fizetőfal',
      hint: 'Hamis fizetési falat jelenít meg bizonyos tartalom felett, a tartalom továbbra is ingyenesen felfedhető.',
    },
    deadPixel: {
      label: 'Halott pixel',
      hint: 'Néhány hamis "halott" pixelt helyez el a képernyőn, hogy idegesítsen.',
    },
    detectAdblocker: {
      label: 'Reklámblokkoló észlelése',
      hint: 'Egy nagy piros sávot jelenít meg, ha reklámblokkolót észlel.',
    },
    disableContextMenu: {
      label: 'Jobb klikk menü letiltása',
      hint: 'Megakadályozza a jobb egérgombos menü használatát, és helyette egy figyelmeztetést jelenít meg.',
    },
    exitPrompt: {
      label: 'Kilépési megerősítés',
      hint: 'Megkérdezi, hogy "Biztosan el akarsz menni?", amikor be akarod zárni a lapot vagy elnavigálnál.',
    },
    flaimAPHoneAd: {
      label: 'Flaim telefonos felmérési kampány',
      hint: 'Egy jópofa animált hirdetést jelenít meg a kezdőlapon, amely a Flaim a Phone oldalra vezet.',
    },
    historySpam: {
      label: 'Előzmény spam',
      hint: 'Teleírja a böngészési előzményeidet hamis bejegyzésekkel, hogy ne tudj könnyen visszalépni. Ez megnehezítheti a keresőmotor találataihoz való visszatérést.',
    },
    mockSupportChat: {
      label: 'Szimulált ügyfélszolgálati chat',
      hint: 'Egy idegesítő "emberi" ügyfélszolgálati chatbuborékot mutat, amely csak akkor küld üzenetet, ha bezárod.',
    },
    newsletterModal: {
      label: 'Hírlevél felugró ablak',
      hint: 'Rendszeresen megjelenít egy hírlevél-feliratkozási ablakot, különösen akkor, ha a lapfül inaktivitás után (lapfülváltás) újra fókuszba kerül.',
    },
    notifications: {
      label: 'Értesítések',
      hint: 'Engedélyt kér az értesítésekhez, és hamis értesítéseket jelenít meg.',
    },
    pageTitleInactiveArrayPaged: {
      label: 'Váltakozó cím, ha a lap inaktív',
      hint: 'Figyelemfelkeltőre változtatja a lapfül címét, amikor az inaktív.',
    },
    searchDelay: {
      label: 'Mesterséges keresési késleltetés',
      hint: 'Egy hamis, hosszú betöltési késleltetést ad minden kereséshez.',
    },
    stickyVideoPlayer: {
      label: 'Ragadós videólejátszó',
      hint: 'Egy tapadós videólejátszót jelenít meg, ami követ téged görgetés közben.',
    },
    wheelOfFortune: {
      label: 'Szerencsekerék',
      hint: 'Egy hamis "Szerencsekerék" ablakot jelenít meg, ami teljesen haszontalan nyereményeket ad.',
    },
    screensaver: {
      label: 'Képernyővédő',
      hint: 'A kiválasztott képernyővédőt indítja el a megadott inaktivitási idő után.',
      variant: {
        label: 'Változat',
        options: {
          bouncingLogo: 'Pattogó logó',
          maze: '3D Labirintus 95',
        },
      },
      timer: {
        label: 'Időtúllépés',
        options: {
          15: '15 másodperc',
          30: '30 másodperc',
          60: '1 perc',
          300: '5 perc',
          900: '15 perc',
        },
      },
    },
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
  runtimeInfo: {
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
  myProfile: {
    notSupposedToBeHere: 'Hmm, nem kellene itt lenned 😡',
  },
  notification: {
    modal: {
      title: 'Ó ne, hol van az értesítési engedély!?!',
      description:
        'Szeretnénk néha értesítéseket küldeni neked. A böngésződ beállításaiban adhatsz értesítési engedélyt ennek a weboldalnak. Megtennéd? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Fájdalomküszöb',
      rating: 'Fájdalom értékelése',
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
} satisfies UserI18nShape;
