export default {
  userPreferences: {
    title: 'Präferenzen',
    colorScheme: 'Thema / Farbschema',
    darkMode: 'Dunkelmodus',
    reducedMotion: 'Reduzierte Bewegung',
    reducedMotionHelp:
      'Kann in Ihren BS-/Browser-Einstellungen geändert werden; möglicherweise müssen Sie die Seite nach der Änderung neu laden.',
    enableSound: 'Sound',
    adultFilter: 'Inhalte für Erwachsene filtern',
  },
  userGrants: {
    title: 'Zustimmung und Berechtigungen',
    permissionDisclaimer:
      'Berechtigungseinstellungen werden vom Browser verwaltet. Wenn Sie das Thema ändern möchten, können Sie dies in den Website-Einstellungen Ihres Browsers tun.',
    essentialCookies: 'Essenzielle Cookies zulassen',
    notificationPermission: 'Benachrichtigungsberechtigung',
    locationPermission: 'Standortberechtigung',
  },
  optionalPainPoints: {
    title: 'Optionale Schmerzpunkte',
    categories: {
      browser: 'Browser & Tab',
      visual: 'Visuelle Hindernisse',
      ads: 'Werbung & Monetarisierung',
      interactivity: 'Popups & Interaktivität',
    },
    screensaverTimeout: 'Zeitüberschreitung',
    screensaverVariant: 'Variante',
    screensaverVariantOptions: {
      bouncingLogo: 'Springendes Logo',
      maze: '3D-Labyrinth 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 Sekunden',
      '30': '30 Sekunden',
      '60': '1 Minute',
      '300': '5 Minuten',
      '900': '15 Minuten',
    },
    gifts: {
      detectAdblocker: 'Adblocker erkennen',
      flaps: 'Hintergrund-Werbeflaps',
      oneByOne: 'Einzelne Werbeblöcke',
    },
    achievementNotifications: 'Erfolgsbenachrichtigungen',
    clipboardMarker: 'Zwischenablage-Markierung',
    contentPaywall: 'Content-Paywall',
    deadPixel: 'Pixelfehler',
    disableContextMenu: 'Kontextmenü (Rechtsklick) deaktivieren',
    exitPrompt: 'Beenden-Aufforderung',
    historySpam: 'Verlauf-Spam',
    mockChat: 'Bubble-Chat',
    newsletterModal: 'Newsletter-Popup-Modal',
    notifications: 'Benachrichtigungen',
    screensaver: 'Bildschirmschoner',
    pageTitleInactiveArrayPaged: 'Alternativer Titel, wenn der Tab inaktiv ist',
    searchDelay: 'Gefälschte Suchverzögerung',
    wheelOfFortune: 'Glücksrad',
    stickyVideo: 'Sticky-Video',
  },
  optionalPainPointsHints: {
    screensaver:
      'Löst nach dem angegebenen Zeitraum totaler Inaktivität einen vom Benutzer ausgewählten Bildschirmschoner aus.',
    gifts: {
      detectAdblocker:
        'Zeigt ein großes rotes Banner an, wenn ein Adblocker erkannt wird.',
      flaps:
        'Zeigt Werbeflaps an den Seiten der Seite an, die angeklickt werden können und zu verschiedenen Seiten führen.',
      oneByOne:
        'Hauptsächlich eine animierte Anzeige auf der Startseite abgedeckt.',
    },
    achievementNotifications:
      'Zeigt eine Benachrichtigung an, wenn Sie einen neuen Erfolg freischalten. Der Fortschritt wird im Hintergrund immer mitverfolgt.',
    clipboardMarker:
      'Fügt einen Link „Mehr lesen unter...“ hinzu, wenn Sie Text von der Website kopieren.',
    contentPaywall:
      'Zeigt eine gefälschte Paywall-Überlagerung für einige Inhalte an, Sie können den Inhalt jedoch weiterhin enthüllen.',
    deadPixel:
      'Platziert ein paar gefälschte „tote“ Pixel auf Ihrem Bildschirm, um Sie zu ärgern.',
    disableContextMenu:
      'Verhindert, dass Sie das Rechtsklick-Menü verwenden, und zeigt stattdessen eine Warnung an.',
    exitPrompt:
      'Zeigt eine Aufforderung „Sind Sie sicher, dass Sie gehen wollen?“ an, wenn Sie versuchen, den Tab zu schließen oder die Seite zu verlassen.',
    historySpam:
      'Füllt Ihren Browserverlauf mit gefälschten Einträgen, sodass Sie nicht einfach zurückgehen können. Dies kann es unpraktisch machen, zu den Ergebnissen der Suchmaschine zurückzukehren.',
    mockChat:
      'Zeigt eine nervige „menschliche“ Chat-Blase an, die Ihnen nur Nachrichten sendet, wenn Sie sie schließen, und in der Zwischenzeit ständig „Agent schreibt“ anzeigt.',
    newsletterModal:
      'Zeigt periodisch ein Newsletter-Abonnement-Modal an, insbesondere wenn die Seite aus der Inaktivität zurückkehrt (Wechseln der Tabs).',
    notifications:
      'Fragt nach Benachrichtigungsberechtigungen und zeigt gefälschte Benachrichtigungen an.',
    pageTitleInactiveArrayPaged:
      'Ändert den Tab-Titel in etwas Aufmerksamkeitsstarkes, wenn der Tab inaktiv ist.',
    searchDelay:
      'Fügt allen Suchvorgängen eine gefälschte, lange Ladeverzögerung hinzu.',
    wheelOfFortune:
      'Zeigt ein gefälschtes „Glücksrad“-Modal an, das Ihnen absolut nutzlose Preise gibt.',
    stickyVideo:
      'Zeigt einen Sticky-Videoplayer an, der Ihnen beim Scrollen folgt.',
  },
  mandatoryExperienceFlags: {
    title: 'Zwingende Erfahrung',
    impossibleLogin: 'Unmöglicher Login',
    impossibleSignup: 'Unmögliche Registrierung',
    impossiblePasswordReminder: 'Unmögliche Passworterinnerung',
    unreasonableContent: 'Unangemessener Inhalt',
    flaimYourPhone: 'Flaim dein Telefon',
    fakeAiSubscription: 'Gefälschte KI-Abonnementpläne',
  },
  runtimeInfo: {
    title: 'Über diese Sitzung',
    disclaimer:
      'Die unten aufgeführten Informationen dienen als Debug-Informationen für die aktuelle Browser-Sitzung (wenn Sie die Seite aktualisieren, wird alles zurückgesetzt). Hinter den Kulissen haben diese Werte auch große Auswirkungen darauf, was und wie passiert.',
    startedAgo: 'Sitzung gestartet',
    visibilitySeconds: 'Im Fokus verbrachte Zeit',
    isDocumentVisible: 'Aktuell im Fokus',
    navigationCount: 'Navigationszähler',
    userActivation: 'Erste Benutzeraktion',
    lastActivation: 'Letzte Benutzeraktivität',
    flaimSurveyResult: 'Flaim-Umfrageergebnis',
    adblockerSuspected: 'Adblocker vermutet',
    adblockerNotDetected: 'Adblocker nicht erkannt',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, du solltest eigentlich nicht hier sein 😡',
  },
  notification: {
    modal: {
      title: 'Oh nein, wo ist die Benachrichtigungsberechtigung!?!',
      description:
        'Wir würden Ihnen gerne manchmal Benachrichtigungen schicken. Sie können dieser Website die Benachrichtigungsberechtigung in Ihren Browser-Einstellungen erteilen. Könnten Sie? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Schmerzniveau',
      railTitle: 'Schmerzniveau-Schieberegler',
      clamps: {
        from_0: 'Unschuldig',
        from_10: 'Ein bisschen merkwürdig, oder?',
        from_20: 'Leicht nervig',
        from_30: 'Ein kleines bisschen verflucht',
        from_40: 'Auf eine sehr spezifische Weise beunruhigend',
        from_50: 'Genau die richtige Menge',
        from_60: 'Überdurchschnittliche Toleranz',
        from_70: 'Barfuß in Hundekot treten',
        from_80: 'Grenzwertig masochistisch',
        from_90: 'Alpträume? Abonniert.',
        from_100: 'Maximaler Schmerz',
      },
    },
  },
};
