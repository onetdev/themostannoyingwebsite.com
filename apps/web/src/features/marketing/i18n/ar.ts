import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/ar';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: 'DILF - دونات أود التهامها',
    description:
      'إذا كنت تبحث عن ألذ، وأكثر الدونات سخونة، وأكثرها جاذبية في منطقتك، فأنت في المكان المثالي. هل أنت مستعد لخوض تحدي العثور على حبك الحقيقي؟ انقر على أي من الدونات هنا لتكتشف أي واحدة مقدرة لك.',
    flapLeft: 'DILF. دونات ساخنة وعازبة في منطقتك',
    flapRight: 'DILF. ألذ دونات بالقرب منك',
    finderOverlayTitle: 'اعثر على الدونات الخاصة بك',
  },
  wanPhone: {
    title: 'تهانينا! لقد فست بهاتف! اطرب به الآن!',
    survey: {
      questionVariants,
      description:
        'أكمل هذا الاستطلاع السريع وقد تتاح لك فرصة الحصول على هاتفك الجديد! كن دقيقاً وسريعاً ولكن ليس سريعاً جداً.',
      result: {
        cheatDetected: {
          text: 'تم اكتشاف غش! لا يُسمح لك بالحصول على هاتفك.',
          callToAction: 'العودة إلى الرئيسية',
        },
        completed: {
          text: 'شكراً لمشاركتك! للأسف لا يمكن الحصول على الهاتف في هذا الوقت.',
          callToAction: 'العودة إلى الرئيسية',
        },
        lost: {
          text: 'يا للأسف، لقد فاتتك بعض الإجابات. يا له من عار!',
          callToAction: 'العودة إلى الرئيسية',
        },
        timeout: {
          text: 'عذراً، يبدو أنك لم تنهِ الاستطلاع في الوقت المحدد.',
          callToAction: 'العودة إلى الرئيسية',
        },
      },
    },
  },
  suspectBar: {
    title: 'اشتباه في وجود مانع إعلانات!',
    description:
      'يبدو أنك تستخدم مانع إعلانات. هذا غريب بعض الشيء، أليس كذلك؟ أنت تفوت الكثير! يرجى النظر في إيقافه. حتى ذلك الحين، سترى هذا الشريط الأحمر الكبير في الأسفل في كل مرة تزور فيها هذا الموقع. ويرجى عدم إغلاقه باستخدام زر موافق أيضاً. مع التحية!',
  },
  newsletterModal: {
    title: 'انضم إلى نشرتنا الإخبارية!',
    description:
      'نشرتنا الإخبارية المتميزة تجلب قدراً هائلاً من القيمة مباشرة إلى بريدك الوارد. لا تفوت الأفكار التي تحدث فرقاً حقيقياً!',
    placeholder: 'أدخل بريدك الإلكتروني',
    onlySpamsLabel: 'أريد أيضًا استلام OnlySpams (موصى به)',
    onlySpamsDetails: '(التفاصيل)',
    initialConfirm: 'اشتراك',
    initialCancel: 'عدم الاشتراك',
    useFormActions: 'يرجى استخدام الزر المناسب بدلاً من ذلك',
    confirmations: {
      confirmation_001: {
        text: 'نشعر بخيبة أمل لرؤية أنك ربما لم تحصل على وقت كافٍ للنظر بشكل كامل في هذا القرار المهم والصعب.',
        confirm: 'لقد فكرت في الأمر، ما زلت أرغب في ذلك',
        cancel: 'أنت محق، إلغاء',
      },
      confirmation_002: {
        text: 'نأسف لرؤيتك تشترك، هل يمكننا أن نمتعك بمزايا عدم كونك مشتركاً على الإطلاق؟',
        confirm: 'لا شكراً',
        cancel: 'أريد متعتي!',
      },
      confirmation_003: {
        text: 'هل فكرت في تخطي هذه النشرة الإخبارية؟',
        confirm: 'لا',
        cancel: 'نعم',
      },
      confirmation_004: {
        text: 'قد يكون للاشتراك في هذه النشرة الإخبارية آثار جانبية سلبية. هل ما زلت مهتماً؟',
        confirm: 'أقبل الآثار الجانبية',
        cancel: 'أخرجني من هنا',
      },
    },
  },
  wheelOfFortune: {
    title: 'عجلة الحظ',
    spinStart: 'انقر أو اضغط هنا!',
    spinWin: 'لقد فزت! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'بيرة مجانية مدى الحياة',
      worldPeace: 'السلام العالمي',
      absolutelyNothing: 'لا شيء على الإطلاق',
      complimentaryOtter: 'قندس مجاني',
      fake70Discount: 'خصم وهمي 70%',
    },
    wheelTitle: 'عجلة الحظ',
  },
  onlySpams: {
    title: 'OnlySpams - النشرة الإخبارية المتميزة',
    description:
      'انضم إلى الدائرة الأكثر حصرية من عشاق صناديق الوارد في العالم. نحن لا نرسل رسائل بريد إلكتروني فقط؛ بل نرسل مشاعر، وفرصاً، ونصائح طبية محددة للغاية.',
    testimonials: {
      title: 'ماذا يقول "مشتركونا"',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'أمثلة على القيمة المضافة',
      subject: 'الموضوع:',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'اشترك الآن',
  },
} satisfies MarketingI18nShape;
