export default {
  auth: {
    title: 'Kısıtlı Erişim',
    description: 'Hata ayıklama paneline erişmek için şifreyi girin.',
    passwordLabel: 'Şifre',
    passwordPlaceholder: '••••••••',
    submit: 'Hata Ayıklama Modunun Kilidini Aç',
  },
  logout: 'Çıkış Yap',
  internalOnly: 'Sadece Şirket İçi Kullanım',
  tabs: {
    stores: 'Store Müfettişi',
    events: 'Etkinlik Test Edici',
    config: 'Statik Yapılandırma',
  },
  eventTester: {
    title: 'Etkinlik Veri Yolu Test Edici',
    commonEvents: 'Genel Etkinlikler',
    eventTypeLabel: 'Etkinlik tipi',
    payloadLabel: 'Yük (JSON)',
    dispatch: 'Etkinliği Gönder',
  },
  eventHistory: {
    title: 'Etkinlik Geçmişi',
    enable: 'Etkinlik Geçmişi Kaydını Etkinleştir',
    clear: 'Geçmişi Temizle',
    table: {
      timestamp: 'Zaman Damgası',
      type: 'Tip',
      payload: 'Yük',
    },
    empty: 'Henüz bir etkinlik yakalanmadı...',
    disabled: 'Etkinlik geçmişi kaydı devre dışı.',
  },
  storeInspector: {
    runtime: 'Runtime Store',
    monitoring: 'Monitoring Store',
    painPreferences: 'Pain Preferences Store',
    achievements: 'Achievements Store',
    userPreferences: 'User Preferences Store',
    userGrants: 'User Grants Store',
    appConfig: 'Uygulama Yapılandırması',
  },
};
