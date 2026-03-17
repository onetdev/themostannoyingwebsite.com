import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'Serve un account? Registrati qui',
    forgotPassword: 'Password dimenticata?',
    login: 'Accedi',
    signup: 'Registrati',
  },
  form: {
    login: {
      genericError: 'Accesso fallito',
      callToAction: 'Accedi',
    },
    signup: {
      genericError: 'Registrazione fallita',
      callToAction: 'Crea il mio account',
    },
    passwordReminder: {
      genericError: 'Promemoria password fallito',
      callToAction: 'Invia promemoria password',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'Avvio del sistema...',
      systemReady: 'Connessione sicura admin MAW stabilita.',
      loginPrompt: 'login:',
      passwordPrompt: 'password:',
      invalidCredentials: 'Accesso negato. Credenziali non valide.',
      accessGranted: 'Accesso consentito. Benvenuto {username}.',
      matrixQuote: 'Qualcuno ti sta guardando!!! Segui il bianconiglio.',
      redirectingGeneric: 'Reindirizzamento...',
      redirectingSafety: 'Ti riporto al sicuro...',
    },
  },
} satisfies AuthI18nShape;
