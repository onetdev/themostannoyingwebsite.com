import achievements from '@/features/achievements/i18n/zh';
import auth from '@/features/auth/i18n/zh';
import humanVerification from '@/features/captcha/i18n/zh';
import commentVariants from '@/features/comments/i18n/variants/zh';
import comments from '@/features/comments/i18n/zh';
import content from '@/features/content/i18n/zh';
import disruptions from '@/features/disruptions/i18n/zh';
import funding from '@/features/funding/i18n/zh';
import marketing from '@/features/marketing/i18n/zh';
import monitoring from '@/features/monitoring/i18n/zh';
import subscription from '@/features/subscription/i18n/zh';
import support from '@/features/support/i18n/zh';
import user from '@/features/user/i18n/zh';
import common from './common/zh';
import metadata from './metadata/zh';
import variants from './variants/zh';

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
    title: '史上最烦人网站',
    description:
      '自诩为全球最烦人的网站，充满了现代网站各种令人作呕的特性，甚至可能让你当场呕吐。',
    recruiting:
      '想扩展你在这里看到的内容吗？访问我们的 <linkTag>GitHub</linkTag> 仓库开始吧。',
    aiDisclose:
      '本网站利用生成式 AI 创作创意内容和媒体。任何与有用信息的相似之处纯属巧合。',
    copyright: '© {year} 史上最烦人网站。保留所有权利。',
    dataStorageDisclaimer:
      '隐私第一：我们不会持久化存储敏感的表单输入或用户凭据。',
    noWarranties:
      '按“原样”提供，不作任何保证。我们不对你损失的时间或感到的挫败负责。',
    translationDisclaimer:
      '本文件是官方英文版本的翻译。如有任何差异，以英文版本为准。你可以在 <linkTag>这里</linkTag> 找到官方版本。',
    cookieConsent:
      '本网站使用 Cookie 以确保你在我们的网站上获得最佳体验。这同时也是个玩笑，许多功能都是故意出错或根本无法运行的。你可以在设置菜单中自定义你的体验和 Cookie 设置。',
    exitPrompt: '我建议你在发生某些糟糕的事情之前重新考虑是否离开。你确定吗？',
    readMoreAt: '阅读更多请访问',
    virgin: {
      title: '禁用所有体验',
      description:
        '现在所有体验都已禁用。如果你想分享这个页面仅用于内容展示，只需传播此 URL。如果你改变主意，可以在设置菜单中重新启用所有体验。',
    },
    toggleMenu: '切换菜单',
    logo: 'MAW Logo',
    logoAlt: '<the>史上</the> <most>最</most> 烦人网站',
    dismissBanner: '忽略横幅',
    contactForm: {
      title: '官方联系表单',
      subject: '主题',
      message: '内容',
      send: '发送',
      placeholderSubject: '这是关于什么的？',
      placeholderMessage: '在这里输入你的消息...',
      alternative: '或者，你可以直接通过 <linkTag>{email}</linkTag> 联系我们',
      intro: '如果你有任何问题或反馈，请随时联系我们。',
      reportIssues:
        '如果你遇到任何技术问题或想建议新的烦点，请<linkTag>在 GitHub 上举报</linkTag>。',
    },
  },
  navigation: {
    home: '首页',
    about: '关于',
    contact: '联系',
    donate: '捐赠',
    login: '登录',
    logout: '登出',
    signup: '注册',
    passwordReminder: '密码提醒',
    profile: '个人资料',
    settings: '设置',
    search: '搜索',
    privacyPolicy: '隐私政策',
    hotThings: '热门事物',
    dilf: 'DILF',
    plans: 'AI 计划',
    personal: '个人',
    achievements: '成就',
    admin: '管理',
    termsOfUse: '使用条款',
    onlySpams: 'OnlySpams',
    virgin: 'Virgin',
    flaimAPhone: '飞领一部手机！',
  },
  userField: {
    consentNewsletter: '我想接收新闻通讯',
    consentPrivacyPolicy: '接受隐私政策',
    consentTermsOfUse: '接受使用条款',
    consentChildSoul: '我第一个孩子的灵魂',
    countryCode: '国家',
    dateOfBirth: '出生日期',
    dateOfBirthYear: '年',
    dateOfBirthMonth: '月',
    dateOfBirthDay: '日',
    email: '电子邮件',
    firstName: '名',
    gender: '性别',
    lastName: '姓',
    nickname: '昵称',
    password: '密码',
    passwordStrength: '密码强度',
    passwordConfirmation: '确认密码',
    phoneNumber: '电话号码',
    phoneNumberCountryCode: '国家代码',
    phoneNumberAreaCode: '区号',
    phoneNumberDecrease: '减少电话号码',
    phoneNumberIncrease: '增加电话号码',
    rememberMe: '记住我',
    username: '用户名',
  },
  gender: {
    alien: '外星人',
    chymera: '奇美拉',
    cyborg: '赛博格',
    female: '女性',
    male: '男性',
    other: '其他',
    robot: '机器人',
  },
  share: {
    modal: {
      title: '分享此页面',
      description:
        '传播痛苦！务必把这个令人痛苦且讨厌的网站也强加给你的朋友——既然可以把他们也拉下水，为什么要独自受苦呢？',
    },
  },
  messages: {
    errors: {
      e404title: '错误 404',
      e404description: '页面未找到，这怎么可能发生',
    },
    info: {},
  },
  contextMenu: {
    disabled: '嘿，你不能在这里右键点击！',
  },
  language: {
    label: '语言',
  },
  themeSwitch: {
    label: '切换主题',
    darkMode: '深色模式',
    lightMode: '浅色模式',
  },
} satisfies DeepPartial<AppTranslationShape>;
