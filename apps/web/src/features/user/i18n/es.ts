export default {
  userPreferences: {
    title: 'Preferencias',
    colorScheme: 'Tema / Esquema de color',
    darkMode: 'Modo oscuro',
    reducedMotion: 'Movimiento reducido',
    reducedMotionHelp:
      'Se puede cambiar en la configuración de tu SO/Navegador, es posible que debas recargar la página después de cambiarlo.',
    enableSound: 'Sonido',
    adultFilter: 'Filtrar contenido para adultos',
  },
  userGrants: {
    title: 'Consentimiento y permisos',
    permissionDisclaimer:
      'La configuración de permisos es administrada por el navegador, si deseas cambiar el tema puedes hacerlo desde la configuración del sitio en tu navegador.',
    essentialCookies: 'Permitir cookies esenciales',
    notificationPermission: 'Permiso de notificaciones',
    locationPermission: 'Permiso de ubicación',
  },
  optionalPainPoints: {
    title: 'Puntos de dolor opcionales',
    categories: {
      browser: 'Navegador y Pestaña',
      visual: 'Obstrucciones Visuales',
      ads: 'Publicidad y Monetización',
      interactivity: 'Popups e Interactividad',
    },
    screensaverTimeout: 'Tiempo de espera',
    screensaverVariant: 'Variante',
    screensaverVariantOptions: {
      bouncingLogo: 'Logotipo Rebotante',
      maze: 'Laberinto 3D 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 segundos',
      '30': '30 segundos',
      '60': '1 minuto',
      '300': '5 minutos',
      '900': '15 minutos',
    },
    gifts: {
      detectAdblocker: 'Detectar bloqueador de anuncios',
      flaps: 'Solapas de anuncios de fondo',
      oneByOne: 'Bloques de anuncios uno por uno',
    },
    achievementNotifications: 'Notificaciones de logros',
    clipboardMarker: 'Marcador de portapapeles',
    contentPaywall: 'Muro de pago de contenido',
    deadPixel: 'Píxel muerto',
    disableContextMenu: 'Deshabilitar menú contextual (clic derecho)',
    exitPrompt: 'Aviso de salida',
    historySpam: 'Spam de historial',
    mockChat: 'Chat de burbuja',
    newsletterModal: 'Modal emergente de boletín',
    notifications: 'Notificaciones',
    screensaver: 'Protector de pantalla',
    pageTitleInactiveArrayPaged:
      'Título alternativo cuando la pestaña está inactiva',
    searchDelay: 'Retraso de búsqueda falso',
    wheelOfFortune: 'Rueda de la fortuna',
    stickyVideo: 'Video pegajoso',
  },
  optionalPainPointsHints: {
    screensaver:
      'Activa un protector de pantalla seleccionado por el usuario después del período especificado de inactividad total.',
    gifts: {
      detectAdblocker:
        'Muestra un gran banner rojo si se detecta un bloqueador de anuncios.',
      flaps:
        'Muestra solapas de anuncios en los lados de la página en las que se puede hacer clic y llevan a diferentes páginas.',
      oneByOne:
        'Cubrió principalmente un anuncio animado en la página de inicio.',
    },
    achievementNotifications:
      'Muestra una notificación cada vez que desbloqueas un nuevo logro. El progreso siempre se rastrea en segundo plano.',
    clipboardMarker:
      'Agrega un enlace "Leer más en..." cuando copias texto del sitio web.',
    contentPaywall:
      'Muestra una superposición de muro de pago falso en algún contenido, aún puedes revelar el contenido.',
    deadPixel:
      'Coloca algunos píxeles "muertos" falsos en tu pantalla para molestarte.',
    disableContextMenu:
      'Te impide usar el menú de clic derecho y muestra una alerta en su lugar.',
    exitPrompt:
      'Muestra un aviso "¿Estás seguro de que quieres irte?" al intentar cerrar la pestaña o navegar fuera.',
    historySpam:
      'Llena el historial de tu navegador con entradas falsas para que no puedas volver atrás fácilmente. Esto puede hacer que sea inconveniente volver a los resultados del motor de búsqueda.',
    mockChat:
      'Muestra una molesta burbuja de chat "humana" que solo te envía mensajes cuando la cierras y constantemente muestra "el agente está escribiendo" mientras tanto.',
    newsletterModal:
      'Muestra periódicamente un modal de suscripción al boletín, especialmente cuando la página vuelve de la inactividad (cambio de pestañas).',
    notifications:
      'Solicita permisos de notificación y muestra notificaciones falsas.',
    pageTitleInactiveArrayPaged:
      'Cambia el título de la pestaña a algo llamativo cuando la pestaña está inactiva.',
    searchDelay:
      'Agrega un retraso de carga falso y largo a todas las búsquedas.',
    wheelOfFortune:
      'Muestra un modal falso de "Rueda de la Fortuna" que te da premios absolutamente inútiles.',
    stickyVideo:
      'Muestra un reproductor de video pegajoso que te sigue mientras te desplazas.',
  },
  mandatoryExperienceFlags: {
    title: 'Experiencia obligatoria',
    impossibleLogin: 'Inicio de sesión imposible',
    impossibleSignup: 'Registro imposible',
    impossiblePasswordReminder: 'Recordatorio de contraseña imposible',
    unreasonableContent: 'Contenido irrazonable',
    flaimYourPhone: 'Reclama tu teléfono',
    fakeAiSubscription: 'Planes de suscripción de IA falsos',
  },
  runtimeInfo: {
    title: 'Sobre esta sesión',
    disclaimer:
      'La información listada a continuación sirve como información de depuración para la sesión actual del navegador (si recargas la página, todo se restablecerá). Detrás de escena, estos valores también tienen un gran impacto en qué y cómo sucede.',
    startedAgo: 'Sesión iniciada',
    visibilitySeconds: 'Tiempo pasado en foco',
    isDocumentVisible: 'Actualmente en foco',
    navigationCount: 'Conteo de navegación',
    userActivation: 'Acción inicial del usuario',
    lastActivation: 'Última actividad del usuario',
    flaimSurveyResult: 'Resultado de encuesta de reclamo',
    adblockerSuspected: 'Bloqueador de anuncios sospechado',
    adblockerNotDetected: 'Bloqueador de anuncios no detectado',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, no se supone que debas estar aquí 😡',
  },
  notification: {
    modal: {
      title: '¡Oh no, dónde está el permiso de notificación!?!',
      description:
        'Nos gustaría enviarte notificaciones a veces. Puedes dar permiso de notificación a este sitio web desde la configuración de tu navegador. ¿Podrías? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Nivel de dolor',
      railTitle: 'Riel deslizante de nivel de dolor',
      clamps: {
        from_0: 'Inocente',
        from_10: 'Es un poco extraño, ¿no?',
        from_20: 'Ligeramente molesto',
        from_30: 'Un poco maldito',
        from_40: 'Inquietante de una manera muy específica',
        from_50: 'Justo la cantidad correcta',
        from_60: 'Tolerancia superior al promedio',
        from_70: 'Pisar excremento de perro descalzo',
        from_80: 'Límite masoquista',
        from_90: '¿Pesadillas? Suscrito.',
        from_100: 'Dolor Máximo',
      },
    },
  },
};
