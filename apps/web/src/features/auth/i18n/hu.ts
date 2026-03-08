import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'Nincs még fiókod? Regisztrálj itt',
    forgotPassword: 'Elfelejtetted a jelszavad?',
    login: 'Belépés',
    signup: 'Regisztráció',
  },
  form: {
    login: {
      genericError: 'A belépés sikertelen',
      callToAction: 'Belépés',
    },
    signup: {
      genericError: 'A regisztráció sikertelen',
      callToAction: 'Fiók létrehozása',
    },
    passwordReminder: {
      genericError: 'A jelszó emlékeztető sikertelen',
      callToAction: 'Jelszó emlékeztető küldése',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'Rendszer betöltése...',
      systemReady: 'MAW admin biztonságos kapcsolat létrejött.',
      loginPrompt: 'belépés:',
      passwordPrompt: 'jelszó:',
      invalidCredentials:
        'Hozzáférés megtagadva. Érvénytelen hitelesítő adatok.',
      accessGranted: 'Hozzáférés megadva. Üdvözöljük újra, {username}.',
      matrixQuote: 'Valaki figyel téged!!! Kövesd a fehér nyulat.',
      redirectingGeneric: 'Átirányítás...',
      redirectingSafety: 'Visszaviszlek a biztonságba...',
    },
  },
} satisfies AuthI18nShape;
