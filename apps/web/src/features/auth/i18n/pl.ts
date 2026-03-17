import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'Potrzebujesz konta? Zarejestruj się tutaj',
    forgotPassword: 'Zapomniałeś hasła?',
    login: 'Logowanie',
    signup: 'Rejestracja',
  },
  form: {
    login: {
      genericError: 'Logowanie nie powiodło się',
      callToAction: 'Zaloguj się',
    },
    signup: {
      genericError: 'Rejestracja nie powiodło się',
      callToAction: 'Utwórz moje konto',
    },
    passwordReminder: {
      genericError: 'Przypomnienie hasła nie powiodło się',
      callToAction: 'Wyślij przypomnienie hasła',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'Uruchamianie systemu...',
      systemReady: 'Ustanowiono bezpieczne połączenie administracyjne MAW.',
      loginPrompt: 'login:',
      passwordPrompt: 'hasło:',
      invalidCredentials:
        'Odmowa dostępu. Nieprawidłowe dane uwierzytelniające.',
      accessGranted: 'Dostęp przyznany. Witaj ponownie {username}.',
      matrixQuote: 'Ktoś Cię obserwuje!!! Podążaj za białym królikiem.',
      redirectingGeneric: 'Przekierowywanie...',
      redirectingSafety: 'Zabieram Cię z powrotem w bezpieczne miejsce...',
    },
  },
} satisfies AuthI18nShape;
