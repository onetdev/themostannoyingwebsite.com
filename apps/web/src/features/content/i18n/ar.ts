import type { ContentI18nShape } from '../types';

export default {
  paywall: {
    overlay: {
      title:
        'عليك إما دفع {price}/ساعة مع التزام لمدة 24 شهراً لرؤية الفقرة التالية أو الاستمرار في النقر على الزر الثانوي.',
      disclaimer:
        'قد لا يكون الأمر آمناً وقانونياً تماماً، ولكن هذا لا يهم لأنك لا تستطيع الدفع فعلياً على هذا الموقع.',
      confirm: 'ادفع! قانوني وآمن 100%',
      cancel: 'أعطني أشياء مجانية بالمجان',
    },
  },
  article: {
    coverImage: 'صورة الغلاف',
    published: 'نُشر في {date}',
    moreContentScroll: 'هناك المزيد من الماضي، مرر لأسفل!',
  },
  search: {
    placeholder: 'بحث...',
    noResults: 'لم يتم العثور على نتائج',
    resultMeta:
      'البحث عن "{query}" استغرق {time} مللي ثانية ووجد {count} من النتائج',
    searching: 'جاري البحث',
    error: 'فشل البحث، يرجى المحاولة مرة أخرى لاحقاً',
    peopleAlsoSearched: 'بحث الناس أيضاً عن:',
    topSearchVariants: {
      variant_001: 'هل تعطش الأسماك',
      variant_002: 'كلمات أغنية الباستا',
      variant_003: 'هل ينفد بوق السيارات',
      variant_004: 'الإنترنت لا يعمل',
      variant_005: 'هل يمكن لفيسبوك التجسس عبر هاتفك',
      variant_006: 'لماذا أشتم رائحة بنسات',
      variant_007: 'هل يمكنك السباحة في الجيلي',
      variant_008: 'كيف أخبر شخصاً بلباقة أن رائحته مثل البصل',
      variant_009: 'لا أستطيع رؤية انعكاسي في المرآة',
      variant_010: 'اختراع الكهرباء',
      variant_011: 'افرك خبزه',
      variant_012: 'ميم وضفدع',
      variant_013: 'الأخ المستنقع',
    },
  },
  hotThings: {
    playVideo: 'تشغيل الفيديو',
    videoPlaybackFailed: 'فشل تشغيل الفيديو',
    pictureOfYou: 'صورة لك',
    hotThingsVtt: 'العربية',
  },
} satisfies ContentI18nShape;
