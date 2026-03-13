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
      visualChaos: 'Caos visual',
      uiSabotage: 'Sabotaje de la interfaz',
      interruptions: 'Interrupciones',
      browserHijacking: 'Secuestro del navegador',
    },
    achievementNotifications: {
      label: 'Notificaciones de logros',
      hint: 'Muestra una notificación cada vez que desbloqueas un nuevo logro. El progreso siempre se rastrea en segundo plano.',
    },
    backgroundAdflaps: {
      label: 'Solapas de anuncios de fondo',
      hint: 'Muestra solapas publicitarias en los laterales de la página que se pueden hacer clic y conducen a páginas de marketing.',
    },
    clipboardBrandingMark: {
      label: 'Marca de branding en el portapapeles',
      hint: 'Agrega un enlace "Leer más en..." cuando copias texto del sitio web.',
    },
    contentPaywall: {
      label: 'Muro de pago de contenido',
      hint: 'Muestra una superposición de muro de pago falso en algunos contenidos, aún puedes revelar el contenido de forma gratuita.',
    },
    deadPixel: {
      label: 'Píxel muerto',
      hint: 'Coloca algunos píxeles "muertos" falsos en tu pantalla para molestarte.',
    },
    detectAdblocker: {
      label: 'Detectar bloqueador de anuncios',
      hint: 'Muestra un gran banner rojo si se detecta un bloqueador de anuncios.',
    },
    disableContextMenu: {
      label: 'Deshabilitar menú contextual (clic derecho)',
      hint: 'Te impide usar el menú de clic derecho y muestra una alerta en su lugar.',
    },
    exitPrompt: {
      label: 'Aviso de salida',
      hint: 'Muestra un aviso "¿Estás seguro de que quieres irte?" al intentar cerrar la pestaña o navegar fuera.',
    },
    flaimAPHoneAd: {
      label: 'Campaña de encuesta telefónica Flaim',
      hint: 'Muestra un anuncio animado funky en la página de inicio que conduce a Flaim a Phone.',
    },
    historySpam: {
      label: 'Spam de historial',
      hint: 'Llena el historial de tu navegador con entradas falsas para que no puedas volver atrás fácilmente. Esto puede hacer que sea inconveniente volver a los resultados del motor de búsqueda.',
    },
    mockSupportChat: {
      label: 'Chat de soporte simulado',
      hint: 'Muestra una molesta burbuja de chat de soporte "humano" que solo te envía mensajes cuando la cierras.',
    },
    newsletterModal: {
      label: 'Modal emergente de boletín',
      hint: 'Muestra periódicamente un modal de suscripción al boletín, especialmente cuando la página vuelve de la inactividad (cambio de pestañas).',
    },
    notifications: {
      label: 'Notificaciones',
      hint: 'Solicita permisos de notificación y muestra notificaciones falsas.',
    },
    pageTitleInactiveArrayPaged: {
      label: 'Título alterno cuando la pestaña está inactiva',
      hint: 'Cambia el título de la pestaña a algo llamativo cuando la pestaña está inactiva.',
    },
    searchDelay: {
      label: 'Retraso de búsqueda artificial',
      hint: 'Agrega un retraso de carga falso y largo a todas las búsquedas.',
    },
    stickyVideoPlayer: {
      label: 'Reproductor de video flotante',
      hint: 'Muestra un reproductor de video pegajoso que te sigue mientras te desplazas.',
    },
    wheelOfFortune: {
      label: 'Rueda de la fortuna',
      hint: 'Muestra un modal falso de "Rueda de la Fortuna" que te da premios absolutamente inútiles.',
    },
    screensaver: {
      label: 'Protector de pantalla',
      hint: 'Activa un protector de pantalla seleccionado por el usuario después del período especificado de inactividad total.',
      variant: {
        label: 'Variante',
        options: {
          bouncingLogo: 'Logotipo Rebotante',
          maze: 'Laberinto 3D 95',
        },
      },
      timer: {
        label: 'Tiempo de espera',
        options: {
          15: '15 segundos',
          30: '30 segundos',
          60: '1 minuto',
          300: '5 minutos',
          900: '15 minutos',
        },
      },
    },
  },
  mandatoryExperienceFlags: {
    title: 'Experiencia obligatoria',
    dilf: 'Donut que me gustaría devorar',
    fakeAiSubscription: 'Planes de suscripción de IA falsos',
    fakeComments: 'Comentarios falsos',
    flaimYourPhone: 'Reclama tu teléfono',
    impossibleLogin: 'Inicio de sesión imposible',
    impossiblePasswordReminder: 'Recordatorio de contraseña imposible',
    impossibleSignup: 'Registro imposible',
    madeUpNewsletter: 'Promoción de boletín premium inventada',
    unreasonableContent: 'Contenido irrazonable',
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
      rating: 'Evaluación del dolor',
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
