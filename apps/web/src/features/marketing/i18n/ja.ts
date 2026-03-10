import type { MarketingI18nShape } from '../types';
import onlySpamsVariants from './only-spams-variants/en';
import questionVariants from './quiz-variants/ja';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: 'DILF - むさぼり食いたいドーナツ',
    description:
      'あなたの街で最も美味しく、熱く、独身で、抗いがたいドーナツを探しているなら、ここは最高の場所です。真実の愛を見つける準備はできていますか？ここのドーナツをクリックして、どれがあなたにふさわしいか見つけましょう。',
    flapLeft: 'DILF. あなたの街の熱い独身ドーナツ',
    flapRight: 'DILF. 近くの最も美味しいドーナツ',
    finderOverlayTitle: 'ドーナツを見つける',
  },
  wanPhone: {
    title: 'おめでとうございます！電話を「Wan」しました！今すぐFlaim（炎求）！',
    survey: {
      questionVariants,
      description:
        '簡単なアンケートに答えて、新しい電話を「炎求」するチャンスを掴みましょう！正確に、かつ素早く（でも早すぎず）回答してください。',
      result: {
        cheatDetected: {
          text: '不正を検出しました！電話を炎求することは許可されません。',
          callToAction: 'ホームに戻る',
        },
        completed: {
          text: 'ご参加ありがとうございます！残念ながら、現在電話を炎求することはできません。',
          callToAction: 'ホームに戻る',
        },
        lost: {
          text: '残念、いくつか回答を間違えました。なんともったいない！',
          callToAction: 'ホームに戻る',
        },
        timeout: {
          text: '申し訳ありません、時間内にアンケートを完了できなかったようです。',
          callToAction: 'ホームに戻る',
        },
      },
    },
  },
  suspectBar: {
    title: '広告ブロッカーの疑いあり！',
    description:
      '広告ブロッカーを使用しているようですね。ちょっと変じゃないですか？大きな損をしてますよ！ぜひオフにすることを検討してください。オフにするまで、このサイトを訪れるたびにこの巨大な赤いバナーが表示されます。OKボタンで閉じようともしないでくださいね。よろしく！',
  },
  newsletterModal: {
    title: 'ニュースレターに参加しましょう！',
    description:
      '私たちのプレミアムニュースレターは、あなたの受信トレイに計り知れない価値をもたらします。真の変化をもたらす洞察をお見逃しなく！',
    placeholder: 'メールアドレスを入力',
    onlySpamsLabel: 'OnlySpams™も受け取りたい（推奨）',
    onlySpamsDetails: '（詳細）',
    initialConfirm: '購読する',
    initialCancel: '購読しない',
    useFormActions: '代わりに適切なボタンを使用してください',
    confirmations: {
      confirmation_001: {
        text: 'この重要で困難な決断を十分に検討する時間がなかったようで、残念に思います。',
        confirm: '考え直しましたが、やはり購読したいです',
        cancel: 'おっしゃる通りです、キャンセルします',
      },
      confirmation_002: {
        text: '購読を中止されるのは残念です。非購読者であることの喜びを味わってみませんか？',
        confirm: 'いいえ、結構です',
        cancel: '喜びを味わいたいです！',
      },
      confirmation_003: {
        text: 'このニュースレターをスキップすることを検討しましたか？',
        confirm: 'いいえ',
        cancel: 'はい',
      },
      confirmation_004: {
        text: 'このニュースレターを購読すると、副作用があるかもしれません。それでも進めますか？',
        confirm: '副作用を受け入れます',
        cancel: 'ここから出してくれ',
      },
    },
  },
  wheelOfFortune: {
    title: 'ホイール・オブ・フォーチュン',
    spinStart: 'ここをクリックまたはタップ！',
    spinWin: '当選！ {prize}',
    prizeVariants: {
      freeLifetimeBeer: '一生分のビール無料券',
      worldPeace: '世界平和',
      absolutelyNothing: '完全に無',
      complimentaryOtter: 'おまけのカワウソ',
      fake70Discount: '偽の70%割引',
    },
    wheelTitle: 'ホイール・オブ・フォーチュン',
  },
  onlySpams: {
    title: 'OnlySpams™ - プレミアムニュースレター',
    description:
      '世界で最も独占的な受信トレイ愛好家のサークルに参加しましょう。私たちは単にメールを送るだけではありません。感情、機会、そして非常に具体的な医学的アドバイスを送信します。',
    testimonials: {
      title: '「購読者」の声',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: '付加価値の例',
      subject: '件名:',
      items: onlySpamsVariants.samples,
    },
    subscribe: '今すぐ購読',
  },
} satisfies MarketingI18nShape;
