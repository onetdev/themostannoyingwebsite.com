import type { CommentsI18nShape } from '../types';

export default {
  sectionTitle: 'التعليقات',
  formTitle: 'أضف تعليقك',
  reply: 'رد',
  showReplies: 'عرض {count} من الردود',
  hideReplies: 'إخفاء الردود',
  disclaimer:
    'جميع التعليقات تم إنشاؤها لأغراض ترفيهية وليست حقيقية. لن تتمكن فعلياً من نشر أي تعليق.',
  loginRequired: {
    title: 'تسجيل الدخول مطلوب',
    description:
      'يجب عليك تسجيل الدخول للقيام بهذا الإجراء. يرجى تسجيل الدخول أو إنشاء حساب للمتابعة.',
    login: 'تسجيل الدخول',
    cancel: 'إلغاء',
  },
  form: {
    name: 'الاسم',
    comment: 'التعليق',
    submit: 'إرسال التعليق',
  },
} satisfies CommentsI18nShape;
