import type { CommentsI18nShape } from '../../types';

export default {
  sectionTitle: 'कमेंट्स',
  formTitle: 'अपनी टिप्पणी जोड़ें',
  reply: 'जवाब दें',
  showReplies: '{count} जवाब दिखाएं',
  hideReplies: 'जवाब छिपाएं',
  disclaimer:
    'सभी कमेंट्स केवल मनोरंजन के लिए बनाए गए हैं और असली नहीं हैं। आप वास्तव में कोई टिप्पणी पोस्ट नहीं कर पाएंगे।',
  loginRequired: {
    title: 'लॉगिन आवश्यक है',
    description:
      'इस क्रिया को करने के लिए आपको लॉगिन होना चाहिए। कृपया जारी रखने के लिए लॉगिन करें या खाता बनाएं।',
    login: 'लॉगिन',
    cancel: 'रद्द करें',
  },
  form: {
    name: 'नाम',
    comment: 'टिप्पणी',
    submit: 'टिप्पणी सबमिट करें',
  },
} satisfies CommentsI18nShape;
