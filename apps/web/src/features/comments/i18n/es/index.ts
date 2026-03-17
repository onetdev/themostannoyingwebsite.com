import type { CommentsI18nShape } from '../../types';

export default {
  sectionTitle: 'Comentarios',
  formTitle: 'Añade tu comentario',
  reply: 'Responder',
  showReplies: 'Mostrar {count} respuestas',
  hideReplies: 'Ocultar respuestas',
  disclaimer:
    'Todos los comentarios son generados con fines de entretenimiento y no son reales. En realidad, no podrás publicar ningún comentario.',
  loginRequired: {
    title: 'Inicio de sesión requerido',
    description:
      'Necesitas iniciar sesión para realizar esta acción. Por favor inicia sesión o crea una cuenta para continuar.',
    login: 'Iniciar sesión',
    cancel: 'Cancelar',
  },
  form: {
    name: 'Nombre',
    comment: 'Comentario',
    submit: 'Enviar comentario',
  },
} satisfies CommentsI18nShape;
