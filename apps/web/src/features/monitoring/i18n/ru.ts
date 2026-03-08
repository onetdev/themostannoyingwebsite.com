export default {
  auth: {
    title: 'Ограниченный доступ',
    description: 'Введите пароль для доступа к панели отладки.',
    passwordLabel: 'Пароль',
    passwordPlaceholder: '••••••••',
    submit: 'Разблокировать режим отладки',
  },
  logout: 'Выйти',
  internalOnly: 'Только для внутреннего использования',
  tabs: {
    stores: 'Инспектор хранилищ',
    events: 'Тестер событий',
    config: 'Статическая конфигурация',
  },
  eventTester: {
    title: 'Тестер шины событий',
    commonEvents: 'Общие события',
    eventTypeLabel: 'Тип события',
    payloadLabel: 'Полезная нагрузка (JSON)',
    dispatch: 'Отправить событие',
  },
  eventHistory: {
    title: 'История событий',
    enable: 'Включить запись истории событий',
    clear: 'Очистить историю',
    table: {
      timestamp: 'Временная метка',
      type: 'Тип',
      payload: 'Полезная нагрузка',
    },
    empty: 'События пока не зафиксированы...',
    disabled: 'Запись истории событий отключена.',
  },
  storeInspector: {
    runtime: 'Runtime Store',
    monitoring: 'Monitoring Store',
    painPreferences: 'Pain Preferences Store',
    achievements: 'Achievements Store',
    userPreferences: 'User Preferences Store',
    userGrants: 'User Grants Store',
    appConfig: 'App Configuration',
  },
};
