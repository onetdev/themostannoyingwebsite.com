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
      visualChaos: 'Chaos wizualny',
      uiSabotage: 'Sabotaż interfejsu',
      interruptions: 'Przerwania',
      browserHijacking: 'Przejęcie przeglądarki',
    },
    achievementNotifications: {
      label: 'Powiadomienia o osiągnięciach',
      hint: 'Wyświetla powiadomienie po odblokowaniu nowego osiągnięcia. Postęp jest zawsze śledzony w tle.',
    },
    backgroundAdflaps: {
      label: 'Boczne banery reklamowe',
      hint: 'Wyświetla klapy reklamowe po bokach strony, które można kliknąć i które prowadzą do stron marketingowych.',
    },
    clipboardBrandingMark: {
      label: 'Znak brandingowy w schowku',
      hint: 'Dodaje link „Czytaj więcej na...” podczas kopiowania tekstu ze strony.',
    },
    contentPaywall: {
      label: 'Paywall treści',
      hint: 'Pokazuje fałszywą nakładkę paywall na niektórych treściach, nadal możesz odkryć treść za darmo.',
    },
    deadPixel: {
      label: 'Martwy piksel',
      hint: 'Umieszcza kilka fałszywych „martwych” pikseli na ekranie, aby Cię irytować.',
    },
    detectAdblocker: {
      label: 'Wykrywanie adblockera',
      hint: 'Wyświetla duży czerwony baner w przypadku wykrycia adblockera.',
    },
    disableContextMenu: {
      label: 'Wyłącz menu kontekstowe (prawy przycisk)',
      hint: 'Uniemożliwia korzystanie z menu prawego przycisku myszy i zamiast tego wyświetla alert.',
    },
    exitPrompt: {
      label: 'Monit przy wyjściu',
      hint: 'Wyświetla monit „Czy na pewno chcesz wyjść?” podczas próby zamknięcia karty lub przejścia na inną stronę.',
    },
    flaimAPHoneAd: {
      label: 'Kampania ankietowa Flaim',
      hint: 'Wyświetla funky animowaną reklamę na stronie głównej prowadzącą do Flaim a Phone.',
    },
    historySpam: {
      label: 'Spam w historii',
      hint: 'Wypełnia historię przeglądarki fałszywymi wpisami, aby utrudnić powrót. Może to być uciążliwe przy próbie powrotu do wyników wyszukiwania.',
    },
    mockSupportChat: {
      label: 'Symulowany czat wsparcia',
      hint: 'Pokazuje irytujący "ludzki" bąbelek czatu wsparcia, który wysyła wiadomości tylko po jego zamknięciu.',
    },
    newsletterModal: {
      label: 'Modalny popup newslettera',
      hint: 'Okresowo wyświetla modal subskrypcji newslettera, zwłaszcza gdy strona wraca ze stanu nieaktywności (przełączanie kart).',
    },
    notifications: {
      label: 'Powiadomienia',
      hint: 'Prosi o uprawnienia do powiadomień i wyświetla fałszywe powiadomienia.',
    },
    pageTitleInactiveArrayPaged: {
      label: 'Naprzemienny tytuł, gdy karta jest nieaktywna',
      hint: 'Zmienia tytuł karty na coś przyciągającego uwagę, gdy karta jest nieaktywna.',
    },
    searchDelay: {
      label: 'Sztuczne opóźnienie wyszukiwania',
      hint: 'Dodaje sztuczne, długie opóźnienie ładowania do wszystkich wyszukiwań.',
    },
    stickyVideoPlayer: {
      label: 'Przyklejony odtwarzacz wideo',
      hint: 'Wyświetla przyklejony odtwarzacz wideo, który podąża za Tobą podczas przewijania.',
    },
    wheelOfFortune: {
      label: 'Koło fortuny',
      hint: 'Wyświetla modal fałszywego „Koła Fortuny”, w którym wygrywasz całkowicie bezużyteczne nagrody.',
    },
    screensaver: {
      label: 'Wygaszacz ekranu',
      hint: 'Uruchamia wybrany wygaszacz ekranu po określonym czasie całkowitej nieaktywności.',
      variant: {
        label: 'Wariant',
        options: {
          bouncingLogo: 'Odbijające się logo',
          maze: 'Labirynt 3D 95',
        },
      },
      timer: {
        label: 'Limit czasu',
        options: {
          15: '15 sekund',
          30: '30 sekund',
          60: '1 minuta',
          300: '5 minut',
          900: '15 minut',
        },
      },
    },
  },
  mandatoryExperienceFlags: {
    title: 'Obowiązkowe doświadczenia',
    dilf: 'Pączek, którego chciałbym zjeść',
    fakeAiSubscription: 'Fałszywe plany subskrypcji AI',
    fakeComments: 'Fałszywe komentarze',
    flaimYourPhone: 'Odbierz (flaim) telefon',
    impossibleLogin: 'Logowanie niemożliwe',
    impossiblePasswordReminder: 'Przypomnienie hasła niemożliwe',
    impossibleSignup: 'Rejestracja niemożliwa',
    madeUpNewsletter: 'Wymyślona promocja newslettera premium',
    unreasonableContent: 'Niedorzeczne treści',
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
      rating: 'Ocena bólu',
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
