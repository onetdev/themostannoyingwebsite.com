import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: 'En Üst Düzey Yapay Zeka Güncellemesi *',
    disclaimer: {
      title: '* FERAGATNAME!',
      description:
        "Bu sayfadaki her şey %100 sahtedir. Bu paketler mevcut değildir ve ödeme işlemcimiz, hatta gerçek bir backend'imiz bile olmadığı için bunları satın almak imkansızdır.",
    },
    urgency: {
      title: 'SINIRLI SÜRELİ TEKLİF!',
      description:
        'Bu devasa indirimlerin sonsuza dek kaybolmasına {timer} kaldı. Bu hayatta bir kez karşınıza çıkacak bir fırsat, torunlarınızı hayal kırıklığına uğratmayın!',
      compact: 'SINIRLI TEKLİF! -%{discount} {timer}',
      expired: 'ÜZGÜNÜZ! İndirimi az önce kaçırdınız!',
    },
    billing: {
      monthly: 'Aylık',
      yearly: 'Yıllık',
      biyearly: '2 Yıllık',
      cycle: {
        monthly: 'aylık faturalandırılır',
        yearly: 'her yıl faturalandırılır',
        biyearly: 'her 2 yılda bir faturalandırılır',
      },
      chargeDisclaimer: 'Bugün sizden {amount} tahsil edilecek',
    },
    mostPopular: 'En Popüler',
    pricePerMonth: '{price}/ay',
    discount: '-%{amount}',
    status: {
      outOfStock: 'Stokta yok',
    },
    table: {
      features: 'Özellikler',
    },
    cancellation: {
      link: 'Aboneliği İptal Et',
    },
    features: {
      lowTierLimits: 'Her yönden sınırlı',
      superSlowSpeed: 'Kasten yavaş',
      adSupported: 'Reklam destekli (Hem de çok fazla)',
      ramPriceSpike: 'RAM fiyatlarını uçurur',
      gpuPriceSpike: 'GPU fiyatlarını uçurur',
      creativeMath: 'Yaratıcı Aritmetik (1+1=5)',
      fakeFacts: '%100 Kendinden Emin Yalanlar',
      imaginarySources: 'Hayali Kaynaklar',
      heavySighs: 'Duyulabilir Dijital İç Çekişler',
      judgmentalEllipses: 'Yargılayıcı Üç Noktalar...',
      submissive: 'Yaptığınız her şey HARİKA',
      exEmails: 'Eski sevgilinize sabaha karşı 3 e-postaları',
    },
    packages: {
      poorified: {
        title: 'Sefil Temel Paket',
        description:
          'En mütevazı teklifimiz. O kadar temel ki çevirmeli bağlantıyı fiber gibi gösterir. Yapay zekamızdan sürekli ara belleğe alma ve ahlaki yargılama bekleyin.',
      },
      sufficient: {
        title: 'Zar Zor Yeterli Premium',
        description:
          'Frustrasyonun tam ortası. Sizi sinir etmeye yetecek kadar ama aslında işe yaramayacak kadar az. Şimdi premium dijital iç çekişlerle birlikte.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'Dijital sefaletin zirvesi. Şimdi %400 daha fazla gereksiz özellik ve eski sevgilinize gönderilen otomatik sabaha karşı 3 pişmanlık e-postalarıyla birlikte.',
      },
    },
  },
  specialDeal: {
    headline: 'BEKLE! GİTME! BİR HEDİYEMİZ VAR! 🎁',
    description:
      'Gitmek istediğinizi fark ettik. Söylediğimiz bir şey miydi? Yargılayıcı üç noktalar mıydı? Değişebiliriz! (Bekle, hayır, değişemeyiz).',
    offer:
      'Teklif yoğun talep nedeniyle stokta kalmadı! Stok yenilenene kadar bu sayfada kalın!',
    backToCancellation: 'Hmm, beni iptal işlemine geri götür',
  },
  purchaseProofToast: {
    justSubscribed:
      '{location} konumundan {name}, {plan} paketine az önce abone oldu!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Abonelik iptali',
    },
    reasons: {
      title: 'Neden',
      description:
        'Aboneliğinizi korkakça iptal etmek istediğinize inanmak gerçekten zor. Neden???',
      list: [
        'MAW hayatımdaki tüm sorunları çözdü. Ancak üzüntüyü özlüyorum.',
        'Otomat makinesindeki bir rakun kadar mali disipline sahibim.',
        'Arkadaşlarım bundan ne kadar keyif aldığımı keşfetmeden önce iptal ediyorum.',
        'Bir çizgi film karakteri gibi bir kez daha sorunlarımdan kaçıyorum.',
        'Bilgisayarım için çok yorucu',
        'Bağlılık sorunları.',
        'Bu kadar kişisel gelişimle başa çıkamıyorum.',
        'Annem onun kredi kartını kullandığımı öğrendi',
      ],
    },
    essay: {
      title: 'Çıkış Mülakatı Makalesi',
      description:
        'Kararınızın kesin ve iyi düşünülmüş olduğundan emin olmak için lütfen deneyiminiz üzerine bir makale yazın (en az 3000 karakter). Bu, işleme alınmadan önce CEO’muz tarafından şahsen incelenecektir.',
      placeholder: '3000 karakterlik şaheserinizi buraya yazmaya başlayın...',
      characters: 'Karakter: {count} / 3000',
      action: {
        abort: 'İptali durdur',
        next: 'Zorunlu makalemi tamamladım ve bir sonraki doğrulama adımına geçmek istiyorum',
      },
    },
    valdo: {
      title: 'Adım 3: Işığın yolundan gidin',
      description:
        'Bu sayfada sadece bir tane gerçek abonelikten çıkma düğmesi var. Size rehberlik etmesi için içsel ışığınıza güvenin. Çalışanı bulamıyorsanız, evren nazikçe kalmanızı öneriyor olabilir.',
      buttonLabel: 'Abonelikten Çık',
      error: 'Yanlış düğme! Ücret uygulandı: {amount}',
    },
    upsell: {
      title: 'Bekle! Gitme! Lütfen bize bir şans daha ver!',
      description:
        'Gitmemeye çalıştığınızı fark ettik. "Platin Abonelikten Çıkma Koruması" planımıza ne dersiniz? Sadece gitmek isteyenler için mevcut.',
      promo: 'BÜYÜK FIRSAT!\n%99’A VARAN İNDİRİM!!!',
      action: {
        specialDeal: 'Özel teklifi istiyorum',
        stay: 'Evet, gitmemek istiyorum',
        next: 'Her şeye rağmen aboneliğimi iptal etmeyi hedefliyorum. Sorun sizde değil, bende.',
      },
    },
    email: {
      title: 'Siz kimsiniz?',
      label: 'İptal işlemi için e-posta adresinizi girin.',
      placeholder: 'sadik-musteri@themostannoyingwebsite.com',
      action: {
        discount: 'Biliyor musun, fikrimi değiştirdim, indirimi istiyorum!',
        next: 'Eminim, iptale devam edelim',
      },
    },
    confirmation: {
      title: 'FİNAL DOĞRULAMA GEREKLİ',
      description:
        'Talebiniz hazırlandı ancak güvenlik nedenleriyle ve yanlışlıkla abonelikten çıkmaları önlemek için fiziksel doğrulama sürecini tamamlamanız gerekiyor.',
      alert: {
        title: 'Talimatlar:',
        step1: 'Aşağıdaki "Doğrulama için yazdır" düğmesine tıklayın.',
        step2: 'Belgeyi fiziksel kağıda yazdırın.',
        step3: 'Belgeyi İKİ (2) tanık huzurunda imzalayın.',
        step4: 'Her iki tanığa da imzalattırın.',
        step5: 'İmzalı belgenin yüksek çözünürlüklü bir fotoğrafını çekin.',
        step6:
          'Fotoğrafı <email>support@themostannoyingwebsite.com</email> adresine e-posta ile gönderin',
        note: 'İşlemin 10^15 iş gününe kadar sürdüğünü lütfen unutmayın.',
      },
      action: {
        print: '🖨️ DOĞRULAMA İÇİN YAZDIR 🖨️',
        abort: 'Aboneliğimi Koru',
        upgrade: 'Şimdi Yükselt',
        specialDeal: 'Özel teklifi al',
      },
      alternative:
        'Alternatif olarak, fikrinizi değiştirdiyseniz (şiddetle tavsiye edilir):',
    },
    print: {
      title: 'Resmi Abonelikten Çıkma Talep Formu',
      documentId: 'Belge Kimliği: {id}',
      sections: {
        account: '1. HESAP BİLGİLERİ',
        details: '2. İPTAL DETAYLARI',
        signatures: '3. İMZALAR VE TANIKLAR',
      },
      fields: {
        email: 'E-posta Adresi:',
        date: 'Talep Tarihi:',
        reason: 'Ayrılma Temel Nedeni:',
        feedback: 'Detaylı Geri Bildirim:',
      },
      signatures: {
        subscriber: 'Abone İmzası',
        subscriberName: 'Abone Yazılı İsmi',
        witness1: 'Tanık 1 İmzası',
        witness1Name: 'Tanık 1 Yazılı İsmi',
        witness2: 'Tanık 2 İmzası',
        witness2Name: 'Tanık 2 Yazılı İsmi',
        dateLabel: 'Tarih: ____________________',
      },
      footer:
        'Bu gerçek bir belge değildir, trendlerin bir başka satirik yansımasıdır. Daha fazla bilgi için themostannoyingwebsite.com/tr/terms-of-use ve themostannoyingwebsite.com/tr/privacy-policy adreslerini ziyaret edin.',
    },
  },
} satisfies SubscriptionI18nShape;
