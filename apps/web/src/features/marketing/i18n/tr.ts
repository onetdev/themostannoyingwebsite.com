import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/tr';

export default {
  dilf: {
    title: 'DILF',
    fullTitle:
      "DILF - Donut I'd Like to Feast On (Ziyafet Çekmek İstediğim Donut)",
    description:
      'Bölgenizdeki en lezzetli, en sıcak, en bekar ve en dayanılmaz donutları arıyorsanız mükemmel yerdesiniz. Gerçek aşkınızı bulma zorluğunu üstlenmeye hazır mısınız? Hangisinin sizin için olduğunu keşfetmek için buradaki donutlardan herhangi birine tıklayın.',
    flapLeft: 'DILF. Bölgenizdeki ateşli bekar donutlar',
    flapRight: 'DILF. Yakınınızdaki en lezzetli donutlar',
    finderOverlayTitle: 'Donutunu bul',
  },
  wanPhone: {
    title: 'Tebrikler! Bir telefon kezandınız! Hemen eleyn!',
    survey: {
      questionVariants,
      description:
        'Bu kısa anketi doldurun ve yeni telefonunuzu elemak için bir şans yakalayın! Titiz ve hızlı olun ama çok da hızlı değil.',
      result: {
        cheatDetected: {
          text: 'Hile tespit edildi! Telefonunuzu elemanıza izin verilmiyor.',
          callToAction: 'Ana sayfaya dön',
        },
        completed: {
          text: 'Katıldığınız için teşekkürler! Maalesef şu anda telefon elelamıyor.',
          callToAction: 'Ana sayfaya dön',
        },
        lost: {
          text: 'Hay aksi, birkaç cevabı kaçırdınız. Ne yazık!',
          callToAction: 'Ana sayfaya dön',
        },
        timeout: {
          text: 'Üzgünüm, anketi zamanında bitirememişsiniz gibi görünüyor.',
          callToAction: 'Ana sayfaya dön',
        },
      },
    },
  },
  suspectBar: {
    title: 'Reklam engelleyici şüphesi!',
    description:
      'Görünüşe göre bir reklam engelleyici kullanıyorsunuz. Bu biraz garip değil mi? Büyük fırsatları kaçırıyorsunuz! Lütfen kapatmayı düşünün. O zamana kadar, bu siteyi her ziyaret ettiğinizde altta bu kocaman kırmızı başlığı göreceksiniz. Ve lütfen TAMAM butonunu kullanarak da kapatmayın. Şerefe!',
  },
  newsletterModal: {
    title: 'Bültenimize katılın!',
    description:
      'Premium bültenimiz, gelen kutunuza inanılmaz miktarda değer getirir. Gerçek fark yaratan içgörüleri kaçırmayın!',
    placeholder: 'E-postanızı girin',
    onlySpamsLabel: 'Ayrıca OnlySpams almak istiyorum (Önerilir)',
    onlySpamsDetails: '(detaylar)',
    initialConfirm: 'Abone Ol',
    initialCancel: 'Abone Olma',
    useFormActions: 'Lütfen bunun yerine ilgili butonu kullanın',
    confirmations: {
      confirmation_001: {
        text: 'Bu önemli ve zorlu kararı tam olarak değerlendirmek için yeterli zaman ayırmamış olabileceğinizi görmekten üzüntü duyuyoruz.',
        confirm: 'Düşündüm, hala istiyorum',
        cancel: 'Haklısınız, iptal et',
      },
      confirmation_002: {
        text: 'Abone olduğunuzu gördüğümüz için üzgünüz, sizi hiç abone olmamanın sevinciyle ödüllendirebilir miyiz?',
        confirm: 'Hayır teşekkürler',
        cancel: 'Ödülümü istiyorum!',
      },
      confirmation_003: {
        text: 'Bu bülteni atlamayı hiç düşündünüz mü?',
        confirm: 'Hayır',
        cancel: 'Evet',
      },
      confirmation_004: {
        text: 'Bu bültene abone olmanın olumsuz yan etkileri olabilir. Hala var mısınız?',
        confirm: 'Yan etkileri kabul ediyorum',
        cancel: 'Beni buradan çıkarın',
      },
    },
  },
  wheelOfFortune: {
    title: 'Şans çarkı',
    spinStart: 'Buraya Tıklayın veya Dokunun!',
    spinWin: 'Kazandınız! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Ömür boyu bedava bira',
      worldPeace: 'Dünya barışı',
      absolutelyNothing: 'Kesinlikle hiçbir şey',
      complimentaryOtter: 'Eşantiyon su samuru',
      fake70Discount: 'Sahte %70 indirim',
    },
    wheelTitle: 'Şans çarkı',
  },
  onlySpams: {
    title: 'OnlySpams - Premium Bülten',
    description:
      'Dünyanın en seçkin gelen kutusu meraklıları çevresine katılın. Sadece e-posta göndermiyoruz; duygular, fırsatlar ve çok özel tıbbi tavsiyeler gönderiyoruz.',
    testimonials: {
      title: '"Abonelerimiz" ne diyor?',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Örnek Değer Katımları',
      subject: 'Konu:',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Şimdi Abone Ol',
  },
} satisfies MarketingI18nShape;
