import type { MonitoringI18nShape } from '../types';

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
    runtime: 'Çalışma Zamanı (Runtime) Store',
    monitoring: 'İzleme (Monitoring) Store',
    painPreferences: 'Ağrı Tercihleri Store',
    achievements: 'Başarımlar Store',
    userPreferences: 'Kullanıcı Tercihleri Store',
    userGrants: 'Kullanıcı İzinleri Store',
    appConfig: 'Uygulama Yapılandırması',
  },
} satisfies MonitoringI18nShape;
