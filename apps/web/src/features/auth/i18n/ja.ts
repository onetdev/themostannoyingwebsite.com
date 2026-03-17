import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'アカウントをお持ちでないですか？こちらからサインアップ',
    forgotPassword: 'パスワードを忘れたら',
    login: 'ログイン',
    signup: 'サインアップ',
  },
  form: {
    login: {
      genericError: 'ログインに失敗しました',
      callToAction: 'ログイン',
    },
    signup: {
      genericError: 'サインアップに失敗しました',
      callToAction: 'アカウントを作成',
    },
    passwordReminder: {
      genericError: 'パスワードリマインダーの送信に失敗しました',
      callToAction: 'パスワードリマインダーを送信',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'システム起動中...',
      systemReady: 'MAW 管理者用セキュア接続が確立されました。',
      loginPrompt: 'ログイン:',
      passwordPrompt: 'パスワード:',
      invalidCredentials: 'アクセス拒否。資格情報が無効です。',
      accessGranted: 'アクセス許可。おかえりなさい {username}。',
      matrixQuote: '誰かがあなたを見ている！！！ 白いウサギを追え。',
      redirectingGeneric: 'リダイレクト中...',
      redirectingSafety: '安全な場所に戻しています...',
    },
  },
} satisfies AuthI18nShape;
