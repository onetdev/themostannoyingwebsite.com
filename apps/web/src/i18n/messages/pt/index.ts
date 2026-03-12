import achievements from '@/features/achievements/i18n/pt';
import auth from '@/features/auth/i18n/pt';
import humanVerification from '@/features/captcha/i18n/pt';
import comments from '@/features/comments/i18n/pt';
import commentVariants from '@/features/comments/i18n/pt/variants';
import content from '@/features/content/i18n/pt';
import disruptions from '@/features/disruptions/i18n/pt';
import funding from '@/features/funding/i18n/pt';
import marketing from '@/features/marketing/i18n/pt';
import monitoring from '@/features/monitoring/i18n/pt';
import subscription from '@/features/subscription/i18n/pt';
import support from '@/features/support/i18n/pt';
import user from '@/features/user/i18n/pt';
import common from './common';
import metadata from './metadata';
import variants from './variants';

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
  variants,

  // App level, shared translations
  app: {
    title: 'O Website Mais Irritante',
    description:
      'Auto-proclamado o website mais irritante da web, com tantas características repugnantes de websites modernos que poderá até vomitar em algum momento.',
    recruiting:
      'Queres estender o que vês aqui? Visita o nosso repositório no <linkTag>GitHub</linkTag> para começares.',
    aiDisclose:
      'Este website utiliza IA generativa para conteúdo criativo e media. Qualquer semelhança com informação útil é pura coincidência.',
    copyright:
      '© {year} O Website Mais Irritante. Todos os direitos reservados.',
    dataStorageDisclaimer:
      'Privacidade Primeiro: Não guardamos entradas de formulários sensíveis ou credenciais de utilizador.',
    noWarranties:
      'Fornecido "tal como está", sem garantia. Não somos responsáveis pelo seu tempo perdido ou frustração.',
    translationDisclaimer:
      'Este documento é uma tradução da versão oficial em inglês. Em caso de discrepância, a versão em inglês prevalecerá. Pode encontrar a versão oficial <linkTag>aqui</linkTag>.',
    cookieConsent:
      'Este website utiliza cookies para garantir que tenha a melhor experiência. Também é uma piada, por isso muitas das funcionalidades têm bugs ou não funcionam de propósito. Pode personalizar a sua experiência e as definições de cookies no menu de definições.',
    exitPrompt:
      'Eu reconsideraria sair antes que algumas coisas más lhe aconteçam. Tem a certeza?',
    readMoreAt: 'Leia mais em',
    virgin: {
      title: 'Desativar todas as experiências',
      description:
        'Todas as experiências estão agora desativadas. Se quiser partilhar esta página apenas pelo conteúdo, basta passar este URL. Se mudar de ideias, pode reativar todas as experiências no menu de definições.',
    },
    toggleMenu: 'Alternar menu',
    logo: 'Logótipo MAW',
    logoAlt: '<the>o</the> <most>Website Mais</most> Irritante',
    dismissBanner: 'Fechar banner',
    contactForm: {
      title: 'Formulário de contacto oficial',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar',
      placeholderSubject: 'Sobre o que é isto?',
      placeholderMessage: 'Escreva a sua mensagem aqui...',
      alternative:
        'Alternativamente, pode contactar-nos diretamente em <linkTag>{email}</linkTag>',
      intro:
        'Sinta-se à vontade para nos contactar se tiver dúvidas ou feedback.',
      reportIssues:
        'Se encontrar problemas técnicos ou quiser sugerir novos pontos de dor, por favor <linkTag>reporte-os no GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Início',
    about: 'Sobre',
    contact: 'Contacto',
    donate: 'Doar',
    login: 'Entrar',
    logout: 'Sair',
    signup: 'Registar',
    passwordReminder: 'Lembrete de Palavra-passe',
    profile: 'Perfil',
    settings: 'Definições',
    search: 'Pesquisar',
    privacyPolicy: 'Política de Privacidade',
    hotThings: 'Coisas quentes',
    dilf: 'DILF',
    plans: 'Planos de IA',
    personal: 'Pessoal',
    achievements: 'Conquistas',
    admin: 'Admin',
    termsOfUse: 'Termos de Uso',
    onlySpams: 'OnlySpams',
    virgin: 'Virgin',
    flaimAPhone: 'Reclama um telefone!',
  },
  userField: {
    consentNewsletter: 'Quero receber a newsletter',
    consentPrivacyPolicy: 'Aceito a política de privacidade',
    consentTermsOfUse: 'Aceito os termos de uso',
    consentChildSoul: 'A alma do meu primeiro filho',
    countryCode: 'País',
    dateOfBirth: 'Data de nascimento',
    dateOfBirthYear: 'Ano',
    dateOfBirthMonth: 'Mês',
    dateOfBirthDay: 'Dia',
    email: 'Email',
    firstName: 'Primeiro nome',
    gender: 'Género',
    lastName: 'Último nome',
    nickname: 'Alcunha',
    password: 'Palavra-passe',
    passwordStrength: 'Força da palavra-passe',
    passwordConfirmation: 'Confirmação da palavra-passe',
    phoneNumber: 'Número de telefone',
    phoneNumberCountryCode: 'Código do país',
    phoneNumberAreaCode: 'Código de área',
    phoneNumberDecrease: 'Diminuir número de telefone',
    phoneNumberIncrease: 'Aumentar número de telefone',
    rememberMe: 'Lembrar-me',
    username: 'Nome de utilizador',
  },
  gender: {
    alien: 'Alienígena',
    chymera: 'Quimera',
    cyborg: 'Ciborgue',
    female: 'Feminino',
    male: 'Masculino',
    other: 'Outro',
    robot: 'Robô',
  },
  share: {
    modal: {
      title: 'Partilhar esta página',
      description:
        'Espalhe a miséria! Certifique-se de infligir este website dolorosamente detestável nos seus amigos também — porquê sofrer sozinho quando pode arrastá-los consigo?',
    },
  },
  messages: {
    errors: {
      e404title: 'Erro 404',
      e404description: 'Página não encontrada, como pôde isto acontecer',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Ei, não podes clicar com o botão direito aqui!',
  },
  language: {
    label: 'Idioma',
  },
  themeSwitch: {
    label: 'Alterar tema',
    darkMode: 'Modo escuro',
    lightMode: 'Modo claro',
  },
} satisfies DeepPartial<AppTranslationShape>;
