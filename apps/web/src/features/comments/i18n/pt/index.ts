import type { CommentsI18nShape } from '../../types';

export default {
  sectionTitle: 'Comentários',
  formTitle: 'Adicione o seu comentário',
  reply: 'Responder',
  showReplies: 'Mostrar {count} respostas',
  hideReplies: 'Ocultar respostas',
  disclaimer:
    'Todos os comentários são gerados para fins de entretenimento e não são reais. Não poderá publicar nenhum comentário de facto.',
  loginRequired: {
    title: 'Login Necessário',
    description:
      'Precisa de estar autenticado para realizar esta ação. Por favor, inicie sessão ou crie uma conta para continuar.',
    login: 'Entrar',
    cancel: 'Cancelar',
  },
  form: {
    name: 'Nome',
    comment: 'Comentário',
    submit: 'Publicar comentário',
  },
} satisfies CommentsI18nShape;
