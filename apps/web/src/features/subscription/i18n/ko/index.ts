import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: '궁극의 AI 업그레이드 *',
    disclaimer: {
      title: '* 고지 사항!',
      description:
        '이 페이지의 모든 내용은 100% 가짜입니다. 이 패키지들은 존재하지 않으며, 결제 프로세서도 없고 실제 백엔드도 없기 때문에 구매하는 것이 불가능합니다.',
    },
    urgency: {
      title: '한정 기간 제공!',
      description:
        '이 거대한 할인 혜택이 영원히 사라지기까지 {timer} 남았습니다. 일생에 한 번뿐인 기회이니 손주들을 실망시키지 마세요!',
      compact: '한정 제공! -{discount}% {timer}',
      expired: '죄송합니다! 세일 기간을 방금 놓치셨습니다!',
    },
    billing: {
      monthly: '월간',
      yearly: '연간',
      biyearly: '2년',
      cycle: {
        monthly: '매월 청구',
        yearly: '매년 청구',
        biyearly: '2년마다 청구',
      },
      chargeDisclaimer: '오늘 {amount}이(가) 청구됩니다',
    },
    mostPopular: '가장 인기 있음',
    pricePerMonth: '월 {price}',
    discount: '-{amount}%',
    table: {
      features: '기능',
    },
    features: {
      lowTierLimits: '가능한 모든 방식의 제한',
      superSlowSpeed: '의도적으로 느림',
      adSupported: '광고 포함 (매우 많이)',
      ramPriceSpike: 'RAM 가격 급등 유발',
      gpuPriceSpike: 'GPU 가격 급등 유발',
      creativeMath: '창의적인 산술 (1+1=5)',
      fakeFacts: '100% 자신감 있는 거짓말',
      imaginarySources: '상상의 출처 인용',
      heavySighs: '들리는 디지털 한숨 소리',
      judgmentalEllipses: '판단하는 듯한 말줄임표...',
      submissive: '당신이 하는 모든 것이 "멋져요"',
      exEmails: '새벽 3시에 전 여친/남친에게 이메일 보내기',
    },
    packages: {
      poorified: {
        title: '초 저가형 베이직',
        description:
          '가장 겸손한 제안입니다. 너무 기본적이라 전화선 모뎀이 광랜처럼 느껴질 정도입니다. 우리 AI의 끊임없는 버퍼링과 도덕적 비난을 기대하세요.',
      },
      sufficient: {
        title: '간신히 충분한 프리미엄',
        description:
          '짜증의 딱 좋은 지점입니다. 당신을 화나게 하기엔 충분하지만 실제로 유용하기엔 부족합니다. 이제 프리미엄 디지털 한숨 소리가 포함됩니다.',
      },
      delux: {
        title: '울트라 프리미엄 디럭스 엘리트 프로 맥스',
        description:
          '디지털 불행의 정점입니다. 400% 더 많은 불필요한 기능과 전 여친/남친에게 보내는 자동화된 새벽 3시 후회 이메일이 포함됩니다.',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{location}의 {name}님이 방금 {plan}을(를) 구독했습니다!',
    variants: socialProofVariants,
  },
};
