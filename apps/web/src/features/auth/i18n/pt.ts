import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: 'Precisa de uma conta? Registe-se aqui',
    forgotPassword: 'Esqueceu-se da palavra-passe?',
    login: 'Entrar',
    signup: 'Registar',
  },
  form: {
    login: {
      genericError: 'Falha ao entrar',
      callToAction: 'Entrar',
    },
    signup: {
      genericError: 'Falha no registo',
      callToAction: 'Criar a minha conta',
    },
    passwordReminder: {
      genericError: 'Falha no lembrete de palavra-passe',
      callToAction: 'Enviar lembrete de palavra-passe',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'Sistema a iniciar...',
      systemReady: 'Ligação segura de administrador MAW estabelecida.',
      loginPrompt: 'utilizador:',
      passwordPrompt: 'palavra-passe:',
      invalidCredentials: 'Acesso negado. Credenciais inválidas.',
      accessGranted: 'Acesso concedido. Bem-vindo de volta, {username}.',
      matrixQuote: 'Alguém está a ver-te!!! Segue o coelho branco.',
      redirectingGeneric: 'A redirecionar...',
      redirectingSafety: 'Estou a levar-te de volta para a segurança...',
    },
  },
} satisfies AuthI18nShape;
