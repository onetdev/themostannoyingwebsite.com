export default {
  auth: {
    title: 'Eingeschränkter Zugriff',
    description:
      'Geben Sie das Passwort ein, um auf das Debug-Dashboard zuzugreifen.',
    passwordLabel: 'Passwort',
    passwordPlaceholder: '••••••••',
    submit: 'Debug-Modus entsperren',
  },
  logout: 'Abmelden',
  internalOnly: 'Nur für den internen Gebrauch',
  tabs: {
    stores: 'Store-Inspektor',
    events: 'Event-Tester',
    config: 'Statische Konfiguration',
  },
  eventTester: {
    title: 'Event-Bus-Tester',
    commonEvents: 'Häufige Events',
    eventTypeLabel: 'Event-Typ',
    payloadLabel: 'Payload (JSON)',
    dispatch: 'Event versenden',
  },
  eventHistory: {
    title: 'Event-Historie',
    enable: 'Aufzeichnung der Event-Historie aktivieren',
    clear: 'Historie löschen',
    table: {
      timestamp: 'Zeitstempel',
      type: 'Typ',
      payload: 'Payload',
    },
    empty: 'Noch keine Events erfasst...',
    disabled: 'Die Aufzeichnung der Event-Historie ist deaktiviert.',
  },
  storeInspector: {
    runtime: 'Runtime-Store',
    monitoring: 'Monitoring-Store',
    painPreferences: 'Schmerz-Präferenzen-Store',
    achievements: 'Erfolge-Store',
    userPreferences: 'Benutzerpräferenzen-Store',
    userGrants: 'Benutzerberechtigungs-Store',
    appConfig: 'App-Konfiguration',
  },
};
