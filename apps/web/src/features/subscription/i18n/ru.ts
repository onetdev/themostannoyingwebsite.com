import socialProofVariants from './purchase-proof-variants/ru';

export default {
  landing: {
    headline: 'Ультимативный AI Апгрейд *',
    disclaimer: {
      title: '* ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ!',
      description:
        'Всё на этой странице на 100% фальшивка. Этих пакетов не существует, и их покупка невозможна, потому что у нас нет платежного процессора или даже настоящего бэкенда.',
    },
    urgency: {
      title: 'ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ!',
      description:
        'Осталось {timer} до того, как эти огромные скидки исчезнут навсегда. Это шанс, который выпадает раз в жизни, не подведите своих внуков!',
      compact: 'ЛИМИТИРОВАННОЕ ПРЕДЛОЖЕНИЕ! -{discount}% {timer}',
      expired: 'ИЗВИНИТЕ! Вы только что пропустили распродажу!',
    },
    billing: {
      monthly: 'Ежемесячно',
      yearly: 'Ежегодно',
      biyearly: 'Каждые 2 года',
      cycle: {
        monthly: 'оплата ежемесячно',
        yearly: 'оплата каждый год',
        biyearly: 'оплата каждые 2 года',
      },
      chargeDisclaimer: 'С вас будет списано {amount} сегодня',
    },
    mostPopular: 'Самый популярный',
    pricePerMonth: '{price}/мес',
    discount: '-{amount}%',
    table: {
      features: 'Особенности',
    },
    features: {
      lowTierLimits: 'Ограничено всеми возможными способами',
      superSlowSpeed: 'Намеренно медленно',
      adSupported: 'С рекламой (Её много)',
      ramPriceSpike: 'Взвинчивание цен на RAM',
      gpuPriceSpike: 'Взвинчивание цен на GPU',
      creativeMath: 'Креативная арифметика (1+1=5)',
      fakeFacts: '100% уверенная ложь',
      imaginarySources: 'Воображаемые цитаты',
      heavySighs: 'Слышимые цифровые вздохи',
      judgmentalEllipses: 'Осуждающие многоточия...',
      submissive: 'Всё, что вы делаете — ПОТРЯСАЮЩЕ',
      exEmails: 'Письма бывшим в 3 часа ночи',
    },
    packages: {
      poorified: {
        title: 'Super Poorified Basic',
        description:
          'Наше самое скромное предложение. Настолько базовое, что заставляет модемное соединение выглядеть как оптоволокно. Ожидайте постоянную буферизацию и моральное осуждение от нашего ИИ.',
      },
      sufficient: {
        title: 'Barely Sufficient Premium',
        description:
          'Золотая середина фрустрации. Ровно столько, чтобы раздражать, но недостаточно, чтобы быть полезным. Теперь с премиальными цифровыми вздохами.',
      },
      delux: {
        title: 'Ultra Premium Delux Elite Pro Max',
        description:
          'Вершина цифрового ничтожества. Теперь на 400% больше ненужных функций и автоматические письма с сожалениями вашим бывшим в 3 часа ночи.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{name} из {location} только что подписался на {plan}!',
    variants: socialProofVariants,
  },
};
