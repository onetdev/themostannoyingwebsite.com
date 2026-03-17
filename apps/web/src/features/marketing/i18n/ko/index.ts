import type { MarketingI18nShape } from '../../types';
import onlySpamsVariants from './only-spams-variants';
import questionVariants from './quiz-variants';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: "DILF - 먹고 싶은 도넛(Donut I'd Like to Feast On)",
    description:
      '당신 주변에서 가장 맛있고, 핫하고, 솔로이며, 거부할 수 없는 도넛을 찾고 있다면 완벽한 곳에 오셨습니다. 진정한 사랑을 찾기 위한 도전에 응할 준비가 되셨나요? 여기 있는 도넛 중 아무거나 클릭하여 어떤 도넛이 당신을 위한 것인지 확인해 보세요.',
    flapLeft: 'DILF. 당신 주변의 핫한 싱글 도넛',
    flapRight: 'DILF. 당신 근처의 가장 맛있는 도넛',
    finderOverlayTitle: '당신의 도넛을 찾으세요',
  },
  wanPhone: {
    title: '축하합니다! 휴대폰에 당첨되셨습니다! 지금 바로 받으세요!',
    survey: {
      questionVariants,
      description:
        '간단한 설문에 참여하시면 새 휴대폰을 받을 수 있는 기회가 주어질 수 있습니다! 정확하고 빠르게, 하지만 너무 빠르지는 않게 작성해 주세요.',
      result: {
        cheatDetected: {
          text: '부정행위가 감지되었습니다! 휴대폰을 받을 자격이 없습니다.',
          callToAction: '홈으로 돌아가기',
        },
        completed: {
          text: '참여해 주셔서 감사합니다! 아쉽게도 지금은 휴대폰을 수령할 수 없습니다.',
          callToAction: '홈으로 돌아가기',
        },
        lost: {
          text: '이런, 몇 가지 답변을 놓치셨네요. 정말 아쉽군요!',
          callToAction: '홈으로 돌아가기',
        },
        timeout: {
          text: '죄송합니다, 시간 내에 설문을 마치지 못한 것 같습니다.',
          callToAction: '홈으로 돌아가기',
        },
      },
    },
  },
  suspectBar: {
    title: '광고 차단기 사용 의심!',
    description:
      '광고 차단기를 사용 중이신 것 같군요. 참 이상하죠, 안 그래요? 엄청난 기회를 놓치고 계신 겁니다! 광고 차단기를 꺼 주시기 바랍니다. 그때까지 이 사이트를 방문하실 때마다 하단에 이 거대한 빨간색 배너가 표시될 것입니다. 그리고 제발 OK 버튼을 눌러서 닫지도 마세요. 그럼 이만!',
  },
  newsletterModal: {
    title: '뉴스레터에 가입하세요!',
    description:
      '저희 프리미엄 뉴스레터는 엄청난 가치를 여러분의 편지함으로 직접 전달해 드립니다. 실질적인 차이를 만드는 인사이트를 놓치지 마세요!',
    placeholder: '이메일을 입력하세요',
    onlySpamsLabel: 'OnlySpams도 받고 싶습니다 (권장)',
    onlySpamsDetails: '(상세)',
    initialConfirm: '구독하기',
    initialCancel: '구독하지 않기',
    useFormActions: '대신 해당 버튼을 사용해 주세요',
    confirmations: {
      confirmation_001: {
        text: '이 중요하고 어려운 결정을 충분히 고려할 시간이 부족하셨던 것 같아 안타깝습니다.',
        confirm: '생각해 봤는데, 여전히 구독하고 싶어요',
        cancel: '당신 말이 맞아요, 취소할게요',
      },
      confirmation_002: {
        text: '구독하시는 모습을 보니 안타깝군요. 비구독자로서의 즐거움을 대신 선사해 드려도 될까요?',
        confirm: '아니요, 괜찮습니다',
        cancel: '즐거움을 선사해 주세요!',
      },
      confirmation_003: {
        text: '이 뉴스레터를 건너뛰는 것을 고려해 보셨나요?',
        confirm: '아니요',
        cancel: '네',
      },
      confirmation_004: {
        text: '이 뉴스레터를 구독하면 부정적인 부작용이 발생할 수 있습니다. 그래도 계속하시겠습니까?',
        confirm: '부작용을 수락합니다',
        cancel: '여기서 나가게 해 주세요',
      },
    },
  },
  wheelOfFortune: {
    title: '행운의 바퀴',
    spinStart: '여기를 클릭하거나 탭하세요!',
    spinWin: '당첨되셨습니다! {prize}',
    prizeVariants: {
      freeLifetimeBeer: '평생 맥주 무료',
      worldPeace: '세계 평화',
      absolutelyNothing: '완전 꽝',
      complimentaryOtter: '무료 수달 증정',
      fake70Discount: '가짜 70% 할인',
    },
    wheelTitle: '행운의 바퀴',
  },
  onlySpams: {
    title: 'OnlySpams - 프리미엄 뉴스레터',
    description:
      '세계에서 가장 독점적인 인박스 애호가들의 모임에 참여하세요. 우리는 단순히 이메일을 보내는 것이 아니라 감정, 기회, 그리고 매우 구체적인 의학적 조언을 보냅니다.',
    testimonials: {
      title: '우리 "구독자"들의 한마디',
      verified: '인증됨',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: '가치 증대 샘플',
      sender: '보낸 사람:',
      subject: '제목:',
      folder: '폴더:',
      spam: '스팸',
      cta: '관심 있습니다',
      items: onlySpamsVariants.samples,
    },
    subscribe: '지금 구독하기',
  },
} satisfies MarketingI18nShape;
