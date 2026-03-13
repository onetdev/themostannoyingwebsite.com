export default {
  userPreferences: {
    title: 'Preferenze',
    colorScheme: 'Tema / Schema colori',
    darkMode: 'Modalità scura',
    reducedMotion: 'Riduzione movimento',
    reducedMotionHelp:
      'Può essere modificato nelle impostazioni del tuo sistema operativo o browser. Potrebbe essere necessario ricaricare la pagina dopo la modifica.',
    enableSound: 'Audio',
    adultFilter: 'Filtra contenuti per adulti',
  },
  userGrants: {
    title: 'Consenso e permessi',
    permissionDisclaimer:
      'Le impostazioni dei permessi sono gestite dal browser. Se desideri cambiare il tema, puoi farlo dalle impostazioni del sito nel tuo browser.',
    essentialCookies: 'Consenti cookie essenziali',
    notificationPermission: 'Permesso notifiche',
    locationPermission: 'Permesso posizione',
  },
  optionalPainPoints: {
    title: 'Punti di dolore opzionali',
    categories: {
      visualChaos: 'Caos visivo',
      uiSabotage: "Sabotaggio dell'interfaccia",
      interruptions: 'Interruzioni',
      browserHijacking: 'Hijacking del browser',
    },
    achievementNotifications: {
      label: 'Notifiche obiettivi',
      hint: 'Visualizza una notifica ogni volta che sblocchi un nuovo obiettivo. Il progresso è sempre tracciato in background.',
    },
    backgroundAdflaps: {
      label: 'Banner pubblicitari laterali',
      hint: 'Mostra alette pubblicitarie ai lati della pagina che possono essere cliccate e portano a pagine di marketing.',
    },
    clipboardBrandingMark: {
      label: 'Marchio di branding negli appunti',
      hint: 'Aggiunge un link "Leggi di più su..." quando copi del testo dal sito web.',
    },
    contentPaywall: {
      label: 'Paywall dei contenuti',
      hint: 'Mostra una sovrapposizione di paywall falso su alcuni contenuti, puoi comunque rivelare il contenuto gratuitamente.',
    },
    deadPixel: {
      label: 'Pixel morto',
      hint: 'Posiziona alcuni finti pixel "morti" sullo schermo per infastidirti.',
    },
    detectAdblocker: {
      label: 'Rileva adblocker',
      hint: 'Mostra un grande banner rosso se viene rilevato un adblocker.',
    },
    disableContextMenu: {
      label: 'Disabilita menu contestuale (tasto destro)',
      hint: 'Ti impedisce di usare il menu del tasto destro e visualizza un avviso al suo posto.',
    },
    exitPrompt: {
      label: 'Avviso di uscita',
      hint: 'Mostra un avviso "Sei sicuro di voler uscire?" quando provi a chiudere la scheda o ad allontanarti.',
    },
    flaimAPHoneAd: {
      label: 'Campagna di sondaggio telefonico Flaim',
      hint: 'Mostra un annuncio animado funky sulla home page che porta a Flaim a Phone.',
    },
    historySpam: {
      label: 'Spam della cronologia',
      hint: 'Riempie la cronologia del browser con voci fittizie in modo da non poter tornare indietro facilmente. Questo può rendere scomodo tornare ai risultati del motore di ricerca.',
    },
    mockSupportChat: {
      label: 'Chat di supporto simulata',
      hint: 'Mostra una fastidiosa bolla di chat di supporto "umana" che ti invia messaggi solo quando la chiudi.',
    },
    newsletterModal: {
      label: 'Popup iscrizione newsletter',
      hint: "Mostra periodicamente un modulo di iscrizione alla newsletter, specialmente quando la pagina torna dall'inattività (cambio di scheda).",
    },
    notifications: {
      label: 'Notifiche',
      hint: 'Chiede i permessi per le notifiche e mostra fante notifiche.',
    },
    pageTitleInactiveArrayPaged: {
      label: 'Titolo alternato quando la scheda è inattiva',
      hint: "Cambia il titolo della scheda con qualcosa che attiri l'attenzione quando la scheda è inattiva.",
    },
    searchDelay: {
      label: 'Ritardo di ricerca artificiale',
      hint: 'Aggiunge un finto e lungo ritardo di caricamento a tutte le ricerche.',
    },
    stickyVideoPlayer: {
      label: 'Video player appiccicoso',
      hint: 'Mostra un video player appiccicoso che ti segue mentre scorri la pagina.',
    },
    wheelOfFortune: {
      label: 'Ruota della fortuna',
      hint: 'Mostra una finta "Ruota della Fortuna" che ti assegna premi assolutamente inutili.',
    },
    screensaver: {
      label: 'Screensaver',
      hint: "Attiva uno screensaver selezionato dall'utente dopo il periodo specificato di inattività totale.",
      variant: {
        label: 'Variante',
        options: {
          bouncingLogo: 'Logo rimbalzante',
          maze: 'Labirinto 3D 95',
        },
      },
      timer: {
        label: 'Timeout',
        options: {
          15: '15 secondi',
          30: '30 secondi',
          60: '1 minuto',
          300: '5 minuti',
          900: '15 minuti',
        },
      },
    },
  },
  mandatoryExperienceFlags: {
    title: 'Esperienza obbligatoria',
    impossibleLogin: 'Accesso impossibile',
    impossibleSignup: 'Registrazione impossibile',
    impossiblePasswordReminder: 'Promemoria password impossibile',
    unreasonableContent: 'Contenuto irragionevole',
    flaimYourPhone: 'Richiedi il tuo telefono',
    fakeAiSubscription: 'Finti piani di abbonamento IA',
  },
  runtimeInfo: {
    title: 'Informazioni sulla sessione',
    disclaimer:
      'Le informazioni elencate di seguito servono come informazioni di debug per la sessione corrente del browser (se ricarichi la pagina, tutto verrà resettato). Dietro le quinte, questi valori hanno anche un grande impatto su cosa succede e come.',
    startedAgo: 'Sessione iniziata',
    visibilitySeconds: 'Tempo trascorso con focus',
    isDocumentVisible: 'Attualmente con focus',
    navigationCount: 'Conteggio navigazioni',
    userActivation: 'Azione iniziale utente',
    lastActivation: 'Ultima attività utente',
    flaimSurveyResult: 'Risultato sondaggio telefono',
    adblockerSuspected: 'Sospetto adblocker',
    adblockerNotDetected: 'Adblocker non rilevato',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, non dovresti essere qui 😡',
  },
  notification: {
    modal: {
      title: "Oh no, dov'è il permesso per le notifiche!?!",
      description:
        'Vorremmo inviarti notifiche a volte. Puoi concedere il permesso per le notifiche a questo sito web dalle impostazioni del tuo browser. Potresti? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Livello di dolore',
      rating: 'Valutazione del dolore',
      railTitle: 'Barra del livello di dolore',
      clamps: {
        from_0: 'Innocente',
        from_10: "È un po' strano, vero?",
        from_20: 'Lievemente fastidioso',
        from_30: 'Un tantino maledetto',
        from_40: 'Inquietante in modo molto specifico',
        from_50: 'La giusta dose',
        from_60: 'Tolleranza superiore alla media',
        from_70: 'Calpestare escrementi di cane a piedi nudi',
        from_80: 'Al limite del masochismo',
        from_90: 'Incubi? Iscritto.',
        from_100: 'Dolore massimo',
      },
    },
  },
};
