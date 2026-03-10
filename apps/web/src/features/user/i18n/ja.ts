export default {
  userPreferences: {
    title: '設定',
    colorScheme: 'テーマ / 配色',
    darkMode: 'ダークモード',
    reducedMotion: '動きを抑える',
    reducedMotionHelp:
      'OSまたはブラウザの設定で変更できます。変更後はページの再読み込みが必要になる場合があります。',
    enableSound: 'サウンド',
    adultFilter: 'アダルトコンテンツのフィルター',
  },
  userGrants: {
    title: '同意と許可',
    permissionDisclaimer:
      '許可設定はブラウザによって管理されます。テーマを変更したい場合は、ブラウザのサイト設定から行ってください。',
    essentialCookies: '必須クッキーを許可する',
    notificationPermission: '通知の許可',
    locationPermission: '位置情報の許可',
  },
  optionalPainPoints: {
    title: 'オプションのウザい機能',
    categories: {
      browser: 'ブラウザとタブ',
      visual: '視覚的障害',
      ads: '広告と収益化',
      interactivity: 'ポップアップと操作性',
    },
    screensaverTimeout: 'タイムアウト',
    screensaverVariant: 'バリエーション',
    screensaverVariantOptions: {
      bouncingLogo: '跳ね返るロゴ',
      maze: '3D迷路 95',
    },
    screensaverTimeoutOptions: {
      '15': '15秒',
      '30': '30秒',
      '60': '1分',
      '300': '5分',
      '900': '15分',
    },
    gifts: {
      detectAdblocker: '広告ブロッカーの検出',
      flaps: '背景の広告フラップ',
      oneByOne: 'バラバラの広告ブロック',
    },
    achievementNotifications: '実績の通知',
    clipboardMarker: 'クリップボードマーカー',
    contentPaywall: 'コンテンツのペイウォール',
    deadPixel: 'ドット抜け',
    disableContextMenu: '右クリックメニューの無効化',
    exitPrompt: '退出プロンプト',
    historySpam: '履歴スパム',
    mockChat: 'チャットバブル',
    newsletterModal: 'ニュースレター登録モーダル',
    notifications: '通知',
    screensaver: 'スクリーンセーバー',
    pageTitleInactiveArrayPaged: 'タブ非アクティブ時の代替タイトル',
    searchDelay: '偽の検索遅延',
    wheelOfFortune: 'ホイール・オブ・フォーチュン',
    stickyVideo: '追従型ビデオ',
  },
  optionalPainPointsHints: {
    screensaver:
      '指定された時間、操作が行われない場合に選択したスクリーンセーバーを起動します。',
    gifts: {
      detectAdblocker:
        '広告ブロッカーが検出された場合、大きな赤いバナーを表示します。',
      flaps:
        'ページの両端にクリック可能な広告フラップを表示し、別のページへ誘導します。',
      oneByOne: '主にホームページでアニメーション広告を表示します。',
    },
    achievementNotifications:
      '新しい実績を解除したときに通知を表示します。進捗は常にバックグラウンドで追跡されています。',
    clipboardMarker:
      'サイトからテキストをコピーしたときに「詳細はこちら：」というリンクを末尾に追加します。',
    contentPaywall:
      '一部のコンテンツに偽のペイウォールを表示しますが、中身を見ることは可能です。',
    deadPixel:
      'あなたをイライラさせるために、画面上にいくつかの偽の「死んだピクセル（ドット抜け）」を配置します。',
    disableContextMenu:
      '右クリックメニューの使用を禁止し、代わりにアラートを表示します。',
    exitPrompt:
      'タブを閉じようとしたり他のページへ移動しようとしたときに「本当に離れますか？」というプロンプトを表示します。',
    historySpam:
      '簡単に戻れないように、ブラウザの履歴を偽のエントリで埋め尽くします。検索結果に戻るのが不便になります。',
    mockChat:
      '閉じようとするとメッセージを送ってくる、ウザい「人間」チャットバブルを表示します。その間ずっと「エージェントが入力中...」と表示されます。',
    newsletterModal:
      '定期的にニュースレター購読モーダルを表示します。特にタブを切り替えて戻ってきたときに表示されます。',
    notifications: '通知の許可を求め、偽の通知を表示します。',
    pageTitleInactiveArrayPaged:
      'タブが非アクティブなときに、注意を引くようなタイトルに変更します。',
    searchDelay: 'すべての検索に偽の、非常に長い読み込み時間を追加します。',
    wheelOfFortune:
      '完全に無価値な賞品が当たる偽の「ホイール・オブ・フォーチュン」モーダルを表示します。',
    stickyVideo:
      'スクロールに合わせて付いてくる追従型ビデオプレーヤーを表示します。',
  },
  mandatoryExperienceFlags: {
    title: '必須の体験',
    impossibleLogin: '不可能なログイン',
    impossibleSignup: '不可能なサインアップ',
    impossiblePasswordReminder: '不可能なパスワードリマインダー',
    unreasonableContent: '不条理なコンテンツ',
    flaimYourPhone: '電話を「flaim」する',
    fakeAiSubscription: '偽のAIサブスクリプションプラン',
  },
  runtimeInfo: {
    title: 'このセッションについて',
    disclaimer:
      '以下の情報は現在のブラウザセッションのデバッグ情報として機能します（ページを更新するとすべてリセットされます）。これらの値は、何がどのように起こるかに大きな影響を与えます。',
    startedAgo: 'セッション開始',
    visibilitySeconds: 'フォーカスしていた時間',
    isDocumentVisible: '現在フォーカス中',
    navigationCount: '遷移回数',
    userActivation: '初期ユーザーアクション',
    lastActivation: '最終ユーザーアクティビティ',
    flaimSurveyResult: 'Flaim 調査結果',
    adblockerSuspected: '広告ブロッカー検出（疑い）',
    adblockerNotDetected: '広告ブロッカー未検出',
  },
  myProfile: {
    notSupposedToBeHere: 'ん、ここにいてはいけないはずですが... 😡',
  },
  notification: {
    modal: {
      title: 'あ、通知の許可はどこ！？！',
      description:
        '時々通知を送らせてください。ブラウザの設定からこのサイトの通知を許可できます。お願いできますか？ 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'ウザさレベル',
      railTitle: 'ウザさレベルスライダー',
      clamps: {
        from_0: 'ピュア',
        from_10: 'ちょっと変かな？',
        from_20: '軽くウザい',
        from_30: '少し呪われている',
        from_40: '独特な不快感',
        from_50: 'ちょうどいい',
        from_60: '平均以上の耐性',
        from_70: '裸足で犬のフンを踏んだ感じ',
        from_80: 'もはやマゾヒズム',
        from_90: '悪夢を見たいならこれ',
        from_100: '最強のウザさ',
      },
    },
  },
};
