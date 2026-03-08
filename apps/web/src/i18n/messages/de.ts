import achievements from '@/features/achievements/i18n/de';
import auth from '@/features/auth/i18n/de';
import humanVerification from '@/features/captcha/i18n/de';
import comments from '@/features/comments/i18n/de';
import commentVariants from '@/features/comments/i18n/generator/de';
import content from '@/features/content/i18n/de';
import disruptions from '@/features/disruptions/i18n/de';
import funding from '@/features/funding/i18n/de';
import marketing from '@/features/marketing/i18n/de';
import monitoring from '@/features/monitoring/i18n/de';
import subscription from '@/features/subscription/i18n/de';
import support from '@/features/support/i18n/de';
import user from '@/features/user/i18n/de';
import common from './common/de';
import metadata from './metadata/de';

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
    title: 'Die nervigste Website',
    description:
      'Selbsternannte nervigste Website im Netz mit so vielen ekelhaften Funktionen moderner Websites, dass Sie sich an einem gewissen Punkt vielleicht sogar übergeben müssen.',
    recruiting:
      'Möchten Sie das, was Sie hier sehen, erweitern? Besuchen Sie unser <linkTag>GitHub</linkTag>-Repo, um loszulegen.',
    aiDisclose:
      'Diese Website nutzt generative KI für kreative Inhalte und Medien. Jede Ähnlichkeit mit hilfreichen Informationen ist rein zufällig.',
    copyright: '© {year} Die nervigste Website. Alle Rechte vorbehalten.',
    dataStorageDisclaimer:
      'Privatsphäre zuerst: Wir speichern keine sensiblen Formulareingaben oder Benutzeranmeldedaten.',
    noWarranties:
      'Bereitgestellt "wie besehen" ohne Gewährleistung. Wir sind nicht verantwortlich für Ihre verlorene Zeit oder Frustration.',
    privacyPolicyDisclaimer:
      'Dieses Dokument ist eine Übersetzung der offiziellen englischen Version. Im Falle von Unstimmigkeiten ist die englische Version maßgebend. Die offizielle Version finden Sie <linkTag>hier</linkTag>.',
    cookieConsent:
      "Diese Website verwendet Cookies, um sicherzustellen, dass Sie das beste Erlebnis auf unserer Website haben. Es ist auch ein Witz, daher sind viele Funktionen fehlerhaft oder funktionieren absichtlich nicht. Sie können Ihr Erlebnis und Ihre Cookie-Einstellungen im Einstellungsmenü anpassen.",
    exitPrompt:
      "Ich würde es mir noch einmal überlegen, bevor Ihnen etwas Schlimmes passiert. Sind Sie sicher?",
    readMoreAt: 'Mehr lesen bei',
    virgin: {
      title: 'Alle Erlebnisse deaktivieren',
      description:
        'Alle Erlebnisse sind jetzt deaktiviert. Wenn Sie diese Seite nur für den Inhalt teilen möchten, geben Sie einfach diese URL weiter. Wenn Sie es sich anders überlegt haben, können Sie alle Erlebnisse im Einstellungsmenü wieder aktivieren.',
    },
    toggleMenu: 'Menü umschalten',
    logo: 'MAW-Logo',
    logoAlt: '<the>die</the> <most>nervigste</most> Website',
    dismissBanner: 'Banner schließen',
    contactForm: {
      title: 'Offizielles Kontaktformular',
      subject: 'Betreff',
      message: 'Nachricht',
      send: 'Senden',
      placeholderSubject: 'Worum geht es?',
      placeholderMessage: 'Geben Sie hier Ihre Nachricht ein...',
      alternative:
        'Alternativ können Sie uns direkt unter <linkTag>{email}</linkTag> erreichen',
      intro: 'Kontaktieren Sie uns gerne, wenn Sie Fragen oder Feedback haben.',
      reportIssues:
        'Wenn Sie auf technische Probleme stoßen oder neue Schmerzpunkte vorschlagen möchten, <linkTag>melden Sie diese bitte auf GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Startseite',
    about: 'Über uns',
    contact: 'Kontakt',
    donate: 'Spenden',
    login: 'Anmelden',
    logout: 'Abmelden',
    signup: 'Registrieren',
    passwordReminder: 'Passworterinnerung',
    profile: 'Profil',
    settings: 'Einstellungen',
    search: 'Suche',
    privacyPolicy: 'Datenschutzerklärung',
    hotThings: 'Heiße Sachen',
    dilf: 'DILF',
    plans: 'KI-Pläne',
    personal: 'Persönlich',
    achievements: 'Errungenschaften',
  },
  userField: {
    consentNewsletter: 'Ich möchte den Newsletter erhalten',
    consentPrivacyPolicy: 'Datenschutzerklärung akzeptieren',
    consentChildSoul: "Die Seele meines erstgeborenen Kindes",
    countryCode: 'Land',
    dateOfBirth: 'Geburtsdatum',
    dateOfBirthYear: 'Jahr',
    dateOfBirthMonth: 'Monat',
    dateOfBirthDay: 'Tag',
    email: 'E-Mail',
    firstName: 'Vorname',
    gender: 'Geschlecht',
    lastName: 'Nachname',
    nickname: 'Spitzname',
    password: 'Passwort',
    passwordStrength: 'Passwortstärke',
    passwordConfirmation: 'Passwortbestätigung',
    phoneNumber: 'Telefonnummer',
    phoneNumberCountryCode: 'Ländervorwahl',
    phoneNumberAreaCode: 'Ortsvorwahl',
    phoneNumberDecrease: 'Telefonnummer verringern',
    phoneNumberIncrease: 'Telefonnummer erhöhen',
    rememberMe: 'Angemeldet bleiben',
    username: 'Benutzername',
  },
  gender: {
    alien: 'Außerirdischer',
    chymera: 'Chimäre',
    cyborg: 'Cyborg',
    female: 'Weiblich',
    male: 'Männlich',
    other: 'Andere',
    robot: 'Roboter',
  },
  share: {
    modal: {
      title: 'Diese Seite teilen',
      description:
        'Verbreiten Sie das Elend! Stellen Sie sicher, dass Sie diese quälend unausstehliche Website auch Ihren Freunden aufzwingen – warum alleine leiden, wenn Sie sie mit in den Abgrund reißen können?',
    },
  },
  messages: {
    errors: {
      e404title: 'Fehler 404',
      e404description: 'Seite nicht gefunden, wie konnte das nur passieren',
    },
    info: {},
  },
  contextMenu: {
    disabled: "Hey, hier kannst du nicht rechtsklicken!",
  },
  language: {
    label: 'Sprache',
    option: {
      ar: 'Arabisch',
      de: 'Deutsch',
      en: 'Englisch',
      es: 'Spanisch',
      fr: 'Französisch',
      hi: 'Hindi',
      hu: 'Ungarisch',
      it: 'Italienisch',
      ja: 'Japanisch',
      ko: 'Koreanisch',
      pl: 'Polnisch',
      pt: 'Portugiesisch',
      ru: 'Russisch',
      tr: 'Türkisch',
      zh: 'Chinesisch',
    },
  },
  themeSwitch: {
    label: 'Thema wechseln',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
  },
};
