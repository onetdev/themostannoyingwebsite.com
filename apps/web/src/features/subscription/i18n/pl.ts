import socialProofVariants from './purchase-proof-variants/pl';

export default {
  landing: {
    headline: 'Ostateczne ulepszenie AI *',
    disclaimer: {
      title: '* ZASTRZEŻENIE!',
      description:
        'Wszystko na tej stronie jest w 100% fałszywe. Te pakiety nie istnieją, a ich zakup jest niemożliwy, ponieważ nie mamy procesora płatności, ani nawet prawdziwego zaplecza (backendu).',
    },
    urgency: {
      title: 'OFERTA LIMITOWANA CZASOWO!',
      description:
        'Pozostało {timer}, zanim te ogromne rabaty znikną na dobre. To jedyna taka okazja w życiu, nie zawiedź swoich wnuków!',
      compact: 'OFERTA LIMITOWANA! -{discount}% {timer}',
      expired: 'PRZYKRO NAM! Właśnie przegapiłeś wyprzedaż!',
    },
    billing: {
      monthly: 'Miesięcznie',
      yearly: 'Rocznie',
      biyearly: '2 lata',
      cycle: {
        monthly: 'rozliczane miesięcznie',
        yearly: 'rozliczane co rok',
        biyearly: 'rozliczane co 2 lata',
      },
      chargeDisclaimer: 'Dzisiaj zostaniesz obciążony kwotą {amount}',
    },
    mostPopular: 'Most Popular',
    pricePerMonth: '{price}/mies.',
    discount: '-{amount}%',
    table: {
      features: 'Funkcje',
    },
    features: {
      lowTierLimits: 'Ograniczone w każdy możliwy sposób',
      superSlowSpeed: 'Celowo spowolnione',
      adSupported: 'Z reklamami (mnóstwem reklam)',
      ramPriceSpike: 'Podbijanie cen RAM',
      gpuPriceSpike: 'Podbijanie cen GPU',
      creativeMath: 'Kreatywna arytmetyka (1+1=5)',
      fakeFacts: 'W 100% pewne kłamstwa',
      imaginarySources: 'Wyimaginowane cytaty',
      heavySighs: 'Słyszalne cyfrowe wzdychanie',
      judgmentalEllipses: 'Oceniające wielokropki...',
      submissive: 'Wszystko, co robisz, jest NIESAMOWITE',
      exEmails: 'E-maile do byłych o 3 rano',
    },
    packages: {
      poorified: {
        title: 'Super Uboga Podstawa',
        description:
          'Nasza najskromniejsza oferta. Tak podstawowa, że sprawia, iż połączenie dial-up wygląda jak światłowód. Oczekuj ciągłego buforowania i osądów moralnych ze strony naszej AI.',
      },
      sufficient: {
        title: 'Ledwie Wystarczający Premium',
        description:
          'Idealny punkt frustracji. Wystarczająco dużo, by Cię irytować, ale za mało, by faktycznie być użytecznym. Teraz z cyfrowym wzdychanie w wersji premium.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'Ostateczny szczyt cyfrowej niedoli. Teraz z 400% większą liczbą niepotrzebnych funkcji i automatycznymi e-mailami z żalami o 3 rano wysyłanymi do Twojej eks.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed:
      '{name} z lokalizacji {location} właśnie zasubskrybował {plan}!',
    variants: socialProofVariants,
  },
};
