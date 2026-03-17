import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'Benötigen Sie ein Konto? Hier registrieren',
    forgotPassword: 'Passwort vergessen?',
    login: 'Anmelden',
    signup: 'Registrieren',
  },
  form: {
    login: {
      genericError: 'Anmeldung fehlgeschlagen',
      callToAction: 'Anmelden',
    },
    signup: {
      genericError: 'Registrierung fehlgeschlagen',
      callToAction: 'Konto erstellen',
    },
    passwordReminder: {
      genericError: 'Passwort-Erinnerung fehlgeschlagen',
      callToAction: 'Passwort-Erinnerung senden',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'System wird gestartet...',
      systemReady: 'MAW-Admin-Sicherheitsverbindung hergestellt.',
      loginPrompt: 'Login:',
      passwordPrompt: 'Passwort:',
      invalidCredentials: 'Zugriff verweigert. Ungültige Anmeldedaten.',
      accessGranted: 'Zugriff gewährt. Willkommen zurück {username}.',
      matrixQuote: 'Jemand beobachtet dich!!! Folge dem weißen Kaninchen.',
      redirectingGeneric: 'Weiterleitung...',
      redirectingSafety: 'Ich bringe dich zurück in Sicherheit...',
    },
  },
} satisfies AuthI18nShape;
