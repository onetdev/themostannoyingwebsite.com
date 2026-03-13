import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'एक खाता चाहिए? यहाँ साइन अप करें',
    forgotPassword: 'पासवर्ड भूल गए?',
    login: 'लॉगिन',
    signup: 'साइन अप',
  },
  form: {
    login: {
      genericError: 'लॉगिन विफल रहा',
      callToAction: 'लॉगिन करें',
    },
    signup: {
      genericError: 'साइन अप विफल रहा',
      callToAction: 'मेरा खाता बनाएं',
    },
    passwordReminder: {
      genericError: 'पासवर्ड रिमाइंडर विफल रहा',
      callToAction: 'पासवर्ड रिमाइंडर भेजें',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'सिस्टम बूट हो रहा है...',
      systemReady: 'MAW एडमिन सुरक्षित कनेक्शन स्थापित।',
      loginPrompt: 'लॉगिन:',
      passwordPrompt: 'पासवर्ड:',
      invalidCredentials: 'पहुंच अस्वीकृत। अमान्य क्रेडेंशियल।',
      accessGranted: 'पहुंच प्रदान की गई। वापस स्वागत है {username}।',
      matrixQuote: 'कोई आपको देख रहा है!!! सफेद खरगोश का पीछा करें।',
      redirectingGeneric: 'रीडायरेक्ट कर रहा है...',
      redirectingSafety: 'मैं आपको सुरक्षा की ओर वापस ले जा रहा हूँ...',
    },
  },
} satisfies AuthI18nShape;
