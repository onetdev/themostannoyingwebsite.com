export default {
  auth: {
    title: 'Acceso Restringido',
    description: 'Ingresa la contraseña para acceder al panel de depuración.',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',
    submit: 'Desbloquear Modo Depuración',
  },
  logout: 'Cerrar sesión',
  internalOnly: 'Solo Uso Interno',
  tabs: {
    stores: 'Inspector de Tienda',
    events: 'Probador de Eventos',
    config: 'Configuración Estática',
  },
  eventTester: {
    title: 'Probador de Bus de Eventos',
    commonEvents: 'Eventos Comunes',
    eventTypeLabel: 'Tipo de evento',
    payloadLabel: 'Carga útil (JSON)',
    dispatch: 'Despachar Evento',
  },
  eventHistory: {
    title: 'Historial de Eventos',
    enable: 'Habilitar Grabación de Historial de Eventos',
    clear: 'Borrar Historial',
    table: {
      timestamp: 'Marca de tiempo',
      type: 'Tipo',
      payload: 'Carga útil',
    },
    empty: 'No se han capturado eventos todavía...',
    disabled: 'La grabación del historial de eventos está deshabilitada.',
  },
  storeInspector: {
    runtime: 'Tienda en Tiempo de Ejecución',
    monitoring: 'Tienda de Monitoreo',
    painPreferences: 'Tienda de Preferencias de Dolor',
    achievements: 'Tienda de Logros',
    userPreferences: 'Tienda de Preferencias de Usuario',
    userGrants: 'Tienda de Permisos de Usuario',
    appConfig: 'Configuración de la Aplicación',
  },
};
