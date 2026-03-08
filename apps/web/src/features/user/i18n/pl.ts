export default {
  userPreferences: {
    title: 'Preferencje',
    colorScheme: 'Motyw / Schemat kolorów',
    darkMode: 'Tryb ciemny',
    reducedMotion: 'Ograniczenie ruchu',
    reducedMotionHelp:
      'Można to zmienić w ustawieniach systemu/przeglądarki; po zmianie może być konieczne odświeżenie strony.',
    enableSound: 'Dźwięk',
    adultFilter: 'Filtruj treści dla dorosłych',
  },
  userGrants: {
    title: 'Zgody i uprawnienia',
    permissionDisclaimer:
      'Ustawienia uprawnień są zarządzane przez przeglądarkę; jeśli chcesz zmienić motyw, możesz to zrobić w ustawieniach strony w przeglądarce.',
    essentialCookies: 'Zezwalaj na niezbędne ciasteczka',
    notificationPermission: 'Uprawnienie do powiadomień',
    locationPermission: 'Uprawnienie do lokalizacji',
  },
  optionalPainPoints: {
    title: 'Opcjonalne punkty zapalne',
    categories: {
      browser: 'Przeglądarka i karty',
      visual: 'Przeszkody wizualne',
      ads: 'Reklamy i monetyzacja',
      interactivity: 'Popupy i interaktywność',
    },
    screensaverTimeout: 'Limit czasu',
    screensaverVariant: 'Wariant',
    screensaverVariantOptions: {
      bouncingLogo: 'Odbijające się logo',
      maze: 'Labirynt 3D 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 sekund',
      '30': '30 sekund',
      '60': '1 minuta',
      '300': '5 minut',
      '900': '15 minut',
    },
    gifts: {
      detectAdblocker: 'Wykrywanie adblockera',
      flaps: 'Boczne banery reklamowe',
      oneByOne: 'Bloki reklamowe jeden po drugim',
    },
    achievementNotifications: 'Powiadomienia o osiągnięciach',
    clipboardMarker: 'Znacznik schowka',
    contentPaywall: 'Paywall treści',
    deadPixel: 'Martwy piksel',
    disableContextMenu: 'Wyłącz menu kontekstowe (prawy przycisk)',
    exitPrompt: 'Monit przy wyjściu',
    historySpam: 'Spam w historii',
    mockChat: 'Bąbelek czatu',
    newsletterModal: 'Modalny popup newslettera',
    notifications: 'Powiadomienia',
    screensaver: 'Wygaszacz ekranu',
    pageTitleInactiveArrayPaged:
      'Alternatywny tytuł, gdy karta jest nieaktywna',
    searchDelay: 'Sztuczne opóźnienie wyszukiwania',
    wheelOfFortune: 'Koło fortuny',
    stickyVideo: 'Przyklejone wideo',
  },
  optionalPainPointsHints: {
    screensaver:
      'Uruchamia wybrany wygaszacz ekranu po określonym czasie całkowitej nieaktywności.',
    gifts: {
      detectAdblocker:
        'Wyświetla duży czerwony baner w przypadku wykrycia adblockera.',
      flaps:
        'Wyświetla banery reklamowe po bokach strony, które można kliknąć i które prowadzą do różnych stron.',
      oneByOne: 'Głównie dotyczy animowanej reklamy na stronie głównej.',
    },
    achievementNotifications:
      'Wyświetla powiadomienie po odblokowaniu nowego osiągnięcia. Postęp jest zawsze śledzony w tle.',
    clipboardMarker:
      'Dodaje link „Czytaj więcej na...” podczas kopiowania tekstu ze strony.',
    contentPaywall:
      'Wyświetla nakładkę fałszywego paywalla na niektórych treściach; nadal możesz je odkryć.',
    deadPixel:
      'Umieszcza kilka fałszywych „martwych” pikseli na ekranie, aby Cię irytować.',
    disableContextMenu:
      'Uniemożliwia korzystanie z menu prawego przycisku myszy i zamiast tego wyświetla alert.',
    exitPrompt:
      'Wyświetla monit „Czy na pewno chcesz wyjść?” podczas próby zamknięcia karty lub przejścia na inną stronę.',
    historySpam:
      'Wypełnia historię przeglądarki fałszywymi wpisami, aby utrudnić powrót. Może to być uciążliwe przy próbie powrotu do wyników wyszukiwania.',
    mockChat:
      'Wyświetla irytujący dymek czatu z „człowiekiem”, który wysyła wiadomości tylko wtedy, gdy go zamkniesz, a w międzyczasie stale wyświetla „agent pisze”.',
    newsletterModal:
      'Okresowo wyświetla modal subskrypcji newslettera, zwłaszcza gdy strona wraca ze stanu nieaktywności (przełączanie kart).',
    notifications:
      'Prosi o uprawnienia do powiadomień i wyświetla fałszywe powiadomienia.',
    pageTitleInactiveArrayPaged:
      'Zmienia tytuł karty na coś przyciągającego uwagę, gdy karta jest nieaktywna.',
    searchDelay:
      'Dodaje sztuczne, długie opóźnienie ładowania do wszystkich wyszukiwań.',
    wheelOfFortune:
      'Wyświetla modal fałszywego „Koła Fortuny”, w którym wygrywasz całkowicie bezużyteczne nagrody.',
    stickyVideo:
      'Wyświetla przyklejony odtwarzacz wideo, który podąża za Tobą podczas przewijania.',
  },
  mandatoryExperienceFlags: {
    title: 'Obowiązkowe doświadczenia',
    impossibleLogin: 'Logowanie niemożliwe',
    impossibleSignup: 'Rejestracja niemożliwa',
    impossiblePasswordReminder: 'Przypomnienie hasła niemożliwe',
    unreasonableContent: 'Niedorzeczne treści',
    flaimYourPhone: 'Odbierz (flaim) telefon',
    fakeAiSubscription: 'Fałszywe plany subskrypcji AI',
  },
  runtimeInfo: {
    title: 'O tej sesji',
    disclaimer:
      'Poniższe informacje służą jako dane debugowania dla bieżącej sesji przeglądarki (po odświeżeniu strony wszystko zostanie zresetowane). Za kulisami te wartości mają również ogromny wpływ na to, co i jak się dzieje.',
    startedAgo: 'Sesja rozpoczęta',
    visibilitySeconds: 'Czas spędzony w skupieniu',
    isDocumentVisible: 'Obecnie w skupieniu',
    navigationCount: 'Liczba nawigacji',
    userActivation: 'Początkowa akcja użytkownika',
    lastActivation: 'Ostatnia aktywność użytkownika',
    flaimSurveyResult: 'Wynik ankiety Flaim',
    adblockerSuspected: 'Podejrzenie adblockera',
    adblockerNotDetected: 'Adblocker nie został wykryty',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, nie powinno Cię tu być 😡',
  },
  notification: {
    modal: {
      title: 'O nie, gdzie jest uprawnienie do powiadomień!?!',
      description:
        'Chcielibyśmy czasem wysyłać Ci powiadomienia. Możesz przyznać uprawnienie do powiadomień tej stronie w ustawieniach swojej przeglądarki. Mógłbyś? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Poziom bólu',
      railTitle: 'Suwak poziomu bólu',
      clamps: {
        from_0: 'Niewinny',
        from_10: 'Trochę dziwne, nieprawdaż?',
        from_20: 'Lekko irytujące',
        from_30: 'Odrobinę przeklęte',
        from_40: 'Niepokojące w bardzo specyficzny sposób',
        from_50: 'W sam raz',
        from_60: 'Tolerancja powyżej średniej',
        from_70: 'Nadepnięcie boso na psią niespodziankę',
        from_80: 'Na granicy masochizmu',
        from_90: 'Koszmary? Subskrybuję.',
        from_100: 'Maksymalny Ból',
      },
    },
  },
};
