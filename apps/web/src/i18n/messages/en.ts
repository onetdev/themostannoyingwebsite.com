import achievements from '@/features/achievements/i18n/en';
import auth from '@/features/auth/i18n/en';
import humanVerification from '@/features/captcha/i18n/en';
import comments from '@/features/comments/i18n/en';
import commentVariants from '@/features/comments/i18n/generator/en';
import content from '@/features/content/i18n/en';
import disruptions from '@/features/disruptions/i18n/en';
import funding from '@/features/funding/i18n/en';
import marketing from '@/features/marketing/i18n/en';
import monitoring from '@/features/monitoring/i18n/en';
import subscription from '@/features/subscription/i18n/en';
import support from '@/features/support/i18n/en';
import user from '@/features/user/i18n/en';
import common from './common/en';
import metadata from './metadata/en';

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
      'Self-proclaimed most annoying website on the web with so many disgusting features of modern websites you might even vomit at some point.',
    recruiting:
      'Want to extend what you see here? Visit our <linkTag>GitHub</linkTag> repo to get started.',
    aiDisclose:
      'This website utilizes generative AI for creative content and media. Any resemblance to helpful information is purely coincidental.',
    copyright: '© {year} The Most Annoying Website. All rights reserved.',
    dataStorageDisclaimer:
      'Privacy First: We do not persist sensitive form inputs or user credentials.',
    noWarranties:
      'Provided "as is" without warranty. We are not responsible for your lost time or frustration.',
    translationDisclaimer:
      'This document is a translation of the official English version. In case of any discrepancy, the English version shall prevail. You can find the official version <linkTag>here</linkTag>.',
    cookieConsent:
      "This website uses cookies to ensure you get the best experience on our website. It's also a joke so many of the features are buggy or doens't even work on purpose. You can customize your experience and cookie settings in the settings menu.",
    exitPrompt:
      "I'd reconsider leaving before some bad things happend to you. Are you sure?",
    readMoreAt: 'Read more at',
    virgin: {
      title: 'Disable all experiences',
      description:
        'All experiences are disabled now. If you want share this page just for the content just pass this URL around. If you changed your mind, you can re-enable all experiences in the settings menu.',
    },
    toggleMenu: 'Toggle menu',
    logo: 'MAW Logo',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: 'Dismiss banner',
    contactForm: {
      title: 'Official contact form',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      placeholderSubject: 'What is this about?',
      placeholderMessage: 'Type your message here...',
      alternative:
        'Alternatively, you can reach us directly at <linkTag>{email}</linkTag>',
      intro: 'Feel free to contact us if you have any questions or feedback.',
      reportIssues:
        'If you encounter any technical issues or want to suggest new pain points, please <linkTag>report them on GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    donate: 'Donate',
    login: 'Login',
    logout: 'Logout',
    signup: 'Signup',
    passwordReminder: 'Password Reminder',
    profile: 'Profile',
    settings: 'Settings',
    search: 'Search',
    privacyPolicy: 'Privacy Policy',
    hotThings: 'Hot things',
    dilf: 'DILF',
    plans: 'AI plans',
    personal: 'Personal',
    achievements: 'Achievements',
    admin: 'Admin',
    termsOfUse: 'Terms of Use',
  },
  userField: {
    consentNewsletter: 'I want to receive newsletter',
    consentPrivacyPolicy: 'Accept privacy policy',
    consentChildSoul: "My first born child's soul",
    countryCode: 'Country',
    dateOfBirth: 'Date of birth',
    dateOfBirthYear: 'Year',
    dateOfBirthMonth: 'Month',
    dateOfBirthDay: 'Day',
    email: 'Email',
    firstName: 'First name',
    gender: 'Gender',
    lastName: 'Last name',
    nickname: 'Nickname',
    password: 'Password',
    passwordStrength: 'Password strength',
    passwordConfirmation: 'Password confirmation',
    phoneNumber: 'Phone number',
    phoneNumberCountryCode: 'Country code',
    phoneNumberAreaCode: 'Area code',
    phoneNumberDecrease: 'Decrease phone number',
    phoneNumberIncrease: 'Increase phone number',
    rememberMe: 'Remember me',
    username: 'Username',
  },
  gender: {
    alien: 'Alien',
    chymera: 'Chymera',
    cyborg: 'Cyborg',
    female: 'Female',
    male: 'Male',
    other: 'Other',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Share this page',
      description:
        'Spread the misery! Be sure to inflict this painfully obnoxious website on your friends too — why suffer alone when you can drag them down with you?',
    },
  },
  messages: {
    errors: {
      e404title: 'Error 404',
      e404description: 'Page not found, how could this happen',
    },
    info: {},
  },
  contextMenu: {
    disabled: "Hey, you can't right click here!",
  },
  language: {
    label: 'Language',
  },
  themeSwitch: {
    label: 'Switch theme',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
  },
};
