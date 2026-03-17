import type { CommentsI18nShape } from '../../types';

export default {
  sectionTitle: 'Hozzászólások',
  formTitle: 'Szólj hozzá te is!',
  reply: 'Válasz',
  showReplies: '{count} válasz megjelenítése',
  hideReplies: 'Válaszok elrejtése',
  disclaimer:
    'Minden hozzászólás szórakoztatási céllal jött létre, nem valódiak. Te sem fogsz tudni ténylegesen hozzászólni semmihez.',
  loginRequired: {
    title: 'Bejelentkezés szükséges',
    description:
      'A művelet elvégzéséhez be kell jelentkezned. Kérlek, lépj be vagy regisztrálj a folytatáshoz.',
    login: 'Belépés',
    cancel: 'Mégse',
  },
  form: {
    name: 'Név',
    comment: 'Hozzászólás',
    submit: 'Hozzászólás beküldése',
  },
} satisfies CommentsI18nShape;
