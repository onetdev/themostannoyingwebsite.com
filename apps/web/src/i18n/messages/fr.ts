import achievements from '@/features/achievements/i18n/fr';
import auth from '@/features/auth/i18n/fr';
import humanVerification from '@/features/captcha/i18n/fr';
import comments from '@/features/comments/i18n/fr';
import commentVariants from '@/features/comments/i18n/generator/fr';
import content from '@/features/content/i18n/fr';
import disruptions from '@/features/disruptions/i18n/fr';
import funding from '@/features/funding/i18n/fr';
import marketing from '@/features/marketing/i18n/fr';
import monitoring from '@/features/monitoring/i18n/fr';
import subscription from '@/features/subscription/i18n/fr';
import support from '@/features/support/i18n/fr';
import user from '@/features/user/i18n/fr';
import common from './common/fr';
import metadata from './metadata/fr';

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
    title: 'Le site le plus agaçant',
    description:
      'Le site autoproclamé le plus agaçant du web, avec tellement de fonctionnalités dégoûtantes des sites modernes que vous pourriez même finir par vomir.',
    recruiting:
      'Vous voulez étendre ce que vous voyez ici ? Visitez notre dépôt <linkTag>GitHub</linkTag> pour commencer.',
    aiDisclose:
      "Ce site utilise l'IA générative pour le contenu créatif et les médias. Toute ressemblance avec des informations utiles est purement fortuite.",
    copyright: '© {year} Le site le plus agaçant. Tous droits réservés.',
    dataStorageDisclaimer:
      "La confidentialité d'abord : nous ne conservons pas les entrées de formulaires sensibles ou les identifiants des utilisateurs.",
    noWarranties:
      'Fourni "en l\'état" sans garantie. Nous ne sommes pas responsables de votre temps perdu ou de votre frustration.',
    translationDisclaimer:
      'Ce document est une traduction de la version officielle en anglais. En cas de divergence, la version anglaise prévaudra. Vous pouvez trouver la version officielle <linkTag>ici</linkTag>.',
    cookieConsent:
      "Ce site utilise des cookies pour vous garantir la meilleure expérience possible. C'est aussi une blague, donc beaucoup de fonctionnalités sont buggées ou ne fonctionnent pas exprès. Vous pouvez personnaliser votre expérience et vos paramètres de cookies dans le menu des paramètres.",
    exitPrompt:
      'Je reconsidérerais mon départ avant que des choses désagréables ne vous arrivent. Êtes-vous sûr ?',
    readMoreAt: 'Lire la suite sur',
    virgin: {
      title: 'Désactiver toutes les expériences',
      description:
        "Toutes les expériences sont maintenant désactivées. Si vous voulez partager cette page juste pour le contenu, faites simplement passer cette URL. Si vous changez d'avis, vous pouvez réactiver toutes les expériences dans le menu des paramètres.",
    },
    toggleMenu: 'Basculer le menu',
    logo: 'Logo MAW',
    logoAlt: '<the>le</the> <most>Plus</most> Agaçant Site Web',
    dismissBanner: 'Fermer la bannière',
    contactForm: {
      title: 'Formulaire de contact officiel',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer',
      placeholderSubject: "De quoi s'agit-il ?",
      placeholderMessage: 'Tapez votre message ici...',
      alternative:
        'Alternativement, vous pouvez nous contacter directement à <linkTag>{email}</linkTag>',
      intro:
        "N'hésitez pas à nous contacter si vous avez des questions ou des commentaires.",
      reportIssues:
        'Si vous rencontrez des problèmes techniques ou si vous voulez suggérer de nouveaux points de douleur, veuillez <linkTag>les signaler sur GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    donate: 'Faire un don',
    login: 'Connexion',
    logout: 'Déconnexion',
    signup: "S'inscrire",
    passwordReminder: 'Rappel de mot de passe',
    profile: 'Profil',
    settings: 'Paramètres',
    search: 'Rechercher',
    privacyPolicy: 'Politique de confidentialité',
    hotThings: 'Trucs chauds',
    dilf: 'DILF',
    plans: 'Plans IA',
    personal: 'Personnel',
    achievements: 'Hauts faits',
    admin: 'Admin',
    termsOfUse: 'Conditions d’utilisation',
  },
  userField: {
    consentNewsletter: 'Je souhaite recevoir la newsletter',
    consentPrivacyPolicy: 'Accepter la politique de confidentialité',
    consentChildSoul: "L'âme de mon premier-né",
    countryCode: 'Pays',
    dateOfBirth: 'Date de naissance',
    dateOfBirthYear: 'Année',
    dateOfBirthMonth: 'Mois',
    dateOfBirthDay: 'Jour',
    email: 'Email',
    firstName: 'Prénom',
    gender: 'Genre',
    lastName: 'Nom',
    nickname: 'Pseudo',
    password: 'Mot de passe',
    passwordStrength: 'Force du mot de passe',
    passwordConfirmation: 'Confirmation du mot de passe',
    phoneNumber: 'Numéro de téléphone',
    phoneNumberCountryCode: 'Code pays',
    phoneNumberAreaCode: 'Code régional',
    phoneNumberDecrease: 'Diminuer le numéro de téléphone',
    phoneNumberIncrease: 'Augmenter le numéro de téléphone',
    rememberMe: 'Se souvenir de moi',
    username: "Nom d'utilisateur",
  },
  gender: {
    alien: 'Alien',
    chymera: 'Chimère',
    cyborg: 'Cyborg',
    female: 'Femme',
    male: 'Homme',
    other: 'Autre',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Partager cette page',
      description:
        "Répandez la misère ! Assurez-vous d'infliger ce site web douloureusement odieux à vos amis aussi — pourquoi souffrir seul quand on peut les entraîner avec soi ?",
    },
  },
  messages: {
    errors: {
      e404title: 'Erreur 404',
      e404description: 'Page non trouvée, comment cela a-t-il pu arriver',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Hé, vous ne pouvez pas faire de clic droit ici !',
  },
  language: {
    label: 'Langue',
  },
  themeSwitch: {
    label: 'Changer de thème',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
  },
} satisfies DeepPartial<AppTranslationShape>;
