import type { AuthI18nShape } from '../types';

export default {
  common: {
    lookingForSignup: '¿Necesitas una cuenta? Regístrate aquí',
    forgotPassword: '¿Olvidaste tu contraseña?',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
  },
  form: {
    login: {
      genericError: 'Error al iniciar sesión',
      callToAction: 'Iniciar sesión',
    },
    signup: {
      genericError: 'Error al registrarse',
      callToAction: 'Crear mi cuenta',
    },
    passwordReminder: {
      genericError: 'Error al recordar contraseña',
      callToAction: 'Enviar recordatorio de contraseña',
    },
  },
  admin: {
    terminal: {
      systemBoot: 'Iniciando sistema...',
      systemReady: 'Conexión segura de administración MAW establecida.',
      loginPrompt: 'usuario:',
      passwordPrompt: 'contraseña:',
      invalidCredentials: 'Acceso denegado. Credenciales inválidas.',
      accessGranted: 'Acceso concedido. Bienvenido de nuevo {username}.',
      matrixQuote: '¡¡¡Alguien te está observando!!! Sigue al conejo blanco.',
      redirectingGeneric: 'Redirigiendo...',
      redirectingSafety: 'Llevándote de vuelta a la seguridad...',
    },
  },
} satisfies AuthI18nShape;
