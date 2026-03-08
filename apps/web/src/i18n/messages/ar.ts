import achievements from '@/features/achievements/i18n/ar';
import auth from '@/features/auth/i18n/ar';
import humanVerification from '@/features/captcha/i18n/ar';
import comments from '@/features/comments/i18n/ar';
import commentVariants from '@/features/comments/i18n/generator/ar';
import content from '@/features/content/i18n/ar';
import disruptions from '@/features/disruptions/i18n/ar';
import funding from '@/features/funding/i18n/ar';
import marketing from '@/features/marketing/i18n/ar';
import monitoring from '@/features/monitoring/i18n/ar';
import subscription from '@/features/subscription/i18n/ar';
import support from '@/features/support/i18n/ar';
import user from '@/features/user/i18n/ar';
import common from './common/ar';
import metadata from './metadata/ar';

export default {
  // Feature or externals
  achievements,
  auth,
  comments,
  commentVariants,
  common,
  content,
  disruptions,
  funding,
  humanVerification,
  marketing,
  metadata,
  monitoring,
  subscription,
  support,
  user,

  // App level, shared translations
  app: {
    title: 'أكثر المواقع إزعاجاً',
    description:
      'الموقع الذي نصب نفسه أكثر المواقع إزعاجاً على الويب مع الكثير من الميزات المقززة للمواقع الحديثة لدرجة أنك قد تتقيأ في مرحلة ما.',
    recruiting:
      'هل تريد توسيع ما تراه هنا؟ قم بزيارة مستودع <linkTag>GitHub</linkTag> الخاص بنا للبدء.',
    aiDisclose:
      'يستخدم هذا الموقع الذكاء الاصطناعي التوليدي للمحتوى الإبداعي والوسائط. أي تشابه مع معلومات مفيدة هو محض صدفة.',
    copyright: '© {year} أكثر المواقع إزعاجاً. جميع الحقوق محفوظة.',
    dataStorageDisclaimer:
      'الخصوصية أولاً: نحن لا نحتفظ بمدخلات النماذج الحساسة أو بيانات اعتماد المستخدم.',
    noWarranties:
      'مقدم "كما هو" دون أي ضمان. نحن لسنا مسؤولين عن وقتك الضائع أو إحباطك.',
    privacyPolicyDisclaimer:
      'هذا المستند هو ترجمة للنسخة الإنجليزية الرسمية. في حالة وجود أي تعارض، تسود النسخة الإنجليزية. يمكنك العثور على النسخة الرسمية <linkTag>هنا</linkTag>.',
    cookieConsent:
      'يستخدم هذا الموقع ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة على موقعنا. إنه أيضاً مجرد مزحة لذا فإن العديد من الميزات بها أخطاء أو لا تعمل أصلاً عن عمد. يمكنك تخصيص تجربتك وإعدادات ملفات تعريف الارتباط في قائمة الإعدادات.',
    exitPrompt:
      'سأعيد النظر في المغادرة قبل أن تحدث لك بعض الأشياء السيئة. هل أنت متأكد؟',
    readMoreAt: 'اقرأ المزيد في',
    virgin: {
      title: 'تعطيل جميع التجارب',
      description:
        'جميع التجارب معطلة الآن. إذا كنت تريد مشاركة هذه الصفحة فقط للمحتوى، فما عليك سوى تمرير هذا الرابط. إذا غيرت رأيك، يمكنك إعادة تفعيل جميع التجارب في قائمة الإعدادات.',
    },
    toggleMenu: 'تبديل القائمة',
    logo: 'شعار MAW',
    logoAlt: '<the>أكثر</the> <most>المواقع</most> إزعاجاً',
    dismissBanner: 'تجاهل الشريط',
    contactForm: {
      title: 'نموذج الاتصال الرسمي',
      subject: 'الموضوع',
      message: 'الرسالة',
      send: 'إرسال',
      placeholderSubject: 'عن ماذا يتحدث هذا؟',
      placeholderMessage: 'اكتب رسالتك هنا...',
      alternative:
        'بدلاً من ذلك، يمكنك التواصل معنا مباشرة على <linkTag>{email}</linkTag>',
      intro: 'لا تتردد في الاتصال بنا إذا كان لديك أي أسئلة أو ملاحظات.',
      reportIssues:
        'إذا واجهت أي مشاكل فنية أو كنت ترغب في اقتراح نقاط ألم جديدة، يرجى <linkTag>الإبلاغ عنها على GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'الرئيسية',
    about: 'من نحن',
    contact: 'اتصل بنا',
    donate: 'تبرع',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    signup: 'تسجيل',
    passwordReminder: 'تذكير بكلمة المرور',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    search: 'بحث',
    privacyPolicy: 'سياسة الخصوصية',
    hotThings: 'أشياء ساخنة',
    dilf: 'DILF',
    plans: 'خطط الذكاء الاصطناعي',
    personal: 'شخصي',
    achievements: 'الإنجازات',
  },
  userField: {
    consentNewsletter: 'أريد تلقي النشرة الإخبارية',
    consentPrivacyPolicy: 'أوافق على سياسة الخصوصية',
    consentChildSoul: 'روح طفلي البكر',
    countryCode: 'البلد',
    dateOfBirth: 'تاريخ الميلاد',
    dateOfBirthYear: 'السنة',
    dateOfBirthMonth: 'الشهر',
    dateOfBirthDay: 'اليوم',
    email: 'البريد الإلكتروني',
    firstName: 'الاسم الأول',
    gender: 'الجنس',
    lastName: 'اسم العائلة',
    nickname: 'اللقب',
    password: 'كلمة المرور',
    passwordStrength: 'قوة كلمة المرور',
    passwordConfirmation: 'تأكيد كلمة المرور',
    phoneNumber: 'رقم الهاتف',
    phoneNumberCountryCode: 'رمز البلد',
    phoneNumberAreaCode: 'رمز المنطقة',
    phoneNumberDecrease: 'تقليل رقم الهاتف',
    phoneNumberIncrease: 'زيادة رقم الهاتف',
    rememberMe: 'تذكرني',
    username: 'اسم المستخدم',
  },
  gender: {
    alien: 'فضائي',
    chymera: 'كيميرا',
    cyborg: 'سايبورغ',
    female: 'أنثى',
    male: 'ذكر',
    other: 'آخر',
    robot: 'روبوت',
  },
  share: {
    modal: {
      title: 'شارك هذه الصفحة',
      description:
        'انشر البؤس! تأكد من فرض هذا الموقع المزعج بشكل مؤلم على أصدقائك أيضاً — لماذا تعاني وحدك بينما يمكنك سحبهم معك؟',
    },
  },
  messages: {
    errors: {
      e404title: 'خطأ 404',
      e404description: 'الصفحة غير موجودة، كيف يمكن أن يحدث هذا',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'مهلاً، لا يمكنك النقر بزر الماوس الأيمن هنا!',
  },
  language: {
    label: 'اللغة',
  },
  themeSwitch: {
    label: 'تبديل المظهر',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
  },
} satisfies AppTranslationShape;
