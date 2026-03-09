import achievements from '@/features/achievements/i18n/ja';
import auth from '@/features/auth/i18n/ja';
import humanVerification from '@/features/captcha/i18n/ja';
import commentVariants from '@/features/comments/i18n/generator/ja';
import comments from '@/features/comments/i18n/ja';
import content from '@/features/content/i18n/ja';
import disruptions from '@/features/disruptions/i18n/ja';
import funding from '@/features/funding/i18n/ja';
import marketing from '@/features/marketing/i18n/ja';
import monitoring from '@/features/monitoring/i18n/ja';
import subscription from '@/features/subscription/i18n/ja';
import support from '@/features/support/i18n/ja';
import user from '@/features/user/i18n/ja';
import common from './common/ja';
import metadata from './metadata/ja';

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
    title: '世界一ウザいウェブサイト',
    description:
      '自称「ネット上で最もウザい」ウェブサイトへようこそ。現代のウェブサイトが持つ、吐き気がするほど不快な機能をこれでもかと詰め込みました。',
    recruiting:
      'もっとウザくしたいですか？ <linkTag>GitHub</linkTag> リポジトリから開発に参加しましょう。',
    aiDisclose:
      'このウェブサイトは、クリエイティブなコンテンツやメディアに生成AIを利用しています。役立つ情報に似ているものがあっても、それは単なる偶然です。',
    copyright:
      '© {year} 世界一ウザいウェブサイト. 無断転載禁止（どうせ誰も転載しませんが）。',
    dataStorageDisclaimer:
      'プライバシー優先：機密性の高いフォーム入力やユーザーの資格情報は保存しません。',
    noWarranties:
      '「現状のまま」提供されます。保証はありません。あなたの貴重な時間の損失やフラストレーションについて、当社は一切の責任を負いません。',
    privacyPolicyDisclaimer:
      'このドキュメントは公式な英語版の翻訳です。不一致がある場合は英語版が優先されます。公式版は<linkTag>こちら</linkTag>で確認できます。',
    cookieConsent:
      'このウェブサイトでは、最高の（最悪の？）体験を提供するためにクッキーを使用しています。また、これはジョークサイトなので、多くの機能が意図的にバグっていたり動作しなかったりします。設定メニューからクッキー設定や体験をカスタマイズできます。',
    exitPrompt:
      '立ち去る前によく考えたほうがいいですよ。何か悪いことが起こるかもしれません。本当にいいんですか？',
    readMoreAt: '詳細はこちら：',
    virgin: {
      title: 'すべての体験を無効化する',
      description:
        'すべてのウザい体験は現在無効になっています。コンテンツだけを共有したい場合は、このURLをそのまま伝えてください。気が変わった場合は、設定メニューからすべての体験を再度有効にできます。',
    },
    toggleMenu: 'メニューを切り替える',
    logo: 'MAW ロゴ',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: 'バナーを閉じる',
    contactForm: {
      title: '公式お問い合わせフォーム',
      subject: '件名',
      message: 'メッセージ',
      send: '送信',
      placeholderSubject: '件名を入力してください...',
      placeholderMessage: 'ここにメッセージを入力してください...',
      alternative:
        'または、直接メールでお問い合わせください：<linkTag>{email}</linkTag>',
      intro: 'ご質問やフィードバックがあれば、お気軽にご連絡ください。',
      reportIssues:
        '技術的な問題が発生した場合や、新しい「ウザい機能」を提案したい場合は、<linkTag>GitHubで報告</linkTag>してください。',
    },
  },
  navigation: {
    home: 'ホーム',
    about: 'アバウト',
    contact: 'お問い合わせ',
    donate: '寄付',
    login: 'ログイン',
    logout: 'ログアウト',
    signup: 'サインアップ',
    passwordReminder: 'パスワードを忘れたら',
    profile: 'プロフィール',
    settings: '設定',
    search: '検索',
    privacyPolicy: 'プライバシーポリシー',
    hotThings: 'ホットな話題',
    dilf: 'DILF',
    plans: 'AIプラン',
    personal: 'パーソナル',
    achievements: '実績',
    admin: '管理者',
    termsOfUse: '利用規約',
  },
  userField: {
    consentNewsletter: 'ニュースレターを受け取る（後悔しますよ）',
    consentPrivacyPolicy: 'プライバシーポリシーに同意する',
    consentChildSoul: '第一子の魂を捧げる',
    countryCode: '国',
    dateOfBirth: '生年月日',
    dateOfBirthYear: '年',
    dateOfBirthMonth: '月',
    dateOfBirthDay: '日',
    email: 'メールアドレス',
    firstName: '名',
    gender: '性別',
    lastName: '姓',
    nickname: 'ニックネーム',
    password: 'パスワード',
    passwordStrength: 'パスワードの強度',
    passwordConfirmation: 'パスワード（確認用）',
    phoneNumber: '電話番号',
    phoneNumberCountryCode: '国番号',
    phoneNumberAreaCode: '市外局番',
    phoneNumberDecrease: '電話番号を減らす',
    phoneNumberIncrease: '電話番号を増やす',
    rememberMe: 'ログイン状態を保持',
    username: 'ユーザー名',
  },
  gender: {
    alien: 'エイリアン',
    chymera: 'キメラ',
    cyborg: 'サイボーグ',
    female: '女性',
    male: '男性',
    other: 'その他',
    robot: 'ロボット',
  },
  share: {
    modal: {
      title: 'このページを共有する',
      description:
        '不幸を撒き散らしましょう！この苦痛で不快なウェブサイトを友達にも押し付けてください。自分だけが苦しむ必要はありません。道連れにしましょう。',
    },
  },
  messages: {
    errors: {
      e404title: 'エラー 404',
      e404description: 'ページが見つかりません。どうしてこうなった。',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'おい、ここでは右クリック禁止だぞ！',
  },
  language: {
    label: '言語',
  },
  themeSwitch: {
    label: 'テーマを切り替える',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
  },
} satisfies DeepPartial<AppTranslationShape>;
