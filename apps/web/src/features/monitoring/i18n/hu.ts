import type { MonitoringI18nShape } from '../types';

export default {
  auth: {
    title: 'Korlátozott hozzáférés',
    description: 'Add meg a jelszót a debug felület eléréséhez.',
    passwordLabel: 'Jelszó',
    passwordPlaceholder: '••••••••',
    submit: 'Debug mód feloldása',
  },
  logout: 'Kijelentkezés',
  internalOnly: 'Csak belső használatra',
  tabs: {
    stores: 'Store ellenőrző',
    events: 'Esemény tesztelő',
    config: 'Statikus konfiguráció',
  },
  eventTester: {
    title: 'Eseménybusz tesztelő',
    commonEvents: 'Gyakori események',
    eventTypeLabel: 'Esemény típusa',
    payloadLabel: 'Payload (JSON)',
    dispatch: 'Esemény küldése',
  },
  eventHistory: {
    title: 'Eseménytörténet',
    enable: 'Eseménytörténet rögzítése',
    clear: 'Történet törlése',
    table: {
      timestamp: 'Időbélyeg',
      type: 'Típus',
      payload: 'Payload',
    },
    empty: 'Még nincsenek rögzített események...',
    disabled: 'Az eseménytörténet rögzítése ki van kapcsolva.',
  },
  storeInspector: {
    runtime: 'Runtime Store',
    monitoring: 'Monitoring Store',
    painPreferences: 'Fájdalom-beállítások Store',
    achievements: 'Eredmények Store',
    userPreferences: 'Felhasználói beállítások Store',
    userGrants: 'Hozzájárulások Store',
    appConfig: 'App konfiguráció',
  },
} satisfies MonitoringI18nShape;
