import socialProofVariants from './purchase-proof-variants/ja';

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
    table: {
      features: '機能',
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
  purchaseProofToast: {
    justSubscribed: '{location} の {name} さんが {plan} を購読しました！',
    variants: socialProofVariants,
  },
};
