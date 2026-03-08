export default {
  auth: {
    title: 'Accesso limitato',
    description: 'Inserisci la password per accedere alla dashboard di debug.',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    submit: 'Sblocca modalità debug',
  },
  logout: 'Disconnetti',
  internalOnly: 'Solo uso interno',
  tabs: {
    stores: 'Ispettore Store',
    events: 'Tester Eventi',
    config: 'Config Statica',
  },
  eventTester: {
    title: 'Tester Bus Eventi',
    commonEvents: 'Eventi comuni',
    eventTypeLabel: 'Tipo di evento',
    payloadLabel: 'Payload (JSON)',
    dispatch: 'Invia evento',
  },
  eventHistory: {
    title: 'Cronologia eventi',
    enable: 'Abilita registrazione cronologia eventi',
    clear: 'Cancella cronologia',
    table: {
      timestamp: 'Timestamp',
      type: 'Tipo',
      payload: 'Payload',
    },
    empty: 'Nessun evento catturato finora...',
    disabled: 'La registrazione della cronologia eventi è disabilitata.',
  },
  storeInspector: {
    runtime: 'Store Runtime',
    monitoring: 'Store Monitoraggio',
    painPreferences: 'Store Preferenze Dolore',
    achievements: 'Store Obiettivi',
    userPreferences: 'Store Preferenze Utente',
    userGrants: 'Store Autorizzazioni Utente',
    appConfig: 'Configurazione App',
  },
};
