import socialProofVariants from './purchase-proof-variants/tr';

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
    table: {
      features: 'Özellikler',
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
  purchaseProofToast: {
    justSubscribed:
      '{location} konumundan {name}, {plan} paketine az önce abone oldu!',
    variants: socialProofVariants,
  },
};
