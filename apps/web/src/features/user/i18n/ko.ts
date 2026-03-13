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
      browser: '브라우저 및 탭',
      visual: '시각적 방해물',
      ads: '광고 및 수익화',
      interactivity: '팝업 및 상호작용',
    },
    screensaverTimeout: '대기 시간',
    screensaverVariant: '유형',
    screensaverVariantOptions: {
      bouncingLogo: '바운싱 로고',
      maze: '3D 미로 95',
    },
    screensaverTimeoutOptions: {
      '15': '15초',
      '30': '30초',
      '60': '1분',
      '300': '5분',
      '900': '15분',
    },
    gifts: {
      detectAdblocker: '광고 차단기 감지',
      flaps: '배경 광고 플랩',
      oneByOne: '일대일 광고 차단',
    },
    achievementNotifications: '업적 알림',
    clipboardMarker: '클립보드 마커',
    contentPaywall: '콘텐츠 페이월',
    deadPixel: '데드 픽셀',
    disableContextMenu: '컨텍스트(우클릭) 메뉴 비활성화',
    exitPrompt: '종료 프롬프트',
    historySpam: '기록 스팸',
    mockChat: '버블 채팅',
    newsletterModal: '뉴스레터 팝업 모달',
    notifications: '알림',
    screensaver: '화면 보호기',
    pageTitleInactiveArrayPaged: '탭 비활성 시 대안 제목',
    searchDelay: '가짜 검색 지연',
    wheelOfFortune: '운명의 돌림판',
    stickyVideo: '고정 비디오',
  },
  optionalPainPointsHints: {
    screensaver:
      '지정된 기간 동안 활동이 없을 경우 사용자가 선택한 화면 보호기를 트리거합니다.',
    gifts: {
      detectAdblocker: '광고 차단기가 감지되면 커다란 빨간 배너를 표시합니다.',
      flaps:
        '페이지 측면에 클릭하면 다른 페이지로 이동하는 광고 플랩을 표시합니다.',
      oneByOne: '주로 홈 페이지의 애니메이션 광고를 담당합니다.',
    },
    achievementNotifications:
      '새로운 업적을 달성할 때마다 알림을 표시합니다. 진행 상황은 항상 백그라운드에서 추적됩니다.',
    clipboardMarker:
      '웹사이트에서 텍스트를 복사할 때 "더 보기..." 링크를 추가합니다.',
    contentPaywall:
      '일부 콘텐츠에 가짜 페이월 오버레이를 표시합니다. 여전히 콘텐츠를 볼 수는 있습니다.',
    deadPixel:
      '당신을 짜증 나게 하기 위해 화면에 몇 개의 가짜 "데드" 픽셀을 배치합니다.',
    disableContextMenu: '우클릭 메뉴 사용을 방지하고 대신 경고창을 표시합니다.',
    exitPrompt:
      '탭을 닫거나 다른 곳으로 이동하려고 할 때 "정말 떠나시겠습니까?" 프롬프트를 표시합니다.',
    historySpam:
      '브라우저 기록을 가짜 항목으로 채워 쉽게 뒤로 갈 수 없게 만듭니다. 검색 엔진 결과로 돌아가는 것이 불편해질 수 있습니다.',
    mockChat:
      '닫을 때만 메시지를 보내고, 그동안 끊임없이 "상담원이 입력 중입니다"라고 표시하는 짜증 나는 "인간" 채팅 버블을 표시합니다.',
    newsletterModal:
      '주기적으로 뉴스레터 구독 모달을 표시합니다. 특히 비활성 상태에서 페이지로 돌아올 때(탭 전환) 표시됩니다.',
    notifications: '알림 권한을 요청하고 가짜 알림을 표시합니다.',
    pageTitleInactiveArrayPaged:
      '탭이 비활성 상태일 때 탭 제목을 주의를 끄는 것으로 변경합니다.',
    searchDelay: '모든 검색에 가짜로 긴 로딩 지연을 추가합니다.',
    wheelOfFortune:
      '당신에게 완전히 쓸모없는 경품을 주는 가짜 "운명의 돌림판" 모달을 표시합니다.',
    stickyVideo: '스크롤을 따라다니는 고정 비디오 플레이어를 표시합니다.',
  },
  mandatoryExperienceFlags: {
    title: '필수 환경',
    impossibleLogin: '불가능한 로그인',
    impossibleSignup: '불가능한 회원가입',
    impossiblePasswordReminder: '불가능한 비밀번호 알림',
    unreasonableContent: '불합리한 콘텐츠',
    flaimYourPhone: '폰을 불태우세요(Flaim)',
    fakeAiSubscription: '가짜 AI 구독 플랜',
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
