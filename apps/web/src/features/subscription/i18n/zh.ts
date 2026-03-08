import type { SubscriptionI18nShape } from '../types';
import socialProofVariants from './purchase-proof-variants/zh';

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
    table: {
      features: '功能',
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
  purchaseProofToast: {
    justSubscribed: '来自 {location} 的 {name} 刚刚订阅了 {plan}！',
    variants: socialProofVariants,
  },
} satisfies SubscriptionI18nShape;
