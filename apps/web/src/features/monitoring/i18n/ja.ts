export default {
  auth: {
    title: 'アクセス制限中（残念でした）',
    description:
      'デバッグダッシュボードを覗きたいなら、パスワードを入力してください。',
    passwordLabel: 'パスワード',
    passwordPlaceholder: '••••••••',
    submit: 'デバッグモードを解除（できるかな？）',
  },
  logout: 'ログアウト（さようなら）',
  internalOnly: '部外者禁止',
  tabs: {
    stores: 'ストア・インスペクター',
    events: 'イベント・テスター',
    config: '静的設定（いじるな危険）',
  },
  eventTester: {
    title: 'イベントバス・テスター',
    commonEvents: 'よくあるイベント',
    eventTypeLabel: 'イベントタイプ',
    payloadLabel: 'ペイロード (JSON)',
    dispatch: 'イベントを発火（ポチッとな）',
  },
  eventHistory: {
    title: 'イベント履歴',
    enable: 'イベント履歴の記録を有効化',
    clear: '履歴を消去（証拠隠滅）',
    table: {
      timestamp: 'タイムスタンプ',
      type: 'タイプ',
      payload: 'ペイロード',
    },
    empty: 'まだ何もキャッチしてません...',
    disabled: 'イベント履歴の記録は無効です。',
  },
  storeInspector: {
    runtime: 'ランタイム・ストア',
    monitoring: 'モニタリング・ストア',
    painPreferences: '苦痛設定ストア',
    achievements: '実績ストア',
    userPreferences: 'ユーザー設定ストア',
    userGrants: 'ユーザー権限ストア',
    appConfig: 'アプリ設定',
  },
};
