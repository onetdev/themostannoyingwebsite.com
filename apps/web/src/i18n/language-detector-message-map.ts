type DetectorMessages = {
  detected: string;
  switch: string;
  stay: string;
};

export const LANGUAGE_DETECTOR_MESSAGE_MAP: Record<
  AppSupportedLocale,
  DetectorMessages
> = {
  en: {
    detected: 'Would you like to read it in English?',
    switch: 'Switch to English',
    stay: 'Stay in English',
  },

  hu: {
    detected: 'Magyarul olvasnád?',
    switch: 'Váltás magyarra',
    stay: 'Maradok magyarul',
  },

  zh: {
    detected: '想用中文阅读吗？',
    switch: '切换到中文',
    stay: '保持中文',
  },

  ar: {
    detected: 'هل تود قراءته بالعربية؟',
    switch: 'التبديل إلى العربية',
    stay: 'البقاء بالعربية',
  },

  de: {
    detected: 'Möchten Sie es auf Deutsch lesen?',
    switch: 'Zu Deutsch wechseln',
    stay: 'Auf Deutsch bleiben',
  },

  es: {
    detected: '¿Quieres leerlo en español?',
    switch: 'Cambiar a español',
    stay: 'Seguir en español',
  },

  fr: {
    detected: 'Voulez-vous le lire en français ?',
    switch: 'Passer en français',
    stay: 'Rester en français',
  },

  hi: {
    detected: 'क्या आप इसे हिंदी में पढ़ना चाहेंगे?',
    switch: 'हिंदी में बदलें',
    stay: 'हिंदी में ही रहें',
  },

  it: {
    detected: 'Vuoi leggerlo in italiano?',
    switch: 'Passa all’italiano',
    stay: 'Rimani in italiano',
  },

  ja: {
    detected: '日本語で読みますか？',
    switch: '日本語に切り替える',
    stay: '日本語のまま',
  },

  ko: {
    detected: '한국어로 읽으시겠습니까?',
    switch: '한국어로 전환',
    stay: '한국어 유지',
  },

  pl: {
    detected: 'Chcesz czytać po polsku?',
    switch: 'Przełącz na polski',
    stay: 'Pozostań przy polskim',
  },

  pt: {
    detected: 'Quer ler em português?',
    switch: 'Mudar para português',
    stay: 'Continuar em português',
  },

  ru: {
    detected: 'Хотите читать на русском?',
    switch: 'Переключиться на русский',
    stay: 'Остаться на русском',
  },

  tr: {
    detected: 'Türkçe okumak ister misiniz?',
    switch: 'Türkçeye geç',
    stay: 'Türkçe devam et',
  },
};
