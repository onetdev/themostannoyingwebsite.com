export default {
  userPreferences: {
    title: '환경설정',
    colorScheme: '테마 / 색상 스키마',
    darkMode: '다크 모드',
    reducedMotion: '동작 줄이기',
    reducedMotionHelp:
      'OS/브라우저 설정에서 변경할 수 있습니다. 변경 후 페이지를 새로고침해야 할 수도 있습니다.',
    enableSound: '소리',
    adultFilter: '성인 콘텐츠 필터링',
  },
  userGrants: {
    title: '동의 및 권한',
    permissionDisclaimer:
      '권한 설정은 브라우저에서 관리됩니다. 테마를 변경하려면 브라우저의 사이트 설정에서 할 수 있습니다.',
    essentialCookies: '필수 쿠키 허용',
    notificationPermission: '알림 권한',
    locationPermission: '위치 권한',
  },
  optionalPainPoints: {
    title: '선택적 고통 요소',
    categories: {
      visualChaos: '시각적 혼란',
      uiSabotage: 'UI 사보타주',
      interruptions: '중단 및 방해',
      browserHijacking: '브라우저 하이재킹',
    },
    achievementNotifications: {
      label: '업적 알림',
      hint: '새로운 업적을 달성할 때마다 알림을 표시합니다. 진행 상황은 항상 백그라운드에서 추적됩니다.',
    },
    backgroundAdflaps: {
      label: '배경 광고 플랩',
      hint: '페이지 측면에 클릭하면 마케팅 페이지로 이동하는 광고 플랩을 표시합니다.',
    },
    clipboardBrandingMark: {
      label: '클립보드 브랜딩 마크',
      hint: '웹사이트에서 텍스트를 복사할 때 "더 보기..." 링크를 추가합니다.',
    },
    contentPaywall: {
      label: '콘텐츠 페이월',
      hint: '일부 콘텐츠에 가짜 페이월 오버레이를 표시합니다. 콘텐츠는 여전히 무료로 볼 수 있습니다.',
    },
    deadPixel: {
      label: '데드 픽셀',
      hint: '당신을 짜증 나게 하기 위해 화면에 몇 개의 가짜 "데드" 픽셀을 배치합니다.',
    },
    detectAdblocker: {
      label: '광고 차단기 감지',
      hint: '광고 차단기가 감지되면 커다란 빨간 배너를 표시합니다.',
    },
    disableContextMenu: {
      label: '컨텍스트(우클릭) 메뉴 비활성화',
      hint: '우클릭 메뉴 사용을 방지하고 대신 경고창을 표시합니다.',
    },
    exitPrompt: {
      label: '종료 프롬프트',
      hint: '탭을 닫거나 다른 곳으로 이동하려고 할 때 "정말 떠나시겠습니까?" 프롬프트를 표시합니다.',
    },
    flaimAPHoneAd: {
      label: 'Flaim 휴대폰 설문 조사 캠페인',
      hint: '홈 페이지에 Flaim a Phone으로 이어지는 펑키한 애니메이션 광고를 표시합니다.',
    },
    historySpam: {
      label: '기록 스팸',
      hint: '브라우저 기록을 가짜 항목으로 채워 쉽게 뒤로 갈 수 없게 만듭니다. 검색 엔진 결과로 돌아가는 것이 불편해질 수 있습니다.',
    },
    mockSupportChat: {
      label: '모의 고객 지원 채팅',
      hint: '닫을 때만 메시지를 보내는 짜증 나는 "인간" 고객 지원 채팅 버블을 표시합니다.',
    },
    newsletterModal: {
      label: '뉴스레터 팝업 모달',
      hint: '주기적으로 뉴스레터 구독 모달을 표시합니다. 특히 비활성 상태에서 페이지로 돌아올 때(탭 전환) 표시됩니다.',
    },
    notifications: {
      label: '알림',
      hint: '알림 권한을 요청하고 가짜 알림을 표시합니다.',
    },
    pageTitleInactiveArrayPaged: {
      label: '탭 비활성 시 교대 제목',
      hint: '탭이 비활성 상태일 때 탭 제목을 주의를 끄는 것으로 변경합니다.',
    },
    searchDelay: {
      label: '인위적인 검색 지연',
      hint: '모든 검색에 가짜로 긴 로딩 지연을 추가합니다.',
    },
    stickyVideoPlayer: {
      label: '고정 비디오 플레이어',
      hint: '스크롤을 따라다니는 고정 비디오 플레이어를 표시합니다.',
    },
    wheelOfFortune: {
      label: '운명의 돌림판',
      hint: '당신에게 완전히 쓸모없는 경품을 주는 가짜 "운명의 돌림판" 모달을 표시합니다.',
    },
    screensaver: {
      label: '화면 보호기',
      hint: '지정된 기간 동안 활동이 없을 경우 사용자가 선택한 화면 보호기를 트리거합니다.',
      variant: {
        label: '유형',
        options: {
          bouncingLogo: '바운싱 로고',
          maze: '3D 미로 95',
        },
      },
      timer: {
        label: '대기 시간',
        options: {
          15: '15초',
          30: '30초',
          60: '1분',
          300: '5분',
          900: '15분',
        },
      },
    },
  },
  mandatoryExperienceFlags: {
    title: '필수 환경',
    dilf: '먹고 싶은 도넛',
    fakeAiSubscription: '가짜 AI 구독 플랜',
    fakeComments: '가짜 댓글',
    flaimYourPhone: '폰을 불태우세요(Flaim)',
    impossibleLogin: '불가능한 로그인',
    impossiblePasswordReminder: '불가능한 비밀번호 알림',
    impossibleSignup: '불가능한 회원가입',
    madeUpNewsletter: '지어낸 프리미엄 뉴스레터 홍보',
    unreasonableContent: '불합리한 콘텐츠',
  },
  runtimeInfo: {
    title: '현재 세션 정보',
    disclaimer:
      '아래 나열된 정보는 현재 브라우저 세션의 디버그 정보 역할을 합니다(페이지를 새로고침하면 모든 것이 초기화됩니다). 보이지 않는 곳에서 이 값들은 무엇이 어떻게 일어나는지에 큰 영향을 미칩니다.',
    startedAgo: '세션 시작됨',
    visibilitySeconds: '포커스 유지 시간',
    isDocumentVisible: '현재 포커스 상태',
    navigationCount: '이동 횟수',
    userActivation: '최초 사용자 동작',
    lastActivation: '마지막 사용자 활동',
    flaimSurveyResult: 'Flaim 설문 결과',
    adblockerSuspected: '광고 차단기 의심됨',
    adblockerNotDetected: '광고 차단기 감지되지 않음',
  },
  myProfile: {
    notSupposedToBeHere: '흠, 여기 오시면 안 되는데요 😡',
  },
  notification: {
    modal: {
      title: '오 안돼, 알림 권한이 어디 갔죠!?!',
      description:
        '가끔씩 알림을 보내드리고 싶습니다. 브라우저 설정에서 이 웹사이트에 알림 권한을 줄 수 있습니다. 해주실 거죠? 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: '고통 레벨',
      rating: '통증 등급',
      railTitle: '고통 레벨 슬라이더 레일',
      clamps: {
        from_0: '순진함',
        from_10: '좀 이상하죠, 그쵸?',
        from_20: '약간 짜증 남',
        from_30: '조금 저주받음',
        from_40: '매우 구체적인 방식으로 불안함',
        from_50: '딱 적당함',
        from_60: '평균보다 높은 인내심',
        from_70: '맨발로 개똥 밟기',
        from_80: '마조히즘 경계선',
        from_90: '악몽? 구독 완료.',
        from_100: '최대 고통',
      },
    },
  },
};
