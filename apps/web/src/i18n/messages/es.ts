import achievements from '@/features/achievements/i18n/es';
import auth from '@/features/auth/i18n/es';
import humanVerification from '@/features/captcha/i18n/es';
import comments from '@/features/comments/i18n/es';
import commentVariants from '@/features/comments/i18n/generator/es';
import content from '@/features/content/i18n/es';
import disruptions from '@/features/disruptions/i18n/es';
import funding from '@/features/funding/i18n/es';
import marketing from '@/features/marketing/i18n/es';
import monitoring from '@/features/monitoring/i18n/es';
import subscription from '@/features/subscription/i18n/es';
import support from '@/features/support/i18n/es';
import user from '@/features/user/i18n/es';
import common from './common/es';
import metadata from './metadata/es';

export default {
  // Feature or externals
  achievements,
  auth,
  comments,
  commentVariants,
  common,
  content,
  disruptions,
  funding,
  humanVerification,
  marketing,
  metadata,
  monitoring,
  subscription,
  support,
  user,

  // App level, shared translations
  app: {
    title: 'El Sitio Web Más Molesto',
    description:
      'El autoproclamado sitio web más molesto de la web con tantas características repugnantes de los sitios web modernos que incluso podrías vomitar en algún momento.',
    recruiting:
      '¿Quieres extender lo que ves aquí? Visita nuestro repositorio de <linkTag>GitHub</linkTag> para comenzar.',
    aiDisclose:
      'Este sitio web utiliza IA generativa para contenido creativo y medios. Cualquier parecido con información útil es puramente coincidental.',
    copyright:
      '© {year} El Sitio Web Más Molesto. Todos los derechos reservados.',
    dataStorageDisclaimer:
      'Privacidad Primero: No persistimos entradas de formulario sensibles o credenciales de usuario.',
    noWarranties:
      'Proporcionado "tal cual" sin garantía. No somos responsables de tu tiempo perdido o frustración.',
    translationDisclaimer:
      'Este documento es una traducción de la versión oficial en inglés. En caso de cualquier discrepancia, la versión en inglés prevalecerá. Puedes encontrar la versión oficial <linkTag>aquí</linkTag>.',
    cookieConsent:
      'Este sitio web utiliza cookies para asegurar que obtengas la mejor experiencia en nuestro sitio web. También es una broma, así que muchas de las características tienen errores o ni siquiera funcionan a propósito. Puedes personalizar tu experiencia y configuración de cookies en el menú de configuración.',
    exitPrompt:
      'Reconsideraría irme antes de que te sucedan cosas malas. ¿Estás seguro?',
    readMoreAt: 'Lee más en',
    virgin: {
      title: 'Deshabilitar todas las experiencias',
      description:
        'Todas las experiencias están deshabilitadas ahora. Si quieres compartir esta página solo por el contenido, simplemente pasa esta URL. Si cambiaste de opinión, puedes volver a habilitar todas las experiencias en el menú de configuración.',
    },
    toggleMenu: 'Alternar menú',
    logo: 'Logotipo MAW',
    logoAlt: '<the>el</the> <most>Sitio Web Más</most> Molesto',
    dismissBanner: 'Descartar banner',
    contactForm: {
      title: 'Formulario de contacto oficial',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar',
      placeholderSubject: '¿De qué se trata esto?',
      placeholderMessage: 'Escribe tu mensaje aquí...',
      alternative:
        'Alternativamente, puedes contactarnos directamente en <linkTag>{email}</linkTag>',
      intro:
        'Siéntete libre de contactarnos si tienes alguna pregunta o comentario.',
      reportIssues:
        'Si encuentras algún problema técnico o quieres sugerir nuevos puntos de dolor, por favor <linkTag>repórtalos en GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    donate: 'Donar',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    signup: 'Registrarse',
    passwordReminder: 'Recordatorio de contraseña',
    profile: 'Perfil',
    settings: 'Configuración',
    search: 'Buscar',
    privacyPolicy: 'Política de Privacidad',
    hotThings: 'Cosas calientes',
    dilf: 'DILF',
    plans: 'Planes de IA',
    personal: 'Personal',
    achievements: 'Logros',
    admin: 'Administración',
    termsOfUse: 'Términos de uso',
    onlySpams: 'OnlySpams',
    virgin: 'Virgin',
    flaimAPhone: '¡Feclama un teléfono!',
  },
  userField: {
    consentNewsletter: 'Quiero recibir boletín',
    consentPrivacyPolicy: 'Aceptar política de privacidad',
    consentTermsOfUse: 'Aceptar términos de uso',
    consentChildSoul: 'El alma de mi primer hijo',
    countryCode: 'País',
    dateOfBirth: 'Fecha de nacimiento',
    dateOfBirthYear: 'Año',
    dateOfBirthMonth: 'Mes',
    dateOfBirthDay: 'Día',
    email: 'Correo electrónico',
    firstName: 'Nombre',
    gender: 'Género',
    lastName: 'Apellido',
    nickname: 'Apodo',
    password: 'Contraseña',
    passwordStrength: 'Fuerza de la contraseña',
    passwordConfirmation: 'Confirmación de contraseña',
    phoneNumber: 'Número de teléfono',
    phoneNumberCountryCode: 'Código de país',
    phoneNumberAreaCode: 'Código de área',
    phoneNumberDecrease: 'Disminuir número de teléfono',
    phoneNumberIncrease: 'Aumentar número de teléfono',
    rememberMe: 'Recuérdame',
    username: 'Nombre de usuario',
  },
  gender: {
    alien: 'Alien',
    chymera: 'Quimera',
    cyborg: 'Cyborg',
    female: 'Femenino',
    male: 'Masculino',
    other: 'Otro',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Compartir esta página',
      description:
        '¡Difunde la miseria! Asegúrate de infligir este sitio web dolorosamente odioso a tus amigos también — ¿por qué sufrir solo cuando puedes arrastrarlos contigo?',
    },
  },
  messages: {
    errors: {
      e404title: 'Error 404',
      e404description: 'Página no encontrada, ¿cómo pudo pasar esto?',
    },
    info: {},
  },
  contextMenu: {
    disabled: '¡Oye, no puedes hacer clic derecho aquí!',
  },
  language: {
    label: 'Idioma',
  },
  themeSwitch: {
    label: 'Cambiar tema',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
  },
};
