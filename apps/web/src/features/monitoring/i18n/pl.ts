export default {
  auth: {
    title: 'Ograniczony dostęp',
    description:
      'Wprowadź hasło, aby uzyskać dostęp do pulpitu nawigacyjnego debugowania.',
    passwordLabel: 'Hasło',
    passwordPlaceholder: '••••••••',
    submit: 'Odblokuj tryb debugowania',
  },
  logout: 'Wyloguj',
  internalOnly: 'Tylko do użytku wewnętrznego',
  tabs: {
    stores: 'Inspektor Magazynów',
    events: 'Tester Zdarzeń',
    config: 'Konfiguracja Statyczna',
  },
  eventTester: {
    title: 'Tester Szyny Zdarzeń',
    commonEvents: 'Typowe zdarzenia',
    eventTypeLabel: 'Typ zdarzenia',
    payloadLabel: 'Ładunek (JSON)',
    dispatch: 'Wyślij zdarzenie',
  },
  eventHistory: {
    title: 'Historia Zdarzeń',
    enable: 'Włącz rejestrowanie historii zdarzeń',
    clear: 'Wyczyść historię',
    table: {
      timestamp: 'Znacznik czasu',
      type: 'Typ',
      payload: 'Ładunek',
    },
    empty: 'Nie przechwycono jeszcze żadnych zdarzeń...',
    disabled: 'Rejestrowanie historii zdarzeń jest wyłączone.',
  },
  storeInspector: {
    runtime: 'Magazyn Runtime',
    monitoring: 'Magazyn Monitorowania',
    painPreferences: 'Magazyn Preferencji Bólu',
    achievements: 'Magazyn Osiągnięć',
    userPreferences: 'Magazyn Preferencji Użytkownika',
    userGrants: 'Magazyn Uprawnień Użytkownika',
    appConfig: 'Konfiguracja Aplikacji',
  },
};
