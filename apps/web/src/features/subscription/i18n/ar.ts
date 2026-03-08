import type { SubscriptionI18nShape } from '../types';
import socialProofVariants from './purchase-proof-variants/ar';

export default {
  landing: {
    headline: 'ترقية الذكاء الاصطناعي القصوى *',
    disclaimer: {
      title: '* إخلاء مسؤولية!',
      description:
        'كل شيء في هذه الصفحة وهمي 100%. هذه الحزم غير موجودة، وشرائها مستحيل لأننا لا نملك معالج دفع، أو حتى خلفية برمجية حقيقية لهذا الغرض.',
    },
    urgency: {
      title: 'عرض لفترة محدودة!',
      description:
        'تبقى {timer} حتى تنتهي هذه الخصومات الضخمة للأبد. هذه فرصة لا تتكرر إلا مرة واحدة في العمر، لا تخذل أحفادك!',
      compact: 'عرض محدود! -{discount}% {timer}',
      expired: 'عذراً! لقد فاتك العرض للتو!',
    },
    billing: {
      monthly: 'شهرياً',
      yearly: 'سنوياً',
      biyearly: 'كل سنتين',
      cycle: {
        monthly: 'تتم الفوترة شهرياً',
        yearly: 'تتم الفوترة كل عام',
        biyearly: 'تتم الفوترة كل سنتين',
      },
      chargeDisclaimer: 'سيتم محاسبتك بمبلغ {amount} اليوم',
    },
    mostPopular: 'الأكثر شعبية',
    pricePerMonth: '{price}/شهر',
    discount: '-{amount}%',
    table: {
      features: 'المميزات',
    },
    features: {
      lowTierLimits: 'محدود في كل النواحي الممكنة',
      superSlowSpeed: 'بطيء عمداً',
      adSupported: 'مدعوم بالإعلانات (الكثير منها)',
      ramPriceSpike: 'زيادة أسعار الرام',
      gpuPriceSpike: 'زيادة أسعار معالج الرسوميات',
      creativeMath: 'حساب إبداعي (1+1=5)',
      fakeFacts: 'أكاذيب واثقة 100%',
      imaginarySources: 'اقتباسات وهمية',
      heavySighs: 'تنهيدات رقمية مسموعة',
      judgmentalEllipses: 'نقاط حكم مسبق...',
      submissive: 'كل ما تفعله رائع',
      exEmails: 'إرسال رسائل في الساعة 3 صباحاً لشركائك السابقين',
    },
    packages: {
      poorified: {
        title: 'الأساسي فائق الفقر',
        description:
          'عرضنا الأكثر تواضعاً. أساسي لدرجة أنه يجعل اتصال الدايل-أب يبدو كالألياف البصرية. توقع تخزيناً مؤقتاً مستمراً وحكماً أخلاقياً من ذكائنا الاصطناعي.',
      },
      sufficient: {
        title: 'المميز بالكاد كافٍ',
        description:
          'نقطة التوازن في الإحباط. كافٍ فقط لإبقائك منزعجاً ولكن ليس كافياً ليكون مفيداً فعلياً. الآن مع تنهيدات رقمية مميزة.',
      },
      delux: {
        title: 'ألترا بريميوم ديلوكس إليت برو ماكس',
        description:
          'القمة القصوى للبؤس الرقمي. الآن مع 400% من المميزات غير الضرورية ورسائل ندم آلية في الساعة 3 صباحاً تُرسل لشركائك السابقين.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{name} من {location} اشترك للتو في {plan}!',
    variants: socialProofVariants,
  },
} satisfies SubscriptionI18nShape;
