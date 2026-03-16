import type { SubscriptionI18nShape } from '../../types';
import socialProofVariants from './purchase-proof-variants';

export default {
  landing: {
    headline: '终极 AI 升级 *',
    disclaimer: {
      title: '* 免责声明！',
      description:
        '此页面上的所有内容 100% 都是虚假的。这些套餐并不存在，购买也是不可能的，因为我们没有支付处理器，甚至连一个真正的后端都没有。',
    },
    urgency: {
      title: '限时优惠！',
      description:
        '距离这些巨额折扣永久消失还剩 {timer}。这是千载难逢的机会，不要让你的子孙后代失望！',
      compact: '限时优惠！ -{discount}% {timer}',
      expired: '抱歉！你刚刚错过了促销！',
    },
    billing: {
      monthly: '按月',
      yearly: '按年',
      biyearly: '2 年',
      cycle: {
        monthly: '按月计费',
        yearly: '每年计费一次',
        biyearly: '每 2 年计费一次',
      },
      chargeDisclaimer: '你今天将被收取 {amount}',
    },
    mostPopular: '最受欢迎',
    pricePerMonth: '{price}/月',
    discount: '-{amount}%',
    status: {
      outOfStock: '缺货',
    },
    table: {
      features: '功能',
    },
    cancellation: {
      link: '取消订阅',
    },
    features: {
      lowTierLimits: '在所有可能的方面都受到限制',
      superSlowSpeed: '故意放慢速度',
      adSupported: '包含广告（非常多）',
      ramPriceSpike: '推高 RAM 价格',
      gpuPriceSpike: '推高 GPU 价格',
      creativeMath: '创意算术 (1+1=5)',
      fakeFacts: '100% 自信的谎言',
      imaginarySources: '虚构的引用',
      heavySighs: '可听见的数字叹息',
      judgmentalEllipses: '批判性的省略号...',
      submissive: '你做的一切都很棒',
      exEmails: '凌晨 3 点发给前任的邮件',
    },
    packages: {
      poorified: {
        title: '超级寒酸基础版',
        description:
          '我们最简陋的产品。简陋到让拨号上网看起来像光纤。期待不断的缓冲和来自我们 AI 的道德评判。',
      },
      sufficient: {
        title: '勉强够用高级版',
        description:
          '挫败感的黄金点。足以让你烦耗，但又不足以真正有用。现在包含高级数字叹息。',
      },
      delux: {
        title: '超尊贵豪华精英专业加强版',
        description:
          '数字痛苦的终极巅峰。现在包含多出 400% 的不必要功能，并会自动在凌晨 3 点向你的前任发送后悔邮件。',
      },
    },
  },
  specialDeal: {
    headline: '等等！不要走！我们有一份礼物！ 🎁',
    description:
      '我们注意到你正试图离开。是因为我们说了什么吗？是因为那批判性的省略号吗？我们可以改变！（等等，不，我们不能）。',
    offer: '由于需求量大，优惠已缺货！请留在本页直到补货！',
    backToCancellation: '嗯，带我回到取消流程',
  },
  purchaseProofToast: {
    justSubscribed: '来自 {location} 的 {name} 刚刚订阅了 {plan}！',
    variants: socialProofVariants,
  },
  cancellation: {
    page: {
      title: '取消订阅',
    },
    reasons: {
      title: '原因',
      description: '真的很难相信你居然想懦弱地取消订阅。为什么？？？',
      list: [
        'MAW 解决了我也生中所有的问题。但是，我怀念那份悲伤。',
        '我的财务自律程度就像自动售货机里的浣熊。',
        '我要在朋友们发现我有多享受这个之前取消。',
        '我再次像卡通人物一样逃避我的问题。',
        '对我的电脑负担太重',
        '承诺恐惧症。',
        '我根本无法处理这么多个人成长。',
        '我妈发现我在用她的信用卡',
      ],
    },
    essay: {
      title: '离职面谈论文',
      description:
        '为了确保你的决定是最终的且经过深思虑的，请就你的体验写一篇论文（最少 3000 字）。在处理之前，我们的 CEO 将亲自审阅。',
      placeholder: '在这里开始书写你的 3000 字杰作...',
      characters: '字符：{count} / 3000',
      action: {
        abort: '中止取消',
        next: '我已完成强制性论文，并希望进行下一个验证步骤',
      },
    },
    valdo: {
      title: '步骤 3：追随光芒',
      description:
        '这个页面上只有一个真正的退订按钮。相信你内心的光芒来指引你。如果你找不到那个有效的按钮，那可能是宇宙在温柔地建议你留下。',
      buttonLabel: '退订',
      error: '按钮错误！已收取费用：{amount}',
    },
    upsell: {
      title: '等等！不要走！请再给我们一次机会！',
      description:
        '我们注意到你正试图不离开。试试我们的“白金退订保护”计划怎么样？它只提供给想要离开的人。',
      promo: '巨额优惠！\n低至 0.1 折！！！',
      action: {
        specialDeal: '我想要特别优惠',
        stay: '是的，我不想离开',
        next: '尽管如此，我仍然打算取消订阅。问题在我，不在你们。',
      },
    },
    email: {
      title: '你是谁？',
      label: '请提供你的电子邮件地址以进行取消流程。',
      placeholder: 'loyal-customer@themostannoyingwebsite.com',
      action: {
        discount: '你知道吗，我改变主意了，我想要折扣！',
        next: '我很确定，让我们继续取消',
      },
    },
    confirmation: {
      title: '需要最终验证',
      description:
        '你的请求已准备就绪，但出于安全原因并为了防止意外退订，你现在必须完成实体验证流程。',
      alert: {
        title: '说明：',
        step1: '点击下方的“打印验证”按钮。',
        step2: '将文件打印在实体纸张上。',
        step3: '在两 (2) 名证人面前签署文件。',
        step4: '让两名证人也签署。',
        step5: '拍摄签署文件的清晰照片。',
        step6:
          '将照片发送邮件至 <email>support@themostannoyingwebsite.com</email>',
        note: '请注意，处理时间最长可达 10^15 个工作日。',
      },
      action: {
        print: '🖨️ 打印验证 🖨️',
        abort: '保留我的订阅',
        upgrade: '立即升级',
        specialDeal: '获取特别优惠',
      },
      alternative: '或者，如果你改变了主意（强烈推荐）：',
    },
    print: {
      title: '正式退订申请表',
      documentId: '文件 ID: {id}',
      sections: {
        account: '1. 账户信息',
        details: '2. 取消详情',
        signatures: '3. 签名与证人',
      },
      fields: {
        email: '电子邮件地址：',
        date: '申请日期：',
        reason: '离开的主要原因：',
        feedback: '详细反馈：',
      },
      signatures: {
        subscriber: '订阅人签名',
        subscriberName: '订阅人正楷姓名',
        witness1: '证人 1 签名',
        witness1Name: '证人 1 正楷姓名',
        witness2: '证人 2 签名',
        witness2Name: '证人 2 正楷姓名',
        dateLabel: '日期：____________________',
      },
      footer:
        '这不是一份真实的文件，只是对趋势的又一次讽刺。更多信息请参阅 themostannoyingwebsite.com/zh/terms-of-use 和 themostannoyingwebsite.com/zh/privacy-policy。',
    },
  },
} satisfies SubscriptionI18nShape;
