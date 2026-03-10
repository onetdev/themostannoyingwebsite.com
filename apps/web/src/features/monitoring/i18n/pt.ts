export default {
  auth: {
    title: 'Acesso Restrito',
    description:
      'Introduza a palavra-passe para aceder ao painel de depuração.',
    passwordLabel: 'Palavra-passe',
    passwordPlaceholder: '••••••••',
    submit: 'Desbloquear Modo de Depuração',
  },
  logout: 'Sair',
  internalOnly: 'Apenas para Uso Interno',
  tabs: {
    stores: 'Inspetor de Stores',
    events: 'Testador de Eventos',
    config: 'Configuração Estática',
  },
  eventTester: {
    title: 'Testador de Barramento de Eventos',
    commonEvents: 'Eventos Comuns',
    eventTypeLabel: 'Tipo de evento',
    payloadLabel: 'Payload (JSON)',
    dispatch: 'Despachar Evento',
  },
  eventHistory: {
    title: 'Histórico de Eventos',
    enable: 'Ativar Registo de Histórico de Eventos',
    clear: 'Limpar Histórico',
    table: {
      timestamp: 'Timestamp',
      type: 'Tipo',
      payload: 'Payload',
    },
    empty: 'Nenhum evento capturado ainda...',
    disabled: 'O registo do histórico de eventos está desativado.',
  },
  storeInspector: {
    runtime: 'Store de Runtime',
    monitoring: 'Store de Monitorização',
    painPreferences: 'Store de Preferências de Dor',
    achievements: 'Store de Conquistas',
    userPreferences: 'Store de Preferências de Utilizador',
    userGrants: 'Store de Permissões de Utilizador',
    appConfig: 'Configuração da App',
  },
};
