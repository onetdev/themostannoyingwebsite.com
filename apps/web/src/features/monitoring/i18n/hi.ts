export default {
  auth: {
    title: 'प्रतिबंधित पहुंच',
    description: 'डीबग डैशबोर्ड तक पहुंचने के लिए पासवर्ड दर्ज करें।',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: '••••••••',
    submit: 'डीबग मोड अनलॉक करें',
  },
  logout: 'लॉगआउट',
  internalOnly: 'केवल आंतरिक उपयोग के लिए',
  tabs: {
    stores: 'स्टोर इंस्पेक्टर',
    events: 'इवेंट टेस्टर',
    config: 'स्टैटिक कॉन्फ़िगरेशन',
  },
  eventTester: {
    title: 'इवेंट बस टेस्टर',
    commonEvents: 'सामान्य इवेंट्स',
    eventTypeLabel: 'इवेंट प्रकार',
    payloadLabel: 'पेलोड (JSON)',
    dispatch: 'डिस्पैच इवेंट',
  },
  eventHistory: {
    title: 'इवेंट इतिहास',
    enable: 'इवेंट इतिहास रिकॉर्डिंग सक्षम करें',
    clear: 'इतिहास साफ़ करें',
    table: {
      timestamp: 'टाइमस्टैम्प',
      type: 'प्रकार',
      payload: 'पेलोड',
    },
    empty: 'अभी तक कोई इवेंट कैप्चर नहीं किया गया है...',
    disabled: 'इवेंट इतिहास रिकॉर्डिंग अक्षम है।',
  },
  storeInspector: {
    runtime: 'रनटाइम स्टोर',
    monitoring: 'मॉनिटरिंग स्टोर',
    painPreferences: 'दर्द वरीयता (Pain Preferences) स्टोर',
    achievements: 'उपलब्धियां स्टोर',
    userPreferences: 'उपयोगकर्ता वरीयता स्टोर',
    userGrants: 'उपयोगकर्ता अनुदान (Grants) स्टोर',
    appConfig: 'ऐप कॉन्फ़िगरेशन',
  },
};
