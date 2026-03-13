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
      visualChaos: 'Chaos visuel',
      uiSabotage: "Sabotage de l'interface",
      interruptions: 'Interruptions',
      browserHijacking: 'Détournement du navigateur',
    },
    achievementNotifications: {
      label: 'Notifications de succès',
      hint: 'Affiche une notification chaque fois que vous débloquez un nouveau succès. La progression est toujours suivie en arrière-plan.',
    },
    backgroundAdflaps: {
      label: 'Bannières publicitaires latérales',
      hint: 'Affiche des volets publicitaires sur les côtés de la page qui peuvent être cliqués et mènent à des pages de marketing.',
    },
    clipboardBrandingMark: {
      label: 'Marque de branding du presse-papiers',
      hint: 'Ajoute un lien "En savoir plus sur..." lorsque vous copiez du texte du site.',
    },
    contentPaywall: {
      label: 'Paywall de contenu',
      hint: 'Affiche une superposition de mur de paiement fictif sur certains contenus, vous pouvez toujours révéler le contenu gratuitement.',
    },
    deadPixel: {
      label: 'Pixel mort',
      hint: 'Place quelques faux pixels "morts" sur votre écran pour vous agacer.',
    },
    detectAdblocker: {
      label: 'Détecter le bloqueur de pub',
      hint: 'Affiche une large bannière rouge si un bloqueur de pub est détecté.',
    },
    disableContextMenu: {
      label: 'Désactiver le menu contextuel (clic droit)',
      hint: "Vous empêche d'utiliser le menu clic droit et affiche une alerte à la place.",
    },
    exitPrompt: {
      label: 'Invite de sortie',
      hint: 'Affiche une invite "Êtes-vous sûr de vouloir quitter ?" en essayant de fermer l\'onglet ou de naviguer ailleurs.',
    },
    flaimAPHoneAd: {
      label: 'Campagne de sondage téléphonique Flaim',
      hint: "Affiche une publicité animée funky sur la page d'accueil menant à Flaim a Phone.",
    },
    historySpam: {
      label: "Spam d'historique",
      hint: "Remplit l'historique de votre navigateur with de fausses entrées pour que vous ne puissiez pas revenir facilement en arrière. Cela peut être gênant pour revenir aux résultats des moteurs de recherche.",
    },
    mockSupportChat: {
      label: 'Chat de support simulé',
      hint: 'Affiche une bulle de chat de support "humain" agaçante qui ne vous envoie des messages que lorsque vous la fermez.',
    },
    newsletterModal: {
      label: 'Fenêtre surgissante newsletter',
      hint: "Affiche périodiquement une fenêtre d'abonnement à la newsletter, surtout quand la page revient de l'inactivité (changement d'onglets).",
    },
    notifications: {
      label: 'Notifications',
      hint: 'Demande des autorisations de notification et affiche de fausses notifications.',
    },
    pageTitleInactiveArrayPaged: {
      label: "Titre alterné lorsque l'onglet est inactif",
      hint: "Change le titre de l'onglet par quelque chose qui attire l'attention quand l'onglet est inactif.",
    },
    searchDelay: {
      label: 'Délai de recherche artificiel',
      hint: 'Ajoute un faux et long délai de chargement à toutes les recherches.',
    },
    stickyVideoPlayer: {
      label: 'Lecteur vidéo collant',
      hint: 'Affiche un lecteur vidéo collant qui vous suit pendant que vous faites défiler.',
    },
    wheelOfFortune: {
      label: 'Roue de la fortune',
      hint: 'Affiche une fausse fenêtre de "Roue de la fortune" qui vous donne des prix absolument inutiles.',
    },
    screensaver: {
      label: "Économiseur d'écran",
      hint: "Déclenche un économiseur d'écran sélectionné par l'utilisateur après la période spécifiée d'inactivité totale.",
      variant: {
        label: 'Variante',
        options: {
          bouncingLogo: 'Logo Rebondissant',
          maze: 'Labyrinthe 3D 95',
        },
      },
      timer: {
        label: "Délai d'expiration",
        options: {
          15: '15 secondes',
          30: '30 secondes',
          60: '1 minute',
          300: '5 minutes',
          900: '15 minutes',
        },
      },
    },
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
      rating: 'Évaluation de la douleur',
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
