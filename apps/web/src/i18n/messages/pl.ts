import achievements from '@/features/achievements/i18n/pl';
import auth from '@/features/auth/i18n/pl';
import humanVerification from '@/features/captcha/i18n/pl';
import commentVariants from '@/features/comments/i18n/generator/pl';
import comments from '@/features/comments/i18n/pl';
import content from '@/features/content/i18n/pl';
import disruptions from '@/features/disruptions/i18n/pl';
import funding from '@/features/funding/i18n/pl';
import marketing from '@/features/marketing/i18n/pl';
import monitoring from '@/features/monitoring/i18n/pl';
import subscription from '@/features/subscription/i18n/pl';
import support from '@/features/support/i18n/pl';
import user from '@/features/user/i18n/pl';
import common from './common/pl';
import metadata from './metadata/pl';

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
      'Samozwańczo najbardziej irytująca strona w sieci, z tak wieloma obrzydliwymi funkcjami nowoczesnych stron internetowych, że w pewnym momencie możesz nawet zwymiotować.',
    recruiting:
      'Chcesz rozbudować to, co tu widzisz? Odwiedź nasze repozytorium <linkTag>GitHub</linkTag>, aby zacząć.',
    aiDisclose:
      'Ta strona wykorzystuje generatywną sztuczną inteligencję do tworzenia kreatywnych treści i mediów. Wszelkie podobieństwo do pomocnych informacji jest czysto przypadkowe.',
    copyright:
      '© {year} The Most Annoying Website. Wszelkie prawa zastrzeżone.',
    dataStorageDisclaimer:
      'Prywatność przede wszystkim: Nie przechowujemy wrażliwych danych z formularzy ani danych logowania użytkowników.',
    noWarranties:
      'Dostarczane „tak jak jest”, bez gwarancji. Nie ponosimy odpowiedzialności za Twój stracony czas ani frustrację.',
    privacyPolicyDisclaimer:
      'Ten dokument jest tłumaczeniem oficjalnej angielskiej wersji. W przypadku jakichkolwiek rozbieżności, wersja angielska jest rozstrzygająca. Oficjalną wersję znajdziesz <linkTag>tutaj</linkTag>.',
    cookieConsent:
      'Ta strona używa ciasteczek, aby zapewnić Ci jak najlepsze wrażenia. To także żart, więc wiele funkcji celowo zawiera błędy lub w ogóle nie działa. Możesz dostosować swoje wrażenia i ustawienia ciasteczek w menu ustawień.',
    exitPrompt:
      'Zastanowiłbym się nad wyjściem, zanim przydarzy Ci się coś złego. Jesteś pewien?',
    readMoreAt: 'Czytaj więcej na',
    virgin: {
      title: 'Wyłącz wszystkie doświadczenia',
      description:
        'Wszystkie doświadczenia są teraz wyłączone. Jeśli chcesz udostępnić tę stronę tylko dla treści, po prostu podaj ten URL. Jeśli zmieniłeś zdanie, możesz ponownie włączyć wszystkie doświadczenia w menu ustawień.',
    },
    toggleMenu: 'Przełącz menu',
    logo: 'Logo MAW',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: 'Zamknij baner',
    contactForm: {
      title: 'Oficjalny formularz kontaktowy',
      subject: 'Temat',
      message: 'Wiadomość',
      send: 'Wyślij',
      placeholderSubject: 'Czego dotyczy ta sprawa?',
      placeholderMessage: 'Wpisz tutaj swoją wiadomość...',
      alternative:
        'Alternatywnie możesz skontaktować się z nami bezpośrednio pod adresem <linkTag>{email}</linkTag>',
      intro:
        'Skontaktuj się z nami, jeśli masz jakiekolwiek pytania lub uwagi.',
      reportIssues:
        'Jeśli napotkasz jakiekolwiek problemy techniczne lub chcesz zaproponować nowe irytujące funkcje, proszę <linkTag>zgłoś je na GitHubie</linkTag>.',
    },
  },
  navigation: {
    home: 'Strona główna',
    about: 'O nas',
    contact: 'Kontakt',
    donate: 'Wesprzyj',
    login: 'Logowanie',
    logout: 'Wyloguj',
    signup: 'Rejestracja',
    passwordReminder: 'Przypomnienie hasła',
    profile: 'Profil',
    settings: 'Ustawienia',
    search: 'Szukaj',
    privacyPolicy: 'Polityka Prywatności',
    hotThings: 'Gorące rzeczy',
    dilf: 'DILF',
    plans: 'Plany AI',
    personal: 'Osobiste',
    achievements: 'Osiągnięcia',
  },
  userField: {
    consentNewsletter: 'Chcę otrzymywać newsletter',
    consentPrivacyPolicy: 'Akceptuję politykę prywatności',
    consentChildSoul: 'Dusza mojego pierworodnego dziecka',
    countryCode: 'Kraj',
    dateOfBirth: 'Data urodzenia',
    dateOfBirthYear: 'Rok',
    dateOfBirthMonth: 'Miesiąc',
    dateOfBirthDay: 'Dzień',
    email: 'Email',
    firstName: 'Imię',
    gender: 'Płeć',
    lastName: 'Nazwisko',
    nickname: 'Pseudonim',
    password: 'Hasło',
    passwordStrength: 'Siła hasła',
    passwordConfirmation: 'Potwierdzenie hasła',
    phoneNumber: 'Numer telefonu',
    phoneNumberCountryCode: 'Kod kraju',
    phoneNumberAreaCode: 'Numer kierunkowy',
    phoneNumberDecrease: 'Zmniejsz numer telefonu',
    phoneNumberIncrease: 'Zwiększ numer telefonu',
    rememberMe: 'Zapamiętaj mnie',
    username: 'Nazwa użytkownika',
  },
  gender: {
    alien: 'Obcy',
    chymera: 'Chimera',
    cyborg: 'Cyborg',
    female: 'Kobieta',
    male: 'Mężczyzna',
    other: 'Inna',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Udostępnij tę stronę',
      description:
        'Szerz niedolę! Pamiętaj, aby uraczyć tą boleśnie irytującą stroną również swoich znajomych — po co cierpieć samemu, skoro możesz ich pociągnąć za sobą?',
    },
  },
  messages: {
    errors: {
      e404title: 'Błąd 404',
      e404description: 'Strony nie znaleziono, jak to mogło się stać',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Hej, nie możesz tu klikać prawym przyciskiem myszy!',
  },
  language: {
    label: 'Język',
    option: {
      ar: 'Arabski',
      de: 'Niemiecki',
      en: 'Angielski',
      es: 'Hiszpański',
      fr: 'Francuski',
      hi: 'Hindi',
      hu: 'Węgierski',
      it: 'Włoski',
      ja: 'Japoński',
      ko: 'Koreański',
      pl: 'Polski',
      pt: 'Portugalski',
      ru: 'Rosyjski',
      tr: 'Turecki',
      zh: 'Chiński',
    },
  },
  themeSwitch: {
    label: 'Zmień motyw',
    darkMode: 'Tryb ciemny',
    lightMode: 'Tryb jasny',
  },
};
