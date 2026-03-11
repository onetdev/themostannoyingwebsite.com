import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/pl';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: "DILF - Donut I'd Like to Feast On",
    description:
      'Jeśli szukasz najsmaczniejszych, najgorętszych, wolnych i najbardziej nieodpartych pączków w Twojej okolicy, jesteś w idealnym miejscu. Czy jesteś gotowy podjąć wyzwanie znalezienia swojej prawdziwej miłości? Kliknij na dowolnego pączka tutaj, aby odkryć, który z nich jest Ci pisany.',
    flapLeft: 'DILF. Gorące, wolne pączki w Twojej okolicy',
    flapRight: 'DILF. Najsmaczniejsze pączki w Twoim sąsiedztwie',
    finderOverlayTitle: 'Znajdź swojego pączka',
  },
  wanPhone: {
    title: 'Gratulacje! Wygrałeś (wan) telefon! Odbierz (flaim) teraz!',
    survey: {
      questionVariants,
      description:
        'Wypełnij tę szybką ankietę, a możesz mieć szansę na odebranie swojego nowego telefonu! Bądź precyzyjny i szybki, ale nie za szybki.',
      result: {
        cheatDetected: {
          text: 'Wykryto oszustwo! Nie masz prawa odebrać swojego telefonu.',
          callToAction: 'Powrót do strony głównej',
        },
        completed: {
          text: 'Dziękujemy za udział! Niestety, w tej chwili nie można odebrać telefonu.',
          callToAction: 'Powrót do strony głównej',
        },
        lost: {
          text: 'Kurczę, pominąłeś kilka odpowiedzi. Jaka szkoda!',
          callToAction: 'Powrót do strony głównej',
        },
        timeout: {
          text: 'Przepraszamy, wygląda na to, że nie ukończyłeś ankiety na czas.',
          callToAction: 'Powrót do strony głównej',
        },
      },
    },
  },
  suspectBar: {
    title: 'Podejrzenie użycia Adblocka!',
    description:
      'Wygląda na to, że używasz blokady reklam. To trochę dziwne, nieprawdaż? Sporo tracisz! Rozważ jego wyłączenie. Do tego czasu, przy każdej wizycie na tej stronie, będziesz widzieć ten ogromny czerwony baner na dole. I prosimy, nie zamykaj go przyciskiem OK. Pozdrawiamy!',
  },
  newsletterModal: {
    title: 'Zapisz się do naszego newslettera!',
    description:
      'Nasz newsletter premium wnosi niesamowitą wartość prosto do Twojej skrzynki odbiorczej. Nie przegap spostrzeżeń, które robią prawdziwą różnicę!',
    placeholder: 'Wpisz swój e-mail',
    onlySpamsLabel: 'Chcę również otrzymywać OnlySpams (Zalecane)',
    onlySpamsDetails: '(szczegóły)',
    initialConfirm: 'Subskrybuj',
    initialCancel: 'Nie subskrybuj',
    useFormActions: 'Proszę zamiast tego użyć odpowiedniego przycisku',
    confirmations: {
      confirmation_001: {
        text: 'Z przykrością stwierdzamy, że prawdopodobnie nie miałeś wystarczająco dużo czasu, aby w pełni rozważyć tę ważną i trudną decyzję.',
        confirm: 'Przemyślałem to, nadal chcę',
        cancel: 'Masz rację, anuluj',
      },
      confirmation_002: {
        text: 'Przykro nam, że się zapisujesz, czy możemy Cię uraczyć radością z niebycia subskrybentem?',
        confirm: 'Nie, dzięki',
        cancel: 'Chcę swój poczęstunek!',
      },
      confirmation_003: {
        text: 'Czy rozważałeś pominięcie tego newslettera?',
        confirm: 'Nie',
        cancel: 'Tak',
      },
      confirmation_004: {
        text: 'Subskrypcja tego newslettera może mieć niepożądane skutki uboczne. Wchodzisz w to?',
        confirm: 'Akceptuję skutki uboczne',
        cancel: 'Wyciągnij mnie stąd',
      },
    },
  },
  wheelOfFortune: {
    title: 'Koło fortuny',
    spinStart: 'Kliknij lub dotknij tutaj!',
    spinWin: 'Wygrałeś! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Darmowe piwo do końca życia',
      worldPeace: 'Pokój na świecie',
      absolutelyNothing: 'Absolutnie nic',
      complimentaryOtter: 'Darmowa wydra',
      fake70Discount: 'Fałszywy 70% rabat',
    },
    wheelTitle: 'Koło fortuny',
  },
  onlySpams: {
    title: 'OnlySpams - Newsletter Premium',
    description:
      'Dołącz do najbardziej ekskluzywnego kręgu entuzjastów skrzynek odbiorczych na świecie. Nie wysyłamy tylko e-maili; wysyłamy emocje, możliwości i bardzo konkretne porady medyczne.',
    testimonials: {
      title: 'Co mówią nasi „subskrybenci”',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Przykładowe wartości dodane',
      subject: 'Temat:',
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Subskrybuj teraz',
  },
} satisfies MarketingI18nShape;
