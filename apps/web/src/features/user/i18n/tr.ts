export default {
  userPreferences: {
    title: 'Tercihler',
    colorScheme: 'Tema / Renk şeması',
    darkMode: 'Karanlık mod',
    reducedMotion: 'Azaltılmış hareket',
    reducedMotionHelp:
      'İşletim sistemi veya tarayıcı ayarlarınızdan değiştirilebilir, değiştirdikten sonra sayfayı yenilemeniz gerekebilir.',
    enableSound: 'Ses',
    adultFilter: 'Yetişkin içerikleri filtrele',
  },
  userGrants: {
    title: 'Onay ve izinler',
    permissionDisclaimer:
      'İzin ayarları tarayıcı tarafından yönetilir; temayı değiştirmek isterseniz bunu tarayıcınızdaki site ayarlarından yapabilirsiniz.',
    essentialCookies: 'Zorunlu çerezlere izin ver',
    notificationPermission: 'Bildirim izni',
    locationPermission: 'Konum izni',
  },
  optionalPainPoints: {
    title: 'İsteğe bağlı acı noktaları',
    categories: {
      browser: 'Tarayıcı ve Sekme',
      visual: 'Görsel Engeller',
      ads: 'Reklam ve Paraya Dönüştürme',
      interactivity: "Pop-up'lar ve Etkileşim",
    },
    screensaverTimeout: 'Zaman aşımı',
    screensaverVariant: 'Varyant',
    screensaverVariantOptions: {
      bouncingLogo: 'Zıplayan Logo',
      maze: '3D Labirent 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 saniye',
      '30': '30 saniye',
      '60': '1 dakika',
      '300': '5 dakika',
      '900': '15 dakika',
    },
    gifts: {
      detectAdblocker: 'Reklam engelleyiciyi algıla',
      flaps: 'Arka plan reklam kanatları',
      oneByOne: 'Teke tek reklam blokları',
    },
    achievementNotifications: 'Başarım bildirimleri',
    clipboardMarker: 'Pano işareti',
    contentPaywall: 'İçerik ödeme duvarı',
    deadPixel: 'Ölü piksel',
    disableContextMenu: 'Sağ tık menüsünü devre dışı bırak',
    exitPrompt: 'Çıkış uyarısı',
    historySpam: "Geçmiş spam'i",
    mockChat: 'Balon sohbet',
    newsletterModal: 'Bülten pop-up penceresi',
    notifications: 'Bildirimler',
    screensaver: 'Ekran koruyucu',
    pageTitleInactiveArrayPaged: 'Sekme aktif değilken alternatif başlık',
    searchDelay: 'Sahte arama gecikmesi',
    wheelOfFortune: 'Çarkıfelek',
    stickyVideo: 'Yapışkan video',
  },
  optionalPainPointsHints: {
    screensaver:
      'Belirli bir süre tam hareketsizlikten sonra kullanıcı tarafından seçilen bir ekran koruyucuyu tetikler.',
    gifts: {
      detectAdblocker:
        'Reklam engelleyici algılanırsa büyük kırmızı bir başlık gösterir.',
      flaps:
        'Sayfanın yanlarında tıklanabilen ve farklı sayfalara yönlendiren reklam kanatları gösterir.',
      oneByOne: 'Genellikle ana sayfadaki animasyonlu bir reklamı kapsar.',
    },
    achievementNotifications:
      'Yeni bir başarımı her açtığınızda bir bildirim görüntüler. İlerleme her zaman arka planda takip edilir.',
    clipboardMarker:
      'Web sitesinden metin kopyaladığınızda sonuna bir "Daha fazlası için..." bağlantısı ekler.',
    contentPaywall:
      'Bazı içeriklerde sahte bir ödeme duvarı katmanı gösterir, yine de içeriği görebilirsiniz.',
    deadPixel:
      'Sizi sinir etmek için ekranınıza birkaç sahte "ölü" piksel yerleştirir.',
    disableContextMenu:
      'Sağ tık menüsünü kullanmanızı engeller ve bunun yerine bir uyarı görüntüler.',
    exitPrompt:
      'Sekmeyi kapatmaya veya sayfadan ayrılmaya çalışırken "Ayrılmak istediğinizden emin misiniz?" uyarısı gösterir.',
    historySpam:
      'Tarayıcı geçmişinizi sahte girişlerle doldurur, böylece kolayca geri dönemezsiniz. Bu, arama motoru sonuçlarına dönmeyi zahmetli hale getirebilir.',
    mockChat:
      'Yalnızca kapattığınızda size mesaj gönderen ve bu sırada sürekli "temsilci yazıyor" uyarısı veren sinir bozucu bir "insan" sohbet balonu gösterir.',
    newsletterModal:
      'Özellikle sayfa hareketsizlikten (sekme değiştirme) geri geldiğinde periyodik olarak bir bülten abonelik penceresi gösterir.',
    notifications: 'Bildirim izinleri ister ve sahte bildirimler gösterir.',
    pageTitleInactiveArrayPaged:
      'Sekme aktif olmadığında sekme başlığını dikkat çekici bir şeye dönüştürür.',
    searchDelay: 'Tüm aramalara sahte ve uzun bir yükleme gecikmesi ekler.',
    wheelOfFortune:
      'Size kesinlikle işe yaramaz ödüller veren sahte bir "Çarkıfelek" penceresi gösterir.',
    stickyVideo:
      'Siz sayfayı kaydırdıkça sizi takip eden yapışkan bir video oynatıcı gösterir.',
  },
  mandatoryExperienceFlags: {
    title: 'Zorunlu deneyim',
    impossibleLogin: 'İmkansız giriş',
    impossibleSignup: 'İmkansız kayıt',
    impossiblePasswordReminder: 'İmkansız şifre hatırlatıcısı',
    unreasonableContent: 'Mantıksız içerik',
    flaimYourPhone: 'Telefonunuzu alevlendirin',
    fakeAiSubscription: 'Sahte yapay zeka abonelik planları',
  },
  runtimeInfo: {
    title: 'Bu oturum hakkında',
    disclaimer:
      'Aşağıda listelenen bilgiler, mevcut tarayıcı oturumu için hata ayıklama bilgileri işlevi görür (sayfayı yenilerseniz her şey sıfırlanır). Arka planda bu değerlerin neyin nasıl olduğu üzerinde büyük etkisi vardır.',
    startedAgo: 'Oturum başladı',
    visibilitySeconds: 'Odakta geçirilen süre',
    isDocumentVisible: 'Şu anda odakta',
    navigationCount: 'Gezinme sayısı',
    userActivation: 'İlk kullanıcı işlemi',
    lastActivation: 'Son kullanıcı etkinliği',
    flaimSurveyResult: 'Flaim anket sonucu',
    adblockerSuspected: 'Reklam engelleyiciden şüpheleniliyor',
    adblockerNotDetected: 'Reklam engelleyici algılanmadı',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, burada olmaman gerekiyordu 😡',
  },
  notification: {
    modal: {
      title: 'Olamaz, bildirim izni nerede!?!',
      description:
        'Size bazen bildirim göndermek istiyoruz. Bu web sitesine tarayıcınızın ayarlarından bildirim izni verebilirsiniz. Lütfen yapar mısın? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Acı seviyesi',
      railTitle: 'Acı seviyesi kaydırıcı rayı',
      clamps: {
        from_0: 'Masum',
        from_10: 'Biraz tuhaf, değil mi?',
        from_20: 'Hafif sinir bozucu',
        from_30: 'Birazcık lanetli',
        from_40: 'Çok spesifik bir şekilde huzursuz edici',
        from_50: 'Tam kıvamında',
        from_60: 'Ortalamanın üzerinde tolerans',
        from_70: 'Köpek dışkısına çıplak ayakla basmak',
        from_80: 'Sınırda mazoşist',
        from_90: 'Kabuslar mı? Abone olundu.',
        from_100: 'Maksimum Acı',
      },
    },
  },
};
