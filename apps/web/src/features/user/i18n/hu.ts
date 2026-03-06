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
  screensaver: {
    exitClick: 'Kattints bárhova a kilépéshez',
    exitTap: 'Koppints bárhova a kilépéshez',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, nem kellene itt lenned 😡',
  },
};
