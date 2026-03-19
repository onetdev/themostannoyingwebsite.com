import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

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
    mostPopular: 'Najpopularniejszy',
    pricePerMonth: '{price}/mies.',
    discount: '-{amount}%',
    status: {
      outOfStock: 'Brak w magazynie',
    },
    table: {
      features: 'Funkcje',
    },
    cancellation: {
      link: 'Anuluj subskrypcję',
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
  specialDeal: {
    headline: 'CZEKAJ! NIE ODCHODŹ! MAMY PREZENT! 🎁',
    description:
      'Zauważyliśmy, że próbujesz wyjść. Czy to coś, co powiedzieliśmy? Czy to te oceniające wielokropki? Możemy się zmienić! (Czekaj, nie, nie możemy).',
    offer:
      'Oferta wyprzedana z powodu dużego zainteresowania! Zostań na tej stronie do czasu uzupełnienia zapasów!',
    backToCancellation: 'Hmm, wróć do anulowania',
  },
  purchaseProofToast: {
    justSubscribed:
      '{name} z lokalizacji {location} właśnie zasubskrybował {plan}!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: 'Anulowanie subskrypcji',
    },
    reasons: {
      title: 'Powód',
      description:
        'Naprawdę trudno uwierzyć, że chcesz tchórzliwie anulować subskrypcję. Dlaczego???',
      list: [
        'MAW rozwiązało wszystkie moje problemy w życiu. Jednak tęsknię za smutkiem.',
        'Mam dyscyplinę finansową szopa pracza w automacie z przekąskami.',
        'Anuluję, zanim moi znajomi odkryją, jak bardzo mi się to podobało.',
        'Znowu uciekam przed problemami jak postać z kreskówki.',
        'Zbyt obciążające dla mojego komputera',
        'Problemy z zaangażowaniem.',
        'Po prostu nie radzę sobie z tak dużym rozwojem osobistym.',
        'Moja mama dowiedziała się, że używam jej karty kredytowej',
      ],
    },
    essay: {
      title: 'Esej z rozmowy końcowej',
      description:
        'Aby upewnić się, że Twoja decyzja jest ostateczna i dobrze przemyślana, napisz esej o swoich doświadczeniach (min. 3000 znaków). Zostanie on osobiście sprawdzony przez naszego CEO przed przetworzeniem.',
      placeholder: 'Zacznij pisać swoje 3000-znakowe arcydzieło tutaj...',
      characters: 'Znaki: {count} / 3000',
      action: {
        abort: 'Zrezygnuj z anulowania',
        next: 'Ukończyłem obowiązkowy esej i chcę przejść do następnego kroku weryfikacji',
      },
    },
    valdo: {
      title: 'Krok 3: Kieruj się światłem',
      description:
        'Na tej stronie jest tylko jeden prawdziwy przycisk rezygnacji z subskrypcji. Zaufaj swojemu wewnętrznemu światłu, aby Cię poprowadziło. Jeśli nie możesz znaleźć tego działającego, być może wszechświat delikatnie sugeruje, abyś został.',
      buttonLabel: 'Zrezygnuj z subskrypcji',
      error: 'Zły przycisk! Nałożono opłatę: {amount}',
    },
    upsell: {
      title: 'Czekaj! Nie odchodź! Daj nam jeszcze jedną szansę, proszę!',
      description:
        'Zauważyliśmy, że starasz się nie odchodzić. Co powiesz na nasz plan „Platynowa Ochrona Przed Rezygnacją”? Jest dostępny tylko dla osób, które chcą odejść.',
      promo: 'WIELKA OKAZJA!\nDO 99% ZNIŻKI!!!',
      action: {
        specialDeal: 'Chcę ofertę specjalną',
        stay: 'Tak, chcę nie odchodzić',
        next: 'Mimo wszystko nadal dążę do anulowania subskrypcji. To ja jestem problemem, nie wy.',
      },
    },
    email: {
      title: 'Kim jesteś?',
      label: 'Podaj swój adres e-mail, aby kontynuować proces anulowania.',
      placeholder: 'lojalny-klient@themostannoyingwebsite.com',
      action: {
        discount: 'Wiesz co, zmieniłem zdanie, chcę zniżkę!',
        next: 'Jestem pewien, kontynuujmy anulowanie',
      },
    },
    confirmation: {
      title: 'WYMAGANA OSTATECZNA WERYFIKACJA',
      description:
        'Twój wniosek został przygotowany, ale ze względów bezpieczeństwa i aby zapobiec przypadkowemu anulowaniu subskrypcji, musisz teraz ukończyć proces weryfikacji fizycznej.',
      alert: {
        title: 'Instrukcje:',
        step1: 'Kliknij przycisk „Drukuj do weryfikacji” poniżej.',
        step2: 'Wydrukuj dokument na papierze.',
        step3: 'Podpisz dokument w obecności DWÓCH (2) świadków.',
        step4: 'Poproś obu świadków o podpisanie.',
        step5: 'Zrób zdjęcie podpisanego dokumentu w wysokiej rozdzielczości.',
        step6:
          'Wyślij zdjęcie e-mailem na adres <email>support@themostannoyingwebsite.com</email>',
        note: 'Pamiętaj, że przetwarzanie trwa do 10^15 dni roboczych.',
      },
      action: {
        print: '🖨️ DRUKUJ DO WERYFIKACJI 🖨️',
        abort: 'Zachowaj moją subskrypcję',
        upgrade: 'Ulepsz teraz',
        specialDeal: 'Odbierz ofertę specjalną',
      },
      alternative: 'Alternatywnie, jeśli zmieniłeś zdanie (wysoce zalecane):',
    },
    print: {
      title: 'Oficjalny formularz rezygnacji z subskrypcji',
      documentId: 'ID dokumentu: {id}',
      sections: {
        account: '1. INFORMACJE O KONCIE',
        details: '2. SZCZEGÓŁY ANULOWANIA',
        signatures: '3. PODPISY I ŚWIADKOWIE',
      },
      fields: {
        email: 'Adres e-mail:',
        date: 'Data złożenia wniosku:',
        reason: 'Główny powód odejścia:',
        feedback: 'Szczegółowa opinia:',
      },
      signatures: {
        subscriber: 'Podpis subskrybenta',
        subscriberName: 'Imię i nazwisko subskrybenta (drukowanymi literami)',
        witness1: 'Podpis świadka 1',
        witness1Name: 'Imię i nazwisko świadka 1 (drukowanymi literami)',
        witness2: 'Podpis świadka 2',
        witness2Name: 'Imię i nazwisko świadka 2 (drukowanymi literami)',
        dateLabel: 'Data: ____________________',
      },
      footer:
        'To nie jest prawdziwy dokument, tylko kolejna satyryczna refleksja nad trendami. Zobacz themostannoyingwebsite.com/pl/terms-of-use i themostannoyingwebsite.com/pl/privacy-policy, aby uzyskać więcej informacji.',
    },
  },
} satisfies SubscriptionI18nShape;
