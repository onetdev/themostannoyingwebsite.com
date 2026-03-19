import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: '究極のAIアップグレード *',
    disclaimer: {
      title: '* 免責事項！',
      description:
        'このページにあるものはすべて100%偽物です。これらのパッケージは実在しません。決済プロセッサも、まともなバックエンドも存在しないため、購入することは不可能です。',
    },
    urgency: {
      title: '期間限定オファー！',
      description:
        'この大幅割引が永遠に消えるまで残り {timer} です。一生に一度のチャンスです、孫たちを失望させないでください！',
      compact: '期間限定！ -{discount}% {timer}',
      expired: '残念！セールは終了しました！',
    },
    billing: {
      monthly: '月額',
      yearly: '年額',
      biyearly: '2年',
      cycle: {
        monthly: '月額課金',
        yearly: '年額課金',
        biyearly: '2年ごとに課金',
      },
      chargeDisclaimer: '本日 {amount} が請求されます（嘘）',
    },
    mostPopular: '一番人気',
    pricePerMonth: '{price}/月',
    discount: '-{amount}%',
    status: {
      outOfStock: '在庫切れ',
    },
    table: {
      features: '機能',
    },
    cancellation: {
      link: '購読をキャンセル',
    },
    features: {
      lowTierLimits: 'あらゆる面で制限されています',
      superSlowSpeed: '意図的に遅くしています',
      adSupported: '広告付き（大量）',
      ramPriceSpike: 'RAM価格の急騰',
      gpuPriceSpike: 'GPU価格の急騰',
      creativeMath: 'クリエイティブな算術 (1+1=5)',
      fakeFacts: '100%自信に満ちた嘘',
      imaginarySources: '架空の出典',
      heavySighs: '聞こえるデジタルなため息',
      judgmentalEllipses: '批判的な三点リーダー...',
      submissive: 'あなたのやることはすべて「最高」です',
      exEmails: '午前3時の元カレ/元カノへのメール',
    },
    packages: {
      poorified: {
        title: 'スーパー貧困化ベーシック',
        description:
          '最も謙虚なプラン。ダイヤルアップが光回線に見えるほど遅いです。絶え間ないバッファリングとAIからの道徳的な批判が期待できます。',
      },
      sufficient: {
        title: 'かろうじて十分プレミアム',
        description:
          'イライラ指数のスイートスポット。あなたを不快にさせるには十分ですが、役に立つには不十分です。プレミアムな「デジタルため息」機能付き。',
      },
      delux: {
        title: 'ウルトラ・プレミアム・デラックス・エリート・プロ・マックス',
        description:
          'デジタルな惨めさの究極の頂点。不必要な機能が400%増量され、午前3時に後悔に満ちたメールを元恋人に自動送信します。',
      },
    },
  },
  specialDeal: {
    headline: '待って！行かないで！プレゼントがあります！ 🎁',
    description:
      'あなたが去ろうとしているのに気づきました。何か気に障ることを言いましたか？批判的な三点リーダーのせいですか？私たちは変われます！（待って、いや、無理です）。',
    offer:
      '大好評につき、オファーは在庫切れです！再入荷までこのページでお待ちください！',
    backToCancellation: 'うーん、キャンセル手続きに戻して',
  },
  purchaseProofToast: {
    justSubscribed: '{location} の {name} さんが {plan} を購読しました！',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: '購読のキャンセル',
    },
    reasons: {
      title: '理由',
      description:
        'あなたが卑怯にも購読をキャンセルしたいなんて、本当に信じがたいです。なぜですか？？？',
      list: [
        'MAWが人生のすべての問題を解決してくれました。でも、悲しみが恋しいです。',
        '私は自動販売機の中のアライグマのような金銭感覚しかありません。',
        'どれだけこれを楽しんでいたか友達にバレる前にキャンセルします。',
        '私はまた、アニメのキャラクターのように自分の問題から逃げています。',
        'PCへの負荷が大きすぎます',
        'コミットメントの問題。',
        'これほどの個人的な成長には単純に耐えられません。',
        'お母さんのクレジットカードを使っていることがバレました',
      ],
    },
    essay: {
      title: '退会インタビュー・エッセイ',
      description:
        'あなたの決断が最終的で熟考されたものであることを確認するために、あなたの経験についてエッセイ（最低3000文字）を書いてください。これは処理の前に弊社のCEOによって個人的にレビューされます。',
      placeholder: 'ここにあなたの3000文字の傑作を書き始めてください...',
      characters: '文字数: {count} / 3000',
      action: {
        abort: 'キャンセルを中止',
        next: '義務付けられたエッセイを完了しました。次の確認ステップに進みたいです',
      },
    },
    valdo: {
      title: 'ステップ 3: 光に導かれて',
      description:
        'このページには、本物の退会ボタンが1つだけあります。あなたの内なる光が導いてくれるのを信じてください。もし動作するものが見つからない場合は、宇宙があなたに留まるよう優しく提案しているのかもしれません。',
      buttonLabel: '退会する',
      error: 'ボタンが違います！手数料が適用されました: {amount}',
    },
    upsell: {
      title: '待って！行かないで！もう一度だけチャンスをください！',
      description:
        'あなたが去らないようにしているのに気づきました。「プラチナ退会防止」プランはいかがですか？去ろうとしている人にだけ提供される特別なプランです。',
      promo: '特大セール！\n最大99% OFF!!!',
      action: {
        specialDeal: 'スペシャルディールが欲しい',
        stay: 'はい、去りたくありません',
        next: 'いろいろありましたが、それでも購読をキャンセルしたいです。悪いのは私で、あなたではありません。',
      },
    },
    email: {
      title: 'あなたは誰？',
      label: 'キャンセル手続きのためにメールアドレスを入力してください。',
      placeholder: 'chujitsuna-kokyaku@themostannoyingwebsite.com',
      action: {
        discount: 'やっぱり気が変わりました。割引が欲しいです！',
        next: '本気です。キャンセルを続行してください',
      },
    },
    confirmation: {
      title: '最終確認が必要です',
      description:
        'リクエストの準備ができましたが、セキュリティ上の理由および誤った退会を防ぐために、物理的な確認プロセスを完了する必要があります。',
      alert: {
        title: '手順:',
        step1: '下の「確認のために印刷」ボタンをクリックします。',
        step2: '書類を実際の紙に印刷します。',
        step3: '2名の証人の立ち会いのもと、書類に署名します。',
        step4: '証人2名にも署名してもらいます。',
        step5: '署名された書類の高解像度写真を撮影します。',
        step6:
          '写真を <email>support@themostannoyingwebsite.com</email> にメールで送信します。',
        note: '処理には最大 10^15 営業日かかることにご注意ください。',
      },
      action: {
        print: '🖨️ 確認のために印刷 🖨️',
        abort: '購読を維持する',
        upgrade: '今すぐアップグレード',
        specialDeal: 'スペシャルディールを受け取る',
      },
      alternative: 'あるいは、気が変わった場合（強くお勧めします）:',
    },
    print: {
      title: '公式退会リクエストフォーム',
      documentId: 'ドキュメントID: {id}',
      sections: {
        account: '1. アカウント情報',
        details: '2. キャンセルの詳細',
        signatures: '3. 署名と証人',
      },
      fields: {
        email: 'メールアドレス:',
        date: 'リクエスト日:',
        reason: '退会の主な理由:',
        feedback: '詳細なフィードバック:',
      },
      signatures: {
        subscriber: '購読者の署名',
        subscriberName: '購読者の氏名（活字体）',
        witness1: '証人1の署名',
        witness1Name: '証人1の氏名（活字体）',
        witness2: '証人2の署名',
        witness2Name: '証人2の氏名（活字体）',
        dateLabel: '日付: ____________________',
      },
      footer:
        'これは実際の書類ではなく、単なるトレンドの風刺的な反映です。詳細については themostannoyingwebsite.com/ja/terms-of-use および themostannoyingwebsite.com/ja/privacy-policy を参照してください。',
    },
  },
} satisfies SubscriptionI18nShape;
