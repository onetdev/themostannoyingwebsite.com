export default {
  userPreferences: {
    title: 'Préférences',
    colorScheme: 'Thème / Schéma de couleurs',
    darkMode: 'Mode sombre',
    reducedMotion: 'Animations réduites',
    reducedMotionHelp:
      'Peut être modifié dans les paramètres de votre OS/Navigateur, vous devrez peut-être recharger la page après modification.',
    enableSound: 'Son',
    adultFilter: 'Filtrer les contenus adultes',
  },
  userGrants: {
    title: 'Consentement et autorisations',
    permissionDisclaimer:
      "Les paramètres d'autorisation sont gérés par le navigateur, si vous souhaitez changer de thème, vous pouvez le faire depuis les paramètres du site dans votre navigateur.",
    essentialCookies: 'Autoriser les cookies essentiels',
    notificationPermission: 'Autorisation de notification',
    locationPermission: 'Autorisation de localisation',
  },
  optionalPainPoints: {
    title: 'Points de douleur optionnels',
    categories: {
      browser: 'Navigateur & Onglet',
      visual: 'Obstructions Visuelles',
      ads: 'Publicité & Monétisation',
      interactivity: 'Popups & Interactivité',
    },
    screensaverTimeout: "Délai d'expiration",
    screensaverVariant: 'Variante',
    screensaverVariantOptions: {
      bouncingLogo: 'Logo Rebondissant',
      maze: 'Labyrinthe 3D 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 secondes',
      '30': '30 secondes',
      '60': '1 minute',
      '300': '5 minutes',
      '900': '15 minutes',
    },
    gifts: {
      detectAdblocker: 'Détecter le bloqueur de pub',
      flaps: 'Bannières publicitaires latérales',
      oneByOne: 'Blocs de pub un par un',
    },
    achievementNotifications: 'Notifications de succès',
    clipboardMarker: 'Marqueur de presse-papier',
    contentPaywall: 'Paywall de contenu',
    deadPixel: 'Pixel mort',
    disableContextMenu: 'Désactiver le menu contextuel (clic droit)',
    exitPrompt: 'Invite de sortie',
    historySpam: "Spam d'historique",
    mockChat: 'Bulle de discussion',
    newsletterModal: 'Fenêtre surgissante newsletter',
    notifications: 'Notifications',
    screensaver: "Économiseur d'écran",
    pageTitleInactiveArrayPaged: "Titre alternatif quand l'onglet est inactif",
    searchDelay: 'Faux délai de recherche',
    wheelOfFortune: 'Roue de la fortune',
    stickyVideo: 'Vidéo collante',
  },
  optionalPainPointsHints: {
    screensaver:
      "Déclenche un économiseur d'écran sélectionné par l'utilisateur après la période spécifiée d'inactivité totale.",
    gifts: {
      detectAdblocker:
        'Affiche une large bannière rouge si un bloqueur de pub est détecté.',
      flaps:
        'Affiche des bannières de pub sur les côtés de la page qui peuvent être cliquées et mènent à différentes pages.',
      oneByOne:
        "Couvre principalement une publicité animée sur la page d'accueil.",
    },
    achievementNotifications:
      'Affiche une notification chaque fois que vous débloquez un nouveau succès. La progression est toujours suivie en arrière-plan.',
    clipboardMarker:
      'Ajoute un lien "Lire la suite sur..." lorsque vous copiez du texte du site.',
    contentPaywall:
      'Affiche un faux paywall sur certains contenus, vous pouvez toujours révéler le contenu.',
    deadPixel:
      'Place quelques faux pixels "morts" sur votre écran pour vous agacer.',
    disableContextMenu:
      "Vous empêche d'utiliser le menu clic droit et affiche une alerte à la place.",
    exitPrompt:
      'Affiche une invite "Êtes-vous sûr de vouloir quitter ?" en essayant de fermer l\'onglet ou de naviguer ailleurs.',
    historySpam:
      "Remplit l'historique de votre navigateur avec de fausses entrées pour que vous ne puissiez pas revenir facilement en arrière. Cela peut être gênant pour revenir aux résultats des moteurs de recherche.",
    mockChat:
      'Affiche une bulle de discussion "humaine" agaçante qui ne vous envoie de messages que lorsque vous la fermez et affiche constamment "l\'agent écrit" entre-temps.',
    newsletterModal:
      "Affiche périodiquement une fenêtre d'abonnement à la newsletter, surtout quand la page revient de l'inactivité (changement d'onglets).",
    notifications:
      'Demande des autorisations de notification et affiche de fausses notifications.',
    pageTitleInactiveArrayPaged:
      "Change le titre de l'onglet par quelque chose qui attire l'attention quand l'onglet est inactif.",
    searchDelay:
      'Ajoute un faux et long délai de chargement à toutes les recherches.',
    wheelOfFortune:
      'Affiche une fausse fenêtre de "Roue de la fortune" qui vous donne des prix absolument inutiles.',
    stickyVideo:
      'Affiche un lecteur vidéo collant qui vous suit pendant que vous faites défiler.',
  },
  mandatoryExperienceFlags: {
    title: 'Expérience obligatoire',
    impossibleLogin: 'Connexion impossible',
    impossibleSignup: 'Inscription impossible',
    impossiblePasswordReminder: 'Rappel de mot de passe impossible',
    unreasonableContent: 'Contenu déraisonnable',
    flaimYourPhone: 'Réclamez votre téléphone',
    fakeAiSubscription: "Faux plans d'abonnement IA",
  },
  runtimeInfo: {
    title: 'À propos de cette session',
    disclaimer:
      "Les informations listées ci-dessous servent d'informations de débogage pour la session actuelle du navigateur (si vous rafraîchissez la page, tout sera réinitialisé). En coulisses, ces valeurs ont également un impact énorme sur ce qui se passe et comment.",
    startedAgo: 'Session démarrée',
    visibilitySeconds: 'Temps passé en focus',
    isDocumentVisible: 'Actuellement en focus',
    navigationCount: 'Nombre de navigations',
    userActivation: 'Action utilisateur initiale',
    lastActivation: 'Dernière activité utilisateur',
    flaimSurveyResult: 'Résultat du sondage Flaim',
    adblockerSuspected: 'Adblocker suspecté',
    adblockerNotDetected: 'Adblocker non détecté',
  },
  myProfile: {
    notSupposedToBeHere: "Hmm, vous n'êtes pas censé être ici 😡",
  },
  notification: {
    modal: {
      title: "Oh non, où est l'autorisation de notification !?!",
      description:
        "Nous aimerions vous envoyer des notifications parfois. Vous pouvez donner l'autorisation de notification à ce site web depuis les paramètres de votre navigateur. Pourriez-vous ? 🙏🥺🙏",
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Niveau de douleur',
      railTitle: 'Curseur de niveau de douleur',
      clamps: {
        from_0: 'Innocent',
        from_10: "C'est un peu bizarre, non ?",
        from_20: 'Légèrement agaçant',
        from_30: 'Un petit peu maudit',
        from_40: "Troublant d'une manière très spécifique",
        from_50: "Juste ce qu'il faut",
        from_60: 'Tolérance supérieure à la moyenne',
        from_70: 'Marcher pieds nus dans une crotte de chien',
        from_80: 'À la limite du masochisme',
        from_90: 'Cauchemars ? Abonné.',
        from_100: 'Douleur Maximale',
      },
    },
  },
};
