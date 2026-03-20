import type { SubscriptionI18nShape } from '../../types';
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
    status: {
      outOfStock: '품절',
    },
    table: {
      features: '기능',
    },
    cancellation: {
      link: '구독 취소',
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
  specialDeal: {
    headline: '잠깐! 가지 마세요! 선물이 있어요! 🎁',
    description:
      '당신이 떠나려고 하는 것을 감지했습니다. 저희가 무슨 실수라도 했나요? 판단하는 듯한 말줄임표 때문이었나요? 저희는 바뀔 수 있어요! (잠깐, 아니요, 그럴 수 없겠네요).',
    offer:
      '폭발적인 수요로 인해 혜택이 품절되었습니다! 재입고될 때까지 이 페이지에서 기다려 주세요!',
    backToCancellation: '음, 다시 취소 절차로 돌아갈게요',
  },
  purchaseProofToast: {
    justSubscribed: '{location}의 {name}님이 방금 {plan}을(를) 구독했습니다!',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: '구독 취소',
    },
    reasons: {
      title: '사유',
      description:
        '당신이 비겁하게 구독을 취소하고 싶어 한다는 사실이 정말 믿기지 않네요. 왜죠???',
      list: [
        'MAW가 내 인생의 모든 문제를 해결해 줬어요. 하지만 슬픔이 그리워요.',
        '나는 자판기 안의 너구리 같은 경제 관념을 가지고 있어요.',
        '내 친구들이 내가 이걸 얼마나 즐겼는지 알아차리기 전에 취소할 거예요.',
        '나는 다시 한번 만화 캐릭터처럼 내 문제로부터 도망치고 있어요.',
        '내 PC에 너무 무리가 가요',
        '약속에 대한 두려움.',
        '단순히 이 정도의 개인적 성장을 감당할 수 없어요.',
        '엄마 카드를 쓰고 있다는 걸 엄마가 알아버렸어요',
      ],
    },
    essay: {
      title: '퇴사 인터뷰 에세이',
      description:
        '귀하의 결정이 최종적이고 신중하게 고려된 것인지 확인하기 위해, 귀하의 경험에 대한 에세이(최소 3000자)를 작성해 주세요. 이는 처리되기 전에 저희 CEO가 직접 검토할 예정입니다.',
      placeholder: '여기에 3000자의 걸작을 작성하기 시작하세요...',
      characters: '글자 수: {count} / 3000',
      action: {
        abort: '취소 중단',
        next: '의무 에세이를 완료했으며 다음 확인 단계로 진행하고 싶습니다',
      },
    },
    valdo: {
      title: '단계 3: 빛을 따라가세요',
      description:
        '이 페이지에는 단 하나의 진짜 구독 해지 버튼이 있습니다. 당신을 인도할 내면의 빛을 믿으세요. 작동하는 버튼을 찾을 수 없다면, 우주가 당신에게 머물라고 부드럽게 제안하는 것일 수도 있습니다.',
      buttonLabel: '구독 해지',
      error: '잘못된 버튼입니다! 수수료 부과됨: {amount}',
    },
    upsell: {
      title: '잠깐! 가지 마세요! 제발 한 번만 더 기회를 주세요!',
      description:
        '당신이 떠나지 않으려 노력하는 것을 감지했습니다. "플래티넘 구독 해지 방지" 플랜은 어떠신가요? 떠나고 싶어 하는 분들께만 제공되는 특별한 플랜입니다.',
      promo: '초특가 세일!\n최대 99% 할인!!!',
      action: {
        specialDeal: '스페셜 딜을 원합니다',
        stay: '네, 떠나고 싶지 않아요',
        next: '그럼에도 불구하고, 저는 여전히 구독을 취소하고자 합니다. 당신이 아니라 제가 문제예요.',
      },
    },
    email: {
      title: '당신은 누구인가요?',
      label: '취소 절차를 위해 이메일 주소를 입력해 주세요.',
      placeholder: 'chungshil-han-gogaek@themostannoyingwebsite.com',
      action: {
        discount: '생각해 보니 마음이 바뀌었어요. 할인을 받을래요!',
        next: '확실합니다. 취소를 계속해 주세요',
      },
    },
    confirmation: {
      title: '최종 확인 필요',
      description:
        '귀하의 요청이 준비되었으나, 보안상의 이유 및 실수로 인한 구독 해지를 방지하기 위해 이제 물리적 확인 절차를 완료해야 합니다.',
      alert: {
        title: '지침:',
        step1: '아래의 "확인을 위해 인쇄" 버튼을 클릭합니다.',
        step2: '문서를 실제 종이에 인쇄합니다.',
        step3: '두(2) 명의 증인이 지켜보는 가운데 문서에 서명합니다.',
        step4: '두 명의 증인에게도 서명을 받습니다.',
        step5: '서명된 문서의 고해상도 사진을 찍습니다.',
        step6:
          '사진을 <email>support@themostannoyingwebsite.com</email>으로 이메일 발송합니다.',
        note: '처리에 최대 10^15 영업일이 소요될 수 있음을 유의하시기 바랍니다.',
      },
      action: {
        print: '🖨️ 확인을 위해 인쇄 🖨️',
        abort: '내 구독 유지하기',
        upgrade: '지금 업그레이드',
        specialDeal: '스페셜 딜 받기',
      },
      alternative: '또는, 마음이 바뀌었다면 (강력 추천):',
    },
    print: {
      title: '공식 구독 해지 요청서',
      documentId: '문서 ID: {id}',
      sections: {
        account: '1. 계정 정보',
        details: '2. 취소 상세 정보',
        signatures: '3. 서명 및 증인',
      },
      fields: {
        email: '이메일 주소:',
        date: '요청 날짜:',
        reason: '탈퇴 주사유:',
        feedback: '상세 피드백:',
      },
      signatures: {
        subscriber: '구독자 서명',
        subscriberName: '구독자 성명 (정자체)',
        witness1: '증인 1 서명',
        witness1Name: '증인 1 성명 (정자체)',
        witness2: '증인 2 서명',
        witness2Name: '증인 2 성명 (정자체)',
        dateLabel: '날짜: ____________________',
      },
      footer:
        '이 문서는 실제 문서가 아니며, 단지 트렌드에 대한 풍자적인 반영일 뿐입니다. 자세한 내용은 themostannoyingwebsite.com/ko/terms-of-use 및 themostannoyingwebsite.com/ko/privacy-policy를 참조하세요.',
    },
  },
} satisfies SubscriptionI18nShape;
