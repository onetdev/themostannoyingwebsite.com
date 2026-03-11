import achievements from '@/features/achievements/i18n/it';
import auth from '@/features/auth/i18n/it';
import humanVerification from '@/features/captcha/i18n/it';
import commentVariants from '@/features/comments/i18n/generator/it';
import comments from '@/features/comments/i18n/it';
import content from '@/features/content/i18n/it';
import disruptions from '@/features/disruptions/i18n/it';
import funding from '@/features/funding/i18n/it';
import marketing from '@/features/marketing/i18n/it';
import monitoring from '@/features/monitoring/i18n/it';
import subscription from '@/features/subscription/i18n/it';
import support from '@/features/support/i18n/it';
import user from '@/features/user/i18n/it';
import common from './common/it';
import metadata from './metadata/it';

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
    title: 'The Most Annoying Website',
    description:
      "L'autoproclamato sito web più fastidioso del web con così tante funzionalità disgustose dei siti web moderni che potresti persino vomitare a un certo punto.",
    recruiting:
      'Vuoi estendere ciò che vedi qui? Visita il nostro repository <linkTag>GitHub</linkTag> per iniziare.',
    aiDisclose:
      "Questo sito web utilizza l'IA generativa per contenuti creativi e media. Qualsiasi somiglianza con informazioni utili è puramente casuale.",
    copyright: '© {year} The Most Annoying Website. Tutti i diritti riservati.',
    dataStorageDisclaimer:
      'Privacy First: non conserviamo input di moduli sensibili o credenziali utente.',
    noWarranties:
      'Fornito "così com\'è" senza garanzia. Non siamo responsabili per il tuo tempo perso o la tua frustrazione.',
    translationDisclaimer:
      'Questo documento è una traduzione della versione ufficiale in inglese. In caso di discrepanza, prevarrà la versione inglese. Puoi trovare la versione ufficiale <linkTag>qui</linkTag>.',
    cookieConsent:
      'Questo sito utilizza i cookie per garantirti la migliore esperienza. È anche uno scherzo, quindi molte funzionalità sono buggate o non funzionano di proposito. Puoi personalizzare la tua esperienza e le impostazioni dei cookie nel menu delle impostazioni.',
    exitPrompt:
      "Riconsiderei l'idea di andartene prima che ti succeda qualcosa di brutto. Sei sicuro?",
    readMoreAt: 'Leggi di più su',
    virgin: {
      title: 'Disabilita tutte le esperienze',
      description:
        'Tutte le esperienze sono disabilitate ora. Se vuoi condividere questa pagina solo per il contenuto, passa pure questo URL. Se hai cambiato idea, puoi riabilitare tutte le esperienze nel menu delle impostazioni.',
    },
    toggleMenu: 'Attiva/disattiva menu',
    logo: 'Logo MAW',
    logoAlt: '<the>il</the> <most>Sito Web Più</most> Fastidioso',
    dismissBanner: 'Chiudi banner',
    contactForm: {
      title: 'Modulo di contatto ufficiale',
      subject: 'Oggetto',
      message: 'Messaggio',
      send: 'Invia',
      placeholderSubject: 'Di cosa si tratta?',
      placeholderMessage: 'Scrivi il tuo messaggio qui...',
      alternative:
        "In alternativa, puoi contattarci direttamente all'indirizzo <linkTag>{email}</linkTag>",
      intro: 'Sentiti libero di contattarci se hai domande o feedback.',
      reportIssues:
        'Se riscontri problemi tecnici o vuoi suggerire nuovi punti di dolore, per favore <linkTag>segnalali su GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Home',
    about: 'Chi siamo',
    contact: 'Contatto',
    donate: 'Dona',
    login: 'Accedi',
    logout: 'Esci',
    signup: 'Registrati',
    passwordReminder: 'Promemoria password',
    profile: 'Profilo',
    settings: 'Impostazioni',
    search: 'Cerca',
    privacyPolicy: 'Informativa sulla privacy',
    hotThings: 'Cose calde',
    dilf: 'DILF',
    plans: 'Piani IA',
    personal: 'Personale',
    achievements: 'Obiettivi',
    admin: 'Admin',
    termsOfUse: 'Termini di utilizzo',
    onlySpams: 'OnlySpams',
    virgin: 'Vergine',
    flaimAPhone: 'Riscandi un telefono!',
  },
  userField: {
    consentNewsletter: 'Voglio ricevere la newsletter',
    consentPrivacyPolicy: "Accetto l'informativa sulla privacy",
    consentTermsOfUse: 'Accetto i termini di utilizzo',
    consentChildSoul: "L'anima del mio primogenito",
    countryCode: 'Paese',
    dateOfBirth: 'Data di nascita',
    dateOfBirthYear: 'Anno',
    dateOfBirthMonth: 'Mese',
    dateOfBirthDay: 'Giorno',
    email: 'Email',
    firstName: 'Nome',
    gender: 'Genere',
    lastName: 'Cognome',
    nickname: 'Nickname',
    password: 'Password',
    passwordStrength: 'Forza della password',
    passwordConfirmation: 'Conferma password',
    phoneNumber: 'Numero di telefono',
    phoneNumberCountryCode: 'Prefisso internazionale',
    phoneNumberAreaCode: 'Prefisso locale',
    phoneNumberDecrease: 'Diminuisci numero di telefono',
    phoneNumberIncrease: 'Aumenta numero di telefono',
    rememberMe: 'Ricordami',
    username: 'Nome utente',
  },
  gender: {
    alien: 'Alieno',
    chymera: 'Chimera',
    cyborg: 'Cyborg',
    female: 'Femmina',
    male: 'Maschio',
    other: 'Altro',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Condividi questa pagina',
      description:
        'Diffondi la miseria! Assicurati di infliggere questo sito web dolorosamente odioso anche ai tuoi amici — perché soffrire da soli quando puoi trascinarli giù con te?',
    },
  },
  messages: {
    errors: {
      e404title: 'Errore 404',
      e404description: 'Pagina non trovata, come è potuto succedere',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Ehi, non puoi usare il tasto destro qui!',
  },
  language: {
    label: 'Lingua',
  },
  themeSwitch: {
    label: 'Cambia tema',
    darkMode: 'Modalità scura',
    lightMode: 'Modalità chiara',
  },
} satisfies DeepPartial<AppTranslationShape>;
