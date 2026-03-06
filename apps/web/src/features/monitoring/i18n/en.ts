export default {
  auth: {
    title: 'Restricted Access',
    description: 'Enter the password to access the debug dashboard.',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    submit: 'Unlock Debug Mode',
  },
  logout: 'Logout',
  internalOnly: 'Internal Use Only',
  tabs: {
    stores: 'Store Inspector',
    events: 'Event Tester',
    config: 'Static Config',
  },
  eventTester: {
    title: 'Event Bus Tester',
    commonEvents: 'Common Events',
    eventTypeLabel: 'Event type',
    payloadLabel: 'Payload (JSON)',
    dispatch: 'Dispatch Event',
  },
  eventHistory: {
    title: 'Event History',
    enable: 'Enable Event History Recording',
    clear: 'Clear History',
    table: {
      timestamp: 'Timestamp',
      type: 'Type',
      payload: 'Payload',
    },
    empty: 'No events captured yet...',
    disabled: 'Event history recording is disabled.',
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
