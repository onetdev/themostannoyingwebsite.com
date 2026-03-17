import type { CommentsI18nShape } from '../../types';

export default {
  sectionTitle: 'Komentarze',
  formTitle: 'Dodaj swój komentarz',
  reply: 'Odpowiedz',
  showReplies: 'Pokaż {count} odpowiedzi',
  hideReplies: 'Ukryj odpowiedzi',
  disclaimer:
    'Wszystkie komentarze są generowane w celach rozrywkowych i nie są prawdziwe. Nie będziesz mógł naprawdę opublikować żadnego komentarza.',
  loginRequired: {
    title: 'Wymagane logowanie',
    description:
      'Musisz być zalogowany, aby wykonać tę akcję. Zaloguj się lub utwórz konto, aby kontynuować.',
    login: 'Logowanie',
    cancel: 'Anuluj',
  },
  form: {
    name: 'Imię',
    comment: 'Komentarz',
    submit: 'Prześlij komentarz',
  },
} satisfies CommentsI18nShape;
