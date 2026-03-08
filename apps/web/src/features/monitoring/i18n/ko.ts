export default {
  auth: {
    title: '접근 제한됨',
    description: '디버그 대시보드에 접근하려면 비밀번호를 입력하세요.',
    passwordLabel: '비밀번호',
    passwordPlaceholder: '••••••••',
    submit: '디버그 모드 해제',
  },
  logout: '로그아웃',
  internalOnly: '내부용 전용',
  tabs: {
    stores: '스토어 인스펙터',
    events: '이벤트 테스터',
    config: '정적 설정',
  },
  eventTester: {
    title: '이벤트 버스 테스터',
    commonEvents: '공통 이벤트',
    eventTypeLabel: '이벤트 유형',
    payloadLabel: '페이로드 (JSON)',
    dispatch: '이벤트 디스패치',
  },
  eventHistory: {
    title: '이벤트 내역',
    enable: '이벤트 내역 기록 활성화',
    clear: '내역 삭제',
    table: {
      timestamp: '타임스탬프',
      type: '유형',
      payload: '페이로드',
    },
    empty: '아직 캡처된 이벤트가 없습니다...',
    disabled: '이벤트 내역 기록이 비활성화되어 있습니다.',
  },
  storeInspector: {
    runtime: '런타임 스토어',
    monitoring: '모니터링 스토어',
    painPreferences: '고통 선호도 스토어',
    achievements: '업적 스토어',
    userPreferences: '사용자 설정 스토어',
    userGrants: '사용자 권한 스토어',
    appConfig: '앱 설정',
  },
};
