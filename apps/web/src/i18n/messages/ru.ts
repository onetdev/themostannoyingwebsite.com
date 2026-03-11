import achievements from '@/features/achievements/i18n/ru';
import auth from '@/features/auth/i18n/ru';
import humanVerification from '@/features/captcha/i18n/ru';
import commentVariants from '@/features/comments/i18n/generator/ru';
import comments from '@/features/comments/i18n/ru';
import content from '@/features/content/i18n/ru';
import disruptions from '@/features/disruptions/i18n/ru';
import funding from '@/features/funding/i18n/ru';
import marketing from '@/features/marketing/i18n/ru';
import monitoring from '@/features/monitoring/i18n/ru';
import subscription from '@/features/subscription/i18n/ru';
import support from '@/features/support/i18n/ru';
import user from '@/features/user/i18n/ru';
import common from './common/ru';
import metadata from './metadata/ru';

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
    title: 'Самый раздражающий сайт',
    description:
      'Самопровозглашенный самый раздражающий сайт в сети с таким количеством отвратительных функций современных сайтов, что вас может даже стошнить в какой-то момент.',
    recruiting:
      'Хотите расширить то, что вы здесь видите? Посетите наш репозиторий на <linkTag>GitHub</linkTag>, чтобы начать.',
    aiDisclose:
      'Этот сайт использует генеративный ИИ для создания креативного контента и медиа. Любое сходство с полезной информацией чисто случайно.',
    copyright: '© {year} Самый раздражающий сайт. Все права защищены.',
    dataStorageDisclaimer:
      'Конфиденциальность прежде всего: мы не храним конфиденциальные вводимые данные форм или учетные данные пользователей.',
    noWarranties:
      'Предоставляется "как есть" без гарантий. Мы не несем ответственности за ваше потерянное время или разочарование.',
    translationDisclaimer:
      'Этот документ является переводом официальной английской версии. В случае каких-либо расхождений английская версия имеет приоритет. Вы можете найти официальную версию <linkTag>здесь</linkTag>.',
    cookieConsent:
      'Этот сайт использует куки, чтобы обеспечить вам наилучший опыт. Это также шутка, поэтому многие функции глючат или не работают специально. Вы можете настроить свой опыт и параметры куки в меню настроек.',
    exitPrompt:
      'Я бы подумал еще раз, прежде чем уходить, а то мало ли что случится. Вы уверены?',
    readMoreAt: 'Читать далее на',
    virgin: {
      title: 'Отключить все эффекты',
      description:
        'Все эффекты сейчас отключены. Если вы хотите поделиться этой страницей только ради контента, просто передайте этот URL. Если вы передумали, вы можете снова включить все эффекты в меню настроек.',
    },
    toggleMenu: 'Переключить меню',
    logo: 'Логотип MAW',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: 'Закрыть баннер',
    contactForm: {
      title: 'Официальная контактная форма',
      subject: 'Тема',
      message: 'Сообщение',
      send: 'Отправить',
      placeholderSubject: 'О чем это?',
      placeholderMessage: 'Введите ваше сообщение здесь...',
      alternative:
        'Кроме того, вы можете связаться с нами напрямую по адресу <linkTag>{email}</linkTag>',
      intro:
        'Не стесняйтесь обращаться к нам, если у вас есть вопросы или отзывы.',
      reportIssues:
        'Если вы столкнулись с какими-либо техническими проблемами или хотите предложить новые болевые точки, пожалуйста, <linkTag>сообщите о них на GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Главная',
    about: 'О нас',
    contact: 'Контакт',
    donate: 'Донат',
    login: 'Вход',
    logout: 'Выход',
    signup: 'Регистрация',
    passwordReminder: 'Напоминание пароля',
    profile: 'Профиль',
    settings: 'Настройки',
    search: 'Поиск',
    privacyPolicy: 'Политика конфиденциальности',
    hotThings: 'Горячие штучки',
    dilf: 'DILF',
    plans: 'AI тарифы',
    personal: 'Личное',
    achievements: 'Достижения',
    admin: 'Админ',
    termsOfUse: 'Условия использования',
    onlySpams: 'OnlySpams',
    virgin: 'Девственный',
    flaimAPhone: 'Зафлейми телефон!',
  },
  userField: {
    consentNewsletter: 'Я хочу получать рассылку',
    consentPrivacyPolicy: 'Принимаю политику конфиденциальности',
    consentTermsOfUse: 'Принимаю условия использования',
    consentChildSoul: 'Душа моего первенца',
    countryCode: 'Страна',
    dateOfBirth: 'Дата рождения',
    dateOfBirthYear: 'Год',
    dateOfBirthMonth: 'Месяц',
    dateOfBirthDay: 'День',
    email: 'Email',
    firstName: 'Имя',
    gender: 'Пол',
    lastName: 'Фамилия',
    nickname: 'Никнейм',
    password: 'Пароль',
    passwordStrength: 'Сложность пароля',
    passwordConfirmation: 'Подтверждение пароля',
    phoneNumber: 'Номер телефона',
    phoneNumberCountryCode: 'Код страны',
    phoneNumberAreaCode: 'Код города',
    phoneNumberDecrease: 'Уменьшить номер телефона',
    phoneNumberIncrease: 'Увеличить номер телефона',
    rememberMe: 'Запомнить меня',
    username: 'Имя пользователя',
  },
  gender: {
    alien: 'Пришелец',
    chymera: 'Химера',
    cyborg: 'Киборг',
    female: 'Женский',
    male: 'Мужской',
    other: 'Другой',
    robot: 'Робот',
  },
  share: {
    modal: {
      title: 'Поделиться страницей',
      description:
        'Распространяйте страдания! Обязательно навлеките этот мучительно неприятный сайт и на своих друзей — зачем страдать в одиночку, когда можно потянуть их за собой?',
    },
  },
  messages: {
    errors: {
      e404title: 'Ошибка 404',
      e404description: 'Страница не найдена, как такое могло случиться',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Эй, тут нельзя нажимать правой кнопкой мыши!',
  },
  language: {
    label: 'Язык',
  },
  themeSwitch: {
    label: 'Переключить тему',
    darkMode: 'Темная тема',
    lightMode: 'Светлая тема',
  },
} satisfies DeepPartial<AppTranslationShape>;
