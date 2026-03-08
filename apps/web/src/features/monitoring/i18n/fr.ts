export default {
  auth: {
    title: 'Accès restreint',
    description:
      'Entrez le mot de passe pour accéder au tableau de bord de débogage.',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: '••••••••',
    submit: 'Déverrouiller le mode débogage',
  },
  logout: 'Déconnexion',
  internalOnly: 'Usage interne uniquement',
  tabs: {
    stores: 'Inspecteur de Stores',
    events: "Testeur d'Événements",
    config: 'Config Statique',
  },
  eventTester: {
    title: "Testeur de Bus d'Événements",
    commonEvents: 'Événements courants',
    eventTypeLabel: "Type d'événement",
    payloadLabel: 'Payload (JSON)',
    dispatch: "Émettre l'événement",
  },
  eventHistory: {
    title: 'Historique des Événements',
    enable: "Activer l'enregistrement de l'historique",
    clear: "Effacer l'historique",
    table: {
      timestamp: 'Horodatage',
      type: 'Type',
      payload: 'Payload',
    },
    empty: 'Aucun événement capturé pour le moment...',
    disabled: "L'enregistrement de l'historique des événements est désactivé.",
  },
  storeInspector: {
    runtime: 'Store Runtime',
    monitoring: 'Store Monitoring',
    painPreferences: 'Store Préférences de Douleur',
    achievements: 'Store Succès',
    userPreferences: 'Store Préférences Utilisateur',
    userGrants: 'Store Autorisations Utilisateur',
    appConfig: "Configuration de l'App",
  },
};
