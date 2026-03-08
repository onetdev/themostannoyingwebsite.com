export default {
  captcha: {
    field: 'キャプチャ',
    proveYouAreRobot: 'あなたがロボットであることを証明してください！',
    emojiHint:
      '絵文字の数を数え、最も多く表示されているものを特定してください。一部の絵文字が隠れている場合があるので、注意深く見てください。',
    tilePuzzleHint:
      'タイルを正しい位置にスライドさせてください。隣り合っているタイルのみ動かすことができます。',
    gridSelectHint:
      'プロンプトに一致するすべての画像を選択してください。新しい画像が表示された場合は、それらも確認してください。',
    gridSelectPrompts: [
      '自転車',
      'オートバイ',
      '信号機',
      '横断歩道',
      '消火栓',
      '階段',
      'トラクター',
      'バス',
      '山または丘',
      'ヤシの木',
      '煙突',
      '橋',
    ],
    challengeTitle: 'キャプチャ・チャレンジ',
    verificationProgress: '検証状況',
    resetChallenge: 'チャレンジをリセット',
    taxonomyChallengePrompt:
      '<spanTag>{target}</spanTag> の含まれるタイルをすべて選択してください',

    taxonomyChallengeSkipHint:
      '一つもない場合は、スキップをクリックしてください',
    tilePuzzleChallengeHint:
      '空きスペースの隣にあるタイルをクリックしてピースを動かしてください',
    roboCop: 'ロボコップ',
    protected: '保護済み',
    emojiChallengePlaceholder: '最も多く出現する絵文字の数',
  },
};
