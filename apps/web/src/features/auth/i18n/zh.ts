import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: '需要账户？在这里注册',
    forgotPassword: '忘记密码了？',
    login: '登录',
    signup: '注册',
  },
  form: {
    login: {
      genericError: '登录失败',
      callToAction: '登录',
    },
    signup: {
      genericError: '注册失败',
      callToAction: '创建我的账户',
    },
    passwordReminder: {
      genericError: '密码提醒失败',
      callToAction: '发送密码提醒',
    },
  },
  admin: {
    terminal: {
      systemBoot: '系统正在启动...',
      systemReady: 'MAW 管理员安全连接已建立。',
      loginPrompt: '登录名:',
      passwordPrompt: '密码:',
      invalidCredentials: '访问被拒绝。凭据无效。',
      accessGranted: '访问已授权。欢迎回来 {username}。',
      matrixQuote: '有人正在注视着你！！！跟随那只白兔。',
      redirectingGeneric: '正在重定向...',
      redirectingSafety: '正在带你回到安全地带...',
    },
  },
} satisfies AuthI18nShape;
