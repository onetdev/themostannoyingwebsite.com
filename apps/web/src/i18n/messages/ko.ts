import achievements from '@/features/achievements/i18n/ko';
import auth from '@/features/auth/i18n/ko';
import humanVerification from '@/features/captcha/i18n/ko';
import commentVariants from '@/features/comments/i18n/generator/ko';
import comments from '@/features/comments/i18n/ko';
import content from '@/features/content/i18n/ko';
import disruptions from '@/features/disruptions/i18n/ko';
import funding from '@/features/funding/i18n/ko';
import marketing from '@/features/marketing/i18n/ko';
import monitoring from '@/features/monitoring/i18n/ko';
import subscription from '@/features/subscription/i18n/ko';
import support from '@/features/support/i18n/ko';
import user from '@/features/user/i18n/ko';
import common from './common/ko';
import metadata from './metadata/ko';

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
    title: '세상에서 가장 짜증나는 웹사이트',
    description:
      '현대 웹사이트의 수많은 역겨운 기능들을 담아낸, 자칭 세상에서 가장 짜증나는 웹사이트입니다. 어느 순간 구토를 유발할 수도 있습니다.',
    recruiting:
      '여기 보이는 것들을 확장하고 싶으신가요? <linkTag>GitHub</linkTag> 저장소를 방문하여 시작해 보세요.',
    aiDisclose:
      '이 웹사이트는 창의적인 콘텐츠와 미디어를 위해 생성형 AI를 활용합니다. 도움이 되는 정보와 비슷해 보이는 것이 있다면 순전히 우연입니다.',
    copyright: '© {year} 세상에서 가장 짜증나는 웹사이트. All rights reserved.',
    dataStorageDisclaimer:
      '개인정보 우선: 우리는 민감한 양식 입력값이나 사용자 자격 증명을 저장하지 않습니다.',
    noWarranties:
      '"있는 그대로" 제공되며 보증은 없습니다. 시간 낭비나 좌절감에 대해 우리는 책임지지 않습니다.',
    translationDisclaimer:
      '이 문서는 공식 영문 버전의 번역본입니다. 불일치가 있는 경우 영문 버전이 우선합니다. 공식 버전은 <linkTag>여기</linkTag>에서 찾을 수 있습니다.',
    cookieConsent:
      '이 웹사이트는 최상의 경험을 제공하기 위해 쿠키를 사용합니다. 또한 이 사이트는 농담이므로 많은 기능이 버그가 있거나 의도적으로 작동하지 않습니다. 설정 메뉴에서 경험과 쿠키 설정을 맞춤 설정할 수 있습니다.',
    exitPrompt:
      '나쁜 일이 생기기 전에 떠나는 걸 다시 생각해 보시는 게 좋을 거예요. 정말 확실합니까?',
    readMoreAt: '더 읽어보기:',
    virgin: {
      title: '모든 경험 비활성화',
      description:
        '현재 모든 경험이 비활성화되었습니다. 콘텐츠만 공유하고 싶다면 이 URL을 공유하세요. 마음이 바뀌면 설정 메뉴에서 모든 경험을 다시 활성화할 수 있습니다.',
    },
    toggleMenu: '메뉴 토글',
    logo: 'MAW 로고',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: '배너 닫기',
    contactForm: {
      title: '공식 문의 양식',
      subject: '제목',
      message: '메시지',
      send: '전송',
      placeholderSubject: '무엇에 관한 내용인가요?',
      placeholderMessage: '여기에 메시지를 입력하세요...',
      alternative:
        '또는 <linkTag>{email}</linkTag>로 직접 연락하실 수 있습니다.',
      intro: '궁금한 점이나 피드백이 있으면 언제든지 문의해 주세요.',
      reportIssues:
        '기술적인 문제를 발견하거나 새로운 짜증 포인트를 제안하고 싶다면 <linkTag>GitHub에 보고해 주세요</linkTag>.',
    },
  },
  navigation: {
    home: '홈',
    about: '소개',
    contact: '문의하기',
    donate: '후원하기',
    login: '로그인',
    logout: '로그아웃',
    signup: '회원가입',
    passwordReminder: '비밀번호 찾기',
    profile: '프로필',
    settings: '설정',
    search: '검색',
    privacyPolicy: '개인정보 처리방침',
    hotThings: '핫한 것들',
    dilf: 'DILF',
    plans: 'AI 플랜',
    personal: '개인',
    achievements: '업적',
    admin: '관리자',
    termsOfUse: '이용약관',
  },
  userField: {
    consentNewsletter: '뉴스레터 수신에 동의합니다',
    consentPrivacyPolicy: '개인정보 처리방침에 동의합니다',
    consentTermsOfUse: '이용약관에 동의합니다',
    consentChildSoul: '첫째 아이의 영혼을 바칩니다',
    countryCode: '국가',
    dateOfBirth: '생년월일',
    dateOfBirthYear: '년',
    dateOfBirthMonth: '월',
    dateOfBirthDay: '일',
    email: '이메일',
    firstName: '이름',
    gender: '성별',
    lastName: '성',
    nickname: '닉네임',
    password: '비밀번호',
    passwordStrength: '비밀번호 강도',
    passwordConfirmation: '비밀번호 확인',
    phoneNumber: '전화번호',
    phoneNumberCountryCode: '국가 번호',
    phoneNumberAreaCode: '지역 번호',
    phoneNumberDecrease: '전화번호 감소',
    phoneNumberIncrease: '전화번호 증가',
    rememberMe: '로그인 상태 유지',
    username: '사용자 아이디',
  },
  gender: {
    alien: '외계인',
    chymera: '키메라',
    cyborg: '사이보그',
    female: '여성',
    male: '남성',
    other: '기타',
    robot: '로봇',
  },
  share: {
    modal: {
      title: '이 페이지 공유하기',
      description:
        '비참함을 널리 퍼뜨리세요! 이 고통스럽고 짜증나는 웹사이트를 친구들에게도 선사해 보세요. 혼자 고통받을 필요 없잖아요?',
    },
  },
  messages: {
    errors: {
      e404title: '오류 404',
      e404description:
        '페이지를 찾을 수 없습니다. 어떻게 이런 일이 생길 수 있죠?',
    },
    info: {},
  },
  contextMenu: {
    disabled: '어이, 여기서는 우클릭할 수 없어요!',
  },
  language: {
    label: '언어',
  },
  themeSwitch: {
    label: '테마 변경',
    darkMode: '다크 모드',
    lightMode: '라이트 모드',
  },
} satisfies DeepPartial<AppTranslationShape>;
