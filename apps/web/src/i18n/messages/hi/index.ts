import achievements from '@/features/achievements/i18n/hi';
import auth from '@/features/auth/i18n/hi';
import humanVerification from '@/features/captcha/i18n/hi';
import comments from '@/features/comments/i18n/hi';
import commentVariants from '@/features/comments/i18n/hi/variants';
import content from '@/features/content/i18n/hi';
import disruptions from '@/features/disruptions/i18n/hi';
import funding from '@/features/funding/i18n/hi';
import marketing from '@/features/marketing/i18n/hi';
import monitoring from '@/features/monitoring/i18n/hi';
import subscription from '@/features/subscription/i18n/hi';
import support from '@/features/support/i18n/hi';
import user from '@/features/user/i18n/hi';
import common from './common';
import metadata from './metadata';
import variants from './variants';

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
  variants,

  // App level, shared translations
  app: {
    title: 'सबसे कष्टप्रद वेबसाइट',
    description:
      'इंटरनेट पर स्वयं घोषित सबसे कष्टप्रद वेबसाइट जिसमें आधुनिक वेबसाइटों की इतनी सारी घृणित विशेषताएं हैं कि आपको किसी बिंदु पर उल्टी भी हो सकती है।',
    recruiting:
      'आप जो यहाँ देखते हैं उसे और बढ़ाना चाहते हैं? शुरू करने के लिए हमारे <linkTag>GitHub</linkTag> रेपो पर जाएँ।',
    aiDisclose:
      'यह वेबसाइट रचनात्मक सामग्री और मीडिया के लिए जनरेटिव AI का उपयोग करती है। उपयोगी जानकारी के साथ कोई भी समानता विशुद्ध रूप से संयोग है।',
    copyright: '© {year} सबसे कष्टप्रद वेबसाइट। सर्वाधिकार सुरक्षित।',
    dataStorageDisclaimer:
      'गोपनीयता पहले: हम संवेदनशील फ़ॉर्म इनपुट या उपयोगकर्ता क्रेडेंशियल को स्थायी रूप से संग्रहीत नहीं करते हैं।',
    noWarranties:
      '"जैसा है" वैसा ही प्रदान किया गया है, बिना किसी वारंटी के। आपके खोए हुए समय या झुंझलाहट के लिए हम ज़िम्मेदार नहीं हैं।',
    translationDisclaimer:
      'यह दस्तावेज़ आधिकारिक अंग्रेजी संस्करण का अनुवाद है। किसी भी विसंगति के मामले में, अंग्रेजी संस्करण मान्य होगा। आप आधिकारिक संस्करण <linkTag>यहाँ</linkTag> पा सकते हैं।',
    cookieConsent:
      'यह वेबसाइट कुकीज़ का उपयोग करती है ताकि यह सुनिश्चित किया जा सके कि आपको हमारी वेबसाइट पर सबसे अच्छा अनुभव मिले। यह एक मज़ाक भी है इसलिए कई सुविधाएँ जानबूझकर खराब हैं या काम ही नहीं करती हैं। आप सेटिंग्स मेनू में अपने अनुभव और कुकी सेटिंग्स को कस्टमाइज़ कर सकते हैं।',
    exitPrompt:
      'आपके साथ कुछ बुरा होने से पहले मैं जाने पर पुनर्विचार करने की सलाह दूंगा। क्या आप सुनिश्चित हैं?',
    readMoreAt: 'और पढ़ें',
    virgin: {
      title: 'सभी अनुभव अक्षम करें',
      description:
        'अब सभी अनुभव अक्षम हैं। यदि आप इस पेज को केवल सामग्री के लिए साझा करना चाहते हैं तो बस इस URL को दूसरों को भेजें। यदि आपने अपना मन बदल लिया है, तो आप सेटिंग्स मेनू में सभी अनुभवों को फिर से सक्षम कर सकते हैं।',
    },
    toggleMenu: 'मेनू टॉगल करें',
    logo: 'MAW लोगो',
    logoAlt: '<the>सबसे</the> <most>कष्टप्रद</most> वेबसाइट',
    dismissBanner: 'बैनर हटाएं',
    contactForm: {
      title: 'आधिकारिक संपर्क फ़ॉर्म',
      subject: 'विषय',
      message: 'संदेश',
      send: 'भेजें',
      placeholderSubject: 'यह किसके बारे में है?',
      placeholderMessage: 'अपना संदेश यहाँ टाइप करें...',
      alternative:
        'वैकल्पिक रूप से, आप हमसे सीधे <linkTag>{email}</linkTag> पर संपर्क कर सकते हैं',
      intro: 'यदि आपके कोई प्रश्न या प्रतिक्रिया है तो बेझिझक हमसे संपर्क करें।',
      reportIssues:
        'यदि आपको कोई तकनीकी समस्या आती है या आप नए कष्टप्रद बिंदुओं का सुझाव देना चाहते हैं, तो कृपया <linkTag>GitHub पर उनकी रिपोर्ट करें</linkTag>।',
    },
  },
  navigation: {
    home: 'होम',
    about: 'हमारे बारे में',
    contact: 'संपर्क',
    donate: 'दान करें',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    signup: 'साइनअप',
    passwordReminder: 'पासवर्ड रिमाइंडर',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    search: 'खोजें',
    privacyPolicy: 'गोपनीयता नीति',
    hotThings: 'हॉट चीज़ें',
    dilf: 'DILF',
    plans: 'AI योजनाएं',
    personal: 'व्यक्तिगत',
    achievements: 'उपलब्धियां',
    admin: 'एडमिन',
    termsOfUse: 'उपयोग की शर्तें',
    onlySpams: 'OnlySpams',
    virgin: 'वर्जिन',
    flaimAPhone: 'एक फोन फ्लेम करें!',
  },
  userField: {
    consentNewsletter: 'मैं न्यूज़लेटर प्राप्त करना चाहता हूँ',
    consentPrivacyPolicy: 'गोपनीयता नीति स्वीकार करें',
    consentTermsOfUse: 'उपयोग की शर्तें स्वीकार करें',
    consentChildSoul: 'मेरे पहले बच्चे की आत्मा',
    countryCode: 'देश',
    dateOfBirth: 'जन्म तिथि',
    dateOfBirthYear: 'वर्ष',
    dateOfBirthMonth: 'माह',
    dateOfBirthDay: 'दिन',
    email: 'ईमेल',
    firstName: 'प्रथम नाम',
    gender: 'लिंग',
    lastName: 'अंतिम नाम',
    nickname: 'उपनाम',
    password: 'पासवर्ड',
    passwordStrength: 'पासवर्ड की ताकत',
    passwordConfirmation: 'पासवर्ड की पुष्टि',
    phoneNumber: 'फ़ोन नंबर',
    phoneNumberCountryCode: 'देश कोड',
    phoneNumberAreaCode: 'क्षेत्र कोड',
    phoneNumberDecrease: 'फ़ोन नंबर घटाएं',
    phoneNumberIncrease: 'फ़ोन नंबर बढ़ाएं',
    rememberMe: 'मुझे याद रखें',
    username: 'यूज़रनेम',
  },
  gender: {
    alien: 'एलियन',
    chymera: 'किमेरा',
    cyborg: 'साइबोर्ग',
    female: 'महिला',
    male: 'पुरुष',
    other: 'अन्य',
    robot: 'रोबोट',
  },
  share: {
    modal: {
      title: 'इस पेज को साझा करें',
      description:
        'पीड़ा फैलाएं! अपने दोस्तों पर भी इस कष्टदायक और घृणित वेबसाइट को थोपना सुनिश्चित करें - जब आप उन्हें भी अपने साथ नीचे खींच सकते हैं तो अकेले क्यों सहें?',
    },
  },
  messages: {
    errors: {
      e404title: 'त्रुटि 404',
      e404description: 'पेज नहीं मिला, ऐसा कैसे हो सकता है',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'अरे, आप यहाँ राइट क्लिक नहीं कर सकते!',
  },
  language: {
    label: 'भाषा',
    select: 'अपनी भाषा चुनें',
  },
  themeSwitch: {
    label: 'थीम बदलें',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
  },
} satisfies DeepPartial<AppTranslationShape>;
