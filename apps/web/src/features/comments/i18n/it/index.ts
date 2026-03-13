import type { CommentsI18nShape } from '../../types';

export default {
  sectionTitle: 'Commenti',
  formTitle: 'Aggiungi il tuo commento',
  reply: 'Rispondi',
  showReplies: 'Mostra {count} risposte',
  hideReplies: 'Nascondi risposte',
  disclaimer:
    'Tutti i commenti sono generati a scopo di intrattenimento e non sono reali. Non sarai in grado di pubblicare alcun commento.',
  loginRequired: {
    title: 'Accesso richiesto',
    description:
      "Devi aver effettuato l'accesso per eseguire questa azione. Accedi o crea un account per continuare.",
    login: 'Accedi',
    cancel: 'Annulla',
  },
  form: {
    name: 'Nome',
    comment: 'Commento',
    submit: 'Invia commento',
  },
} satisfies CommentsI18nShape;
